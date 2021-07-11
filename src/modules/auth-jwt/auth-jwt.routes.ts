import express from 'express';
import {default as User} from '../user/models/user';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import * as _ from 'lodash';

export const AuthJWTRoutes = express();

AuthJWTRoutes.post('/login', (req, res) => {

    const body = req.body;

    User.findOne({user: body.user}, (error: any, user: any) => {
        if (error) return res.status(500).json({status: 'failed', errors: error.errors});

        if (!user || !bcrypt.compareSync(body.password, user.password))
            return res.status(400).json({status: 'failed', message: 'Credential Incorrect'});

        user = _.pick(user, ['name', 'user', 'role', 'extra']);
        const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.status(200).json({status: 'success', data: {user, token}});
    });
})