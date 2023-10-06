import express from 'express';
import authentication from './authentification';
import users from './users';
const router = express.Router();

export default () :express.Router =>{
    authentication(router);
    users(router);
    return router;
}