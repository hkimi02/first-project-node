import express from 'express';
import authentication from './authentification';

const router = express.Router();

export default () :express.Router =>{
    authentication(router);
    return router;
}