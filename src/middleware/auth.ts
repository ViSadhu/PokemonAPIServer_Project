import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

// Middleware to verify Bearer token and access level
export async function authenticateToken(req: Request, res: Response, next: NextFunction) {

    // Extract Bearer token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is present, return 401 Unauthorized
    if (!token) {
        res.setStatusCode = 401;
        return next();
    }

    // Check if the token is valid
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { token } });

    // If the token is invalid (the user does not exist), return 403 Forbidden
    if (!user) {
        res.setStatusCode = 403;
        return next();
    }

    req.user = user;

    next();
}

// Middleware to check if user has sufficient access level
export function authorizeAccess(requiredAccessLevel: 'write' | 'admin') {
    return (req: Request, res: Response, next: NextFunction) => {

        // If the user does not have sufficient access, return code 403 Forbidden 
        if (!req.user || (req.user.accessLevel !== 'write' && req.user.accessLevel !== requiredAccessLevel)) {
            res.setStatusCode = 403;
            return next();
        }

        next();

    };
}
