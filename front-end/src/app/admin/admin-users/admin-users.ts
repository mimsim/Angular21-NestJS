import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user-service';
import { MATERIAL_MODULES } from '../../material.providers';
import { ToastService } from '../../shared/services/toast-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    private toast = inject(ToastService);
    private destroyRef = inject(DestroyRef);
    ngOnInit() {
        this.userService.fetchUsers()
    }
    deleteUser(id: any) {
        this.userService.isLoading.set(true);

        this.userService.deleteUserById(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.userService.users.update(users => users.filter(u => u.id !== id));

                this.userService.isLoading.set(false);
                this.toast.show('Потребителят е изтрит успешно!', 'success');
            },
            error: (err) => {
                this.userService.isLoading.set(false);
                // Грешката ще бъде хваната и от твоя Interceptor
            }
        });
    }
}
