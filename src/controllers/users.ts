import express from 'express';

import  { getUsers } from '../db/users';

export const getAllUsers = async (req : express.Request, res : express.Response) => {
    try{
        const users=await getUsers();
        return res.sendStatus(200).json(users);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};