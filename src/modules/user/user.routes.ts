import express from 'express';
import {default as User} from './models/user';
import * as bcrypt from 'bcryptjs';

export const UserRoutes = express();

UserRoutes.get('/', (_, res) => {

    User.find({}, 'name email image role')
        .exec((error: any, users) => {
            if (error) return res.json({status: 'failed', errors: error.errors}).status(500);

            res.json({status: 'success', data: users}).status(200);
        });
});

UserRoutes.get('/:id', (req, res) => {

    const id = req.params.id;

    User.findById(id, (error: any, user: any) => {
        if (error) return res.json({status: 'failed', errors: error.errors}).status(500);

        if (!user)
            return res.json({
                status: 'failed',
                errors: error.errors,
                message: `User with id: ${id} does not exist`,
            }).status(400);

        res.json({status: 'success', data: user}).status(200);
    });
});

UserRoutes.post('/', (req, res) => {

    const body = req.body;

    const newUser = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
        image: body.image,
        role: body.role
    })

    newUser.save((error: any, userSaved) => {
        if (error) return res.json({status: 'failed', errors: error.errors}).status(422);

        res.json({status: 'success', data: userSaved}).status(201);
    });
});

UserRoutes.put('/:id', (req, res) => {

    const id = req.params.id;
    const body = req.body;

    User.findById(id, (error: any, user: any) => {
        if (error) return res.json({status: 'failed', errors: error.errors}).status(500);

        if (!user)
            return res.json({
                status: 'failed',
                errors: error.errors,
                message: `User with id: ${id} does not exist`,
            }).status(400);

        user.name = body.name;
        user.email = body.email;
        user.role = body.role;

        user.save((errorSaved: any, userSaved: any) => {
            if (errorSaved) return res.json({status: 'failed', errors: errorSaved.errors}).status(400);

            userSaved.password = ':)';
            res.json({status: 'success', data: userSaved}).status(200);
        });
    });
});

UserRoutes.delete('/:id', (req, res) => {

    const id = req.params.id;

    User.findByIdAndRemove(id, {}, (error: any, userDeleted: any) => {

        if (error) return res.json({status: 'failed', errors: error.errors}).status(500);

        if (!userDeleted)
            return res.json({
                status: 'failed',
                errors: error.errors,
                message: `User with id: ${id} does not exist`,
            }).status(400);

        res.status(200).json({status: 'success', data: userDeleted});
    });
});