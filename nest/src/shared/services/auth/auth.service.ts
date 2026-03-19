import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    signup(email: string, password: string): Observable<any> {
        return from(this.usersService.find(email)).pipe(
            switchMap(users => {
                if (users.length) {
                    return throwError(() => new BadRequestException('email in use'));
                }

                const salt = randomBytes(8).toString('hex');
               
                return from(scrypt(password, salt, 32)).pipe(
                    switchMap((hash: Buffer) => {
                        const result = salt + '.' + hash.toString('hex');
                        return from(this.usersService.create(email, result));
                    })
                );
            }),
            catchError(err => throwError(() => err))
        );
    }
    signin(email: string, password: string): Observable<any> {
        return from(this.usersService.find(email)).pipe(
            switchMap(users => {
                const user = users[0];
                if (!user) {
                    return throwError(() => new NotFoundException('user not found'));
                }

                const [salt, storedHash] = user.password.split('.');

                return from(scrypt(password, salt, 32)).pipe(
                    switchMap((hash: Buffer) => {
                        if (storedHash !== hash.toString('hex')) {
                            return throwError(() => new BadRequestException('bad password'));
                        }
                        return from(Promise.resolve(user)); 
                    })
                );
            })
        );
    }
}