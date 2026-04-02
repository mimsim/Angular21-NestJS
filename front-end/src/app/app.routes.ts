import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Register } from './register/register';
import { ListProducts } from './products/list-products/list-products';
import { ProductComponent } from './products/product/product';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'register', component: Register },
    { path: 'product/:id', component: ProductComponent },
    {
        path: 'admin',
        canActivate: [authGuard],
        children: [
            {
                path: 'users',
                loadComponent: () => import('../app/admin/admin-users/admin-users')
                    .then(m => m.AdminUsers)
            }
        ]
    },
];
