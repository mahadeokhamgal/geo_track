import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'users', loadComponent: () => import('./user-list/user-list').then(m => m.UserList) },
    { path: 'user/:id', loadComponent: () => import('./user-timeline/user-timeline').then(m => m.UserTimeline) },
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: '**', redirectTo: 'users', pathMatch: 'full' },
];
