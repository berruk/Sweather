import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";


export const signIn = async (req, res) =>
{
    const {email, password, firstName, lastName} = req.body;

    try {
        const findUser = await User.findOne({email});
        let user = findUser;   
        if (req.body.hasOwnProperty('id')) //google sign in
        {
            if(!findUser)   //if not already signed up
            {
                try {
                    const user = await User.create({email: email, name: `${firstName} ${lastName}`, googleid: req.body.id});
                    console.log('User created:', user);
                  } catch (error) {
                    console.error('Error creating user:', error);
                  }
            }
            const jwtoken = jwt.sign({ email: user.email, id: user.id }, 'test', {expiresIn: '1h'});
            res.status(200).json({ result: user, jwtoken });
        }
        else
        {
            if(!findUser)
            {
                res.status(404).json({message: "User not found."});
            }

            const passwordCorrect = await bcrypt.compare(password, findUser.password);
            if(!passwordCorrect)
            {
                res.status(400).json({message: "Password incorrect."});
            }

            const jwtoken = jwt.sign({email: findUser.email, id: findUser._id}, 'test', {expiresIn: '1h'});
            res.status(200).json({result: findUser, jwtoken});

        }      

    } catch (error) {
        res.status(500);
    }
}

export const signUp = async (req, res) =>
{
    const {email, password, firstName, lastName, confirmPassword} = req.body;

    try {
        const findUser = await User.findOne({email});
        if(findUser)
        {   
            res.status(400).json({message: "Email already registered."});
        }

        if(password !== confirmPassword){
            res.status(400).json({message: "Passwords don't match."});
        }

        const hashed = await bcrypt.hash(password, 12);

        const createdUser = await User.create({email, password: hashed, name: `${firstName} ${lastName}`})

        const jwtoken = jwt.sign({email: createdUser.email, id: createdUser._id}, 'test', {expiresIn: "1"});

        res.status(200).json({result: createdUser, jwtoken});

    } catch (error) {
        res.status(500);
    }
}