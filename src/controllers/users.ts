import express from 'express';

import  { getUsers } from '../db/users';

export const getAllUsers = async (req : express.Request, res : express.Response) => {
    try{
        console.log("hii");
        const users=await getUsers();
        console.log(users);
        return res.json(users);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};