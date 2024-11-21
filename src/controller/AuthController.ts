import { AppDataSource } from "../data-source"
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';
import { Controller } from '../decorator/Controller';
import { Route } from "../decorator/Route";
import * as jwt from 'jsonwebtoken';

@Controller('/auth')
export class AuthController {

    private userRepository = AppDataSource.getRepository(User)

    @Route('post', '/login')
    async login(req: Request, res: Response, next: NextFunction) {

        // Get the username and password from the request body
        const { username, password } = req.body
        const user = await this.userRepository.findOne({ where: { username } });

        // Check if the user exists and password matches
        if (!user || user.password !== password) {
            res.setStatusCode = 403;
            return next();
        }

        // Generate a JWT token for the user
        const secretKey = process.env.KEY || 'k4gGwytmf2iAf64yVv47u1p4ZaIicRc6';
        const token = jwt.sign({ id: user.id }, secretKey); 

        user.token = token;

        // Save the updated user with the token
        await this.userRepository.save(user);

        // Return the token
        res.status(200).json(token);

    }
}