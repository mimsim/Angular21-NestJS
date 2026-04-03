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
    // update(id: number, attrs: Partial<User>): Observable<User> {
    //     return defer(() => this.findOne(id) ?? Promise.resolve(null)).pipe(
    //         switchMap(user => {
    //             if (!user) {
    //                 return throwError(() => new NotFoundException('user not found'));
    //             }
    //             Object.assign(user, attrs);
    //             return from(this.repo.save(user));
    //         })
    //     );
    // }
    // async update(id: number, attrs: Partial<User>) {
    //     const user = await this.repo.findOneBy({ id });

    //     if (!user) {
    //         throw new NotFoundException('user not found');
    //     }

    //     // Обновяваме само полетата, които идват в attrs
    //     // Ако attrs е { admin: false }, това гарантирано презаписва текущото true
    //     const updatedUser = this.repo.merge(user, attrs);

    //     return this.repo.save(updatedUser);
    // }
    async update(id: number, attrs: Partial<User>) {
        // 1. Използваме директен ъпдейт, за да заобиколим всички Interceptors/Hooks
        await this.repo.update(id, attrs);

        // 2. Вземаме "чиста" версия от базата
        const updatedUser = await this.repo.findOneBy({ id });

        console.log('DB VERIFY:', updatedUser?.admin); // Виж какво казва базата тук!
        return updatedUser;
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
