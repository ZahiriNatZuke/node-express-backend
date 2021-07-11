import {NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyJwtMiddleware = (req: any, res: any, next: NextFunction) => {
    const bearerHeader = req.headers.authorization;

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, process.env.JWT_SECRET, (error: any, userDecoded: any) => {
            if (error) return res.status(401).json({status: 'unauthorized', error});

            req.body.userDecoded = userDecoded;

            next();
        });
    } else {
        return res.status(403).json({status: 'forbidden'});
    }
};