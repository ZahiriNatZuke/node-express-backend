import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
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
    process.env.MONGODB_URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (error) => {
        if (error) throw error;
        console.log('✨ [mongodb]: MongoDB is online, connected to: \x1b[42m%s\x1b[0m', 'matematica-segundo');
    }
);

app.listen(PORT, () => console.log(`⚡️[express]: Server is running at: http://localhost:${PORT}/api`));