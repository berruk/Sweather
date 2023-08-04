import os
from pyspark.sql.functions import col
from pyspark.sql import SparkSession
import pika
import json


DATASET_PATH = "/mnt/c/Users/berru.karakas/Desktop/dataset/styles.csv"

spark = SparkSession.builder.appName('Sweather').getOrCreate()
df_pyspark = spark.read.option('header','true').csv("/mnt/c/Users/berru.karakas/Desktop/dataset/styles.csv", inferSchema=True).limit(500)

def filter_clothes(df, season_condition=None, article_type_condition=None, color_condition = None):
    if season_condition is not None:
        df = df.where(col("season") == season_condition)
    if article_type_condition is not None:
        df = df.where(col("articleType") == article_type_condition)
    if color_condition is not None:
        df = df.where(col("baseColour") == color_condition)
    return df

#selected_rows_season = filter_clothes(df_pyspark, season_condition="Fall")
#selected_rows_season.show()

def on_request(ch, method, props, body):
    # Add your server logic here
    print(f"Received message: {body.decode()}")

    selected_rows_season = filter_clothes(df_pyspark, season_condition=body.decode())
    selected_rows_season.show()
    result_list = df_pyspark.collect()
    response = [row.asDict() for row in result_list]
    
    ch.basic_publish(
        exchange='',
        routing_key=props.reply_to,
        properties=pika.BasicProperties(correlation_id=props.correlation_id),
        body=str(response)
    )
    
    ch.basic_ack(delivery_tag=method.delivery_tag)

# Connect to RabbitMQ and start listening to the 'rpc_queue' for incoming messages
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='rpc_queue', durable=True)
channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='rpc_queue', on_message_callback=on_request)

print("RPC Server waiting for requests...")
channel.start_consuming()