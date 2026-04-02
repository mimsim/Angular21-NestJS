import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user-service';
import { MATERIAL_MODULES } from '../../material.providers';

@Component({
    selector: 'app-admin-users',
    imports: [
        CommonModule,
    ...MATERIAL_MODULES],
    templateUrl: './admin-users.html',
    styleUrl: './admin-users.scss',
})
export class AdminUsers implements OnInit {
    userService = inject(UserService);
    users = this.userService.users;
    isLoading = this.userService.isLoading;
    displayedColumns: string[] = ['id', 'email', 'role', 'actions'];

    ngOnInit() {
        this.userService.fetchUsers()
    }
    deleteUser(id: any) {
        this.userService.deleteUserById(id)
    }
}
