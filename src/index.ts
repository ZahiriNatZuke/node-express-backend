import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import {AppRoutes} from './app.routes';
import {morganMiddleware} from './libs/morgan';
import 'dotenv/config';

const PORT = process.env.NODE_PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(morganMiddleware);
app.use('/api', AppRoutes);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connection.openUri(
    'mongodb://localhost:27017/hospital_db',
    {useNewUrlParser: true, useUnifiedTopology: true},
    (error) => {
        if (error) throw error;
        console.log('✨ [mongodb]: MongoDB is online, connected to: \x1b[42m%s\x1b[0m', 'hospital_db');
    }
);

app.listen(PORT, () => console.log(`⚡️[express]: Server is running at: http://localhost:${PORT}/api`));