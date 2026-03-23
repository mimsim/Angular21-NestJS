import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { defer, from, Observable, switchMap, tap, throwError } from 'rxjs';
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from 'src/shared/dto/update-user.dto';

@Controller('auth')
export class UsersController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) { }
    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/register')
    createUser(@Body() body: CreateUserDto, @Session() session: any) {
        return this.authService.signup(body.email, body.password).pipe(
            tap(user => {
                session.userId = user.id; 
            })
        );
    }
    @Post('/login')
    signin(@Body() body: CreateUserDto, @Session() session: any) {
        return this.authService.signin(body.email, body.password).pipe(
            tap(user => {
                session.userId = user.id; 
                console.log(session)
            })
        );
    }
    
    @Get('/:id')
    findUser(@Param('id') id: string): Observable<User> {
        return defer(() => this.usersService.findOne(parseInt(id)) ?? Promise.resolve(null)).pipe(
            switchMap(user => {
                if (!user) {
                    return throwError(() => new NotFoundException('user not found'));
                }
                return [user]; 
            })
        );
    }
    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}


