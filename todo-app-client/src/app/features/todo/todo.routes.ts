import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoUpdateComponent } from './todo-update/todo-update.component';

export const TODO_ROUTES: Routes = [
    { path: '', component: TodoListComponent },
    { path: 'create', component: TodoCreateComponent },
    { path: ':id', component: TodoDetailComponent },
    { path: ':id/edit', component: TodoUpdateComponent}
]; 