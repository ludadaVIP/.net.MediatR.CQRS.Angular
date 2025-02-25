import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'todos',
        loadChildren: () => import('./features/todo/todo.routes')
            .then(m => m.TODO_ROUTES)
    },
    { path: '', redirectTo: 'todos', pathMatch: 'full' }
]; 