import  express  from "express";

import { createUser, getUsers, getUserByEmail } from '../db/users'
import { random,authentification } from "../helpers";
import cookieParser from "cookie-parser";

export const login= async (req:express.Request,res:express.Response) => {
        try{
                const {email,password}=req.body;
                if(!email || !password){
                    return res.sendStatus(400).json({error:"missing fields"}).end();
                }
                const user=await getUserByEmail(email).select('+authentification.password +authentification.salt');
                if(!user){
                    return res.sendStatus(400).json({error:"user not found"}).end();
                }
                const expectedhash=authentification(user.authentification.salt,password);
                if(user.authentification.password !== expectedhash){
                    return res.sendStatus(403).json({error:"verify creditianls"}).end();
                }
                const salt=random();
                user.authentification.sessionToken=authentification(salt,user._id.toString());

                await user.save();
                res.cookie('auth-token',user.authentification.sessionToken , {domain:'localhost',path:'/'});
                return res.status(200).json(user).end();
        }catch(error){
            console.log(error);
            return res.sendStatus(400);
        }
}
export const register=async (req:express.Request,res:express.Response)=>{
    try{
        const {email,password,username}=req.body;
        if(!email || !password || !username){
            return res.sendStatus(400).json({error:"missing fields"}).end();
        }
        const existingUser= await getUserByEmail(email);
        if(existingUser){
            return res.sendStatus(400);
        }

        const salt=random();
        const user=await createUser({
            email,
            username,
            authentification:{
                salt,
                password : authentification(salt,password)
            }
        })
        return res.status(200).json(user).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}