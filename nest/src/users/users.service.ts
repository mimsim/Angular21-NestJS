import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Observable, defer, from, switchMap, throwError } from 'rxjs';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private repo: Repository<User>
    ) { }

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });

        return this.repo.save(user);
    }
    findOne(id: number) {
        if (!id) {
            return null;
        }
        return this.repo.findOneBy({ id });
    }
    find(email: string) {
        return this.repo.find({ where: { email } });
    }
    update(id: number, attrs: Partial<User>): Observable<User> {
        return defer(() => this.findOne(id) ?? Promise.resolve(null)).pipe(
            switchMap(user => {
                if (!user) {
                    return throwError(() => new NotFoundException('user not found'));
                }
                Object.assign(user, attrs);
                return from(this.repo.save(user));
            })
        );
    }

    remove(id: number): Observable<User> {
        return defer(() => this.findOne(id) ?? Promise.resolve(null)).pipe(
            switchMap(user => {
                if (!user) {
                    return throwError(() => new NotFoundException('user not found'));
                }
                return from(this.repo.remove(user));
            })
        );
    }

}
