import express from 'express';
import {UserRoutes} from './modules/user/user.routes';

export const AppRoutes = express();

AppRoutes.get('/', (_, res) => {
    res.json({status: 'online', message: 'Express + Typescript Backend Server'}).status(200);
});

AppRoutes.use('/user', UserRoutes);