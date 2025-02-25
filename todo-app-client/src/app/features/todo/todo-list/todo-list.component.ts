import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from '../../../core/models/todo.model';
import { TodoService } from '../../../core/services/todo.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatRippleModule,
        FlexLayoutModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    template: `
        <div class="container" fxLayout="column" fxLayoutGap="24px">
            <div class="header" fxLayout="row" fxLayoutAlign="space-between center">
                <h1 class="mat-h1">My Todo List</h1>
                <button mat-raised-button color="primary" (click)="createTodo()">
                    <mat-icon>add</mat-icon>
                    Create New Todo
                </button>
            </div>

            <div class="todo-list" fxLayout="column" fxLayoutGap="16px">
                <mat-card *ngFor="let todo of todos$ | async" 
                         class="todo-card" 
                         [class.completed]="todo.isCompleted"
                         matRipple>
                    <mat-card-content>
                        <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="16px">
                            <mat-checkbox
                                [checked]="todo.isCompleted"
                                (change)="toggleTodo(todo)"
                                color="primary"
                                class="todo-checkbox">
                            </mat-checkbox>
                            
                            <div fxFlex class="todo-content" (click)="viewDetails(todo)">
                                <h3 class="todo-title" [class.completed]="todo.isCompleted">
                                    {{todo.title}}
                                </h3>
                                <p class="todo-description">{{todo.description}}</p>
                                <div class="todo-meta">
                                    <span class="created-date">
                                        Created: {{todo.createdAt | date:'medium'}}
                                    </span>
                                    <span *ngIf="todo.completedAt" class="completed-date">
                                        Completed: {{todo.completedAt | date:'medium'}}
                                    </span>
                                </div>
                            </div>

                            <div class="todo-actions">
                                <button mat-icon-button color="primary" 
                                        (click)="editTodo(todo); $event.stopPropagation()">
                                    <mat-icon>edit</mat-icon>
                                </button>
                                <button mat-icon-button color="warn" 
                                        (click)="deleteTodo(todo); $event.stopPropagation()">
                                    <mat-icon>delete</mat-icon>
                                </button>
                            </div>
                        </div>
                    </mat-card-content>
                </mat-card>

                <div *ngIf="!(todos$ | async)?.length" class="empty-state" 
                     fxLayout="column" fxLayoutAlign="center center">
                    <mat-icon class="empty-icon">assignment</mat-icon>
                    <h2>No todos yet</h2>
                    <p>Create your first todo to get started!</p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 24px;
        }

        .header {
            margin-bottom: 16px;
        }

        .mat-h1 {
            margin: 0;
            color: #2c3e50;
            font-weight: 500;
        }

        .todo-card {
            transition: all 0.3s ease;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05) !important;
            
            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
            }

            &.completed {
                background-color: #f8f9fa;
            }
        }

        .todo-checkbox {
            margin: 0;
        }

        .todo-content {
            cursor: pointer;
            padding: 8px 0;
        }

        .todo-title {
            margin: 0 0 8px;
            font-size: 1.1rem;
            color: #2c3e50;
            font-weight: 500;

            &.completed {
                color: #94a3b8;
                text-decoration: line-through;
            }
        }

        .todo-description {
            margin: 0 0 8px;
            color: #64748b;
            font-size: 0.9rem;
            line-height: 1.5;
        }

        .todo-meta {
            font-size: 0.8rem;
            color: #94a3b8;

            .created-date, .completed-date {
                display: inline-block;
                margin-right: 16px;
            }
        }

        .details-button {
            opacity: 0.5;
            transition: opacity 0.2s ease;

            &:hover {
                opacity: 1;
            }
        }

        .empty-state {
            padding: 48px;
            text-align: center;
            background: #f8fafc;
            border-radius: 8px;
            border: 2px dashed #e2e8f0;

            .empty-icon {
                font-size: 48px;
                width: 48px;
                height: 48px;
                color: #94a3b8;
                margin-bottom: 16px;
            }

            h2 {
                margin: 0 0 8px;
                color: #64748b;
                font-weight: 500;
            }

            p {
                margin: 0;
                color: #94a3b8;
            }
        }

        .todo-actions {
            display: flex;
            gap: 8px;
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        .todo-card:hover .todo-actions {
            opacity: 1;
        }
    `]
})
export class TodoListComponent implements OnInit {
    todos$!: Observable<Todo[]>;

    constructor(
        private todoService: TodoService,
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadTodos();
    }

    loadTodos(): void {
        this.todos$ = this.todoService.getAllTodos();
    }

    createTodo(): void {
        this.router.navigate(['/todos/create']);
    }

    viewDetails(todo: Todo): void {
        this.router.navigate(['/todos', todo.id]);
    }

    toggleTodo(todo: Todo): void {
        const command = {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            isCompleted: !todo.isCompleted
        };
        this.todoService.updateTodo(command).subscribe(() => {
            this.loadTodos();
        });
    }

    deleteTodo(todo: Todo): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Delete Todo',
                message: `Are you sure you want to delete "${todo.title}"?`
            },
            autoFocus: 'dialog',
            restoreFocus: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.todoService.deleteTodo(todo.id).subscribe({
                    next: () => {
                        this.loadTodos();
                        this.snackBar.open('Todo deleted successfully', 'Close', {
                            duration: 3000,
                            politeness: 'assertive'
                        });
                    },
                    error: (error) => {
                        console.error('Error deleting todo:', error);
                        this.snackBar.open('Failed to delete todo', 'Close', {
                            duration: 3000,
                            politeness: 'assertive'
                        });
                    }
                });
            }
        });
    }

    editTodo(todo: Todo): void {
        this.router.navigate(['/todos', todo.id, 'edit']);
    }
} 