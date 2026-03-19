import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';
import { NextFunction } from 'express';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const session = (req as any).session;

        if (session?.userId) {
            const user = await this.usersService.findOne(session.userId);
            (req as any).currentUser = user;
        }

        next();
    }
}