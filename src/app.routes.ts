import express from 'express';
import {UserRoutes} from './modules/user/user.routes';
import {AuthJWTRoutes} from './modules/auth-jwt/auth-jwt.routes';

export const AppRoutes = express();

AppRoutes.get('/', (_, res) => {
    res.status(200).json({status: 'online', message: 'Express + Typescript Backend Server'});
});

AppRoutes.use('/user', UserRoutes);
AppRoutes.use('/auth', AuthJWTRoutes);