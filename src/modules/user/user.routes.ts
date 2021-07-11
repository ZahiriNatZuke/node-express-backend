import express from 'express';
import {default as User} from './models/user';
import * as bcrypt from 'bcryptjs';
import {verifyJwtMiddleware} from '../auth-jwt/verify-jwt.middleware';

export const UserRoutes = express();

UserRoutes.get('/', (_, res) => {

    User.find({}, 'name email image role')
        .exec((error: any, users) => {
            if (error) return res.status(500).json({status: 'failed', errors: error.errors});

            res.status(200).json({status: 'success', data: users});
        });
});

UserRoutes.get('/:id', (req, res) => {

    const id = req.params.id;

    User.findById(id, (error: any, user: any) => {
        if (error) return res.status(500).json({status: 'failed', errors: error.errors});

        if (!user)
            return res.status(400).json({
                status: 'failed',
                message: `User with id: ${id} does not exist`,
            });

        res.status(200).json({status: 'success', data: user});
    });
});

UserRoutes.post('/', verifyJwtMiddleware, (req, res) => {

    const body = req.body;

    const newUser = new User({
        name: body.name,
        user: body.user,
        password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
        image: body.image,
        role: body.role
    });

    newUser.save((error: any, userSaved) => {
        if (error) return res.status(422).json({status: 'failed', errors: error.errors});

        res.status(201).json({status: 'success', data: userSaved});
    });
});

UserRoutes.put('/:id', verifyJwtMiddleware, (req, res) => {

    const id = req.params.id;
    const body = req.body;

    User.findById(id, (error: any, user: any) => {
        if (error) return res.status(500).json({status: 'failed', errors: error.errors});

        if (!user)
            return res.status(400).json({
                status: 'failed',
                message: `User with id: ${id} does not exist`,
            });

        user.name = body.name;
        user.email = body.email;
        user.image = body.image;
        user.role = body.role;

        user.save((errorSaved: any, userSaved: any) => {
            if (errorSaved) return res.status(400).json({status: 'failed', errors: errorSaved.errors});

            res.status(200).json({status: 'success', data: userSaved});
        });
    });
});

UserRoutes.delete('/:id', verifyJwtMiddleware, (req, res) => {

    const id = req.params.id;

    User.findByIdAndRemove(id, {}, (error: any, userDeleted: any) => {

        if (error) return res.status(500).json({status: 'failed', errors: error.errors});

        if (!userDeleted)
            return res.status(400).json({
                status: 'failed',
                message: `User with id: ${id} does not exist`,
            });

        res.status(200).json({status: 'success', msg: 'User has been deleted successfully'});
    });
});