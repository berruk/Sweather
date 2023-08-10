import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from '../../images/background.jpg';


export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  weatherDisplay: {
    borderRadius: 44,
    marginBottom: '1rem',
    display: 'block',
    padding: '8px',
    maxWidth: '100%', 
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    margin: 10,
    backgroundImage: `url(${backgroundImage})`,
    padding: '10px',
    borderRadius: '100px',
  },
  maintitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '5rem',
    font: 'Arial',
    color: '#BDBDBD',
    margin: 200,
    border: '2px solid #FFFFFF', // Replace '#000' with the color you desire
    padding: '20px',
    borderRadius: '100px',
    backgroundColor: '#FFFFFF', // Replace '#f0f0f0' with the background color you desire

  },
  subtitle: {
    fontSize: '3rem',
    fontFamily: 'Libre Baskerville',
    color: '#BDBDBD',
    margin: 0,
    border: '2px solid #FFFFFF', // Replace '#000' with the color you desire
    padding: '10px',
    borderRadius: '100px',
    backgroundColor: '#FFFFFF',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));