import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import coockieParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
const app = express();

app.use(cors({
    credentials:true,
}));


app.use(compression());
app.use(coockieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000/');
});

const mongo_url= 'mongodb+srv://hkimiamin02:ogVfMO7HHoOKvcwe@cluster0.vl4gmza.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
mongoose.Promise=Promise;
mongoose.connect(mongo_url);
mongoose.connection.on('error',err=>{
    console.log(err);
});
app.use('/', router());