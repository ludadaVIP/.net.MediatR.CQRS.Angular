import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoService } from '../../../core/services/todo.service';
import { Todo } from '../../../core/models/todo.model';

@Component({
    selector: 'app-todo-detail',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        FlexLayoutModule
    ],
    template: `
        <div class="container" fxLayout="column" fxLayoutGap="20px">
            <mat-card *ngIf="todo">
                <mat-card-header>
                    <mat-card-title>{{todo.title}}</mat-card-title>
                    <mat-card-subtitle>
                        Created: {{todo.createdAt | date}}
                    </mat-card-subtitle>
                </mat-card-header>
                
                <mat-card-content>
                    <p>{{todo.description}}</p>
                    
                    <div class="status-info">
                        <p>Status: {{todo.isCompleted ? 'Completed' : 'Pending'}}</p>
                        <p *ngIf="todo.completedAt">
                            Completed on: {{todo.completedAt | date}}
                        </p>
                    </div>
                </mat-card-content>
                
                <mat-card-actions>
                    <button mat-button color="primary" (click)="onBack()">
                        Back to List
                    </button>
                    <mat-checkbox
                        [checked]="todo.isCompleted"
                        (change)="toggleTodo(todo)"
                        color="primary">
                        Mark as {{todo.isCompleted ? 'Incomplete' : 'Complete'}}
                    </mat-checkbox>
                </mat-card-actions>
            </mat-card>

            <div *ngIf="error" class="error-message">
                {{error}}
            </div>
        </div>
    `,
    styles: [`
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .status-info {
            margin-top: 20px;
            padding: 10px;
            background-color: #f5f5f5;
            border-radius: 4px;
        }
        .error-message {
            color: red;
            padding: 10px;
            background-color: #fff3f3;
            border-radius: 4px;
        }
        mat-card-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
        }
    `]
})
export class TodoDetailComponent implements OnInit {
    todo: Todo | null = null;
    error: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private todoService: TodoService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadTodo(+id);
        }
    }

    loadTodo(id: number): void {
        this.todoService.getTodoById(id).subscribe({
            next: (todo) => {
                this.todo = todo;
            },
            error: (error) => {
                console.error('Error loading todo:', error);
                this.error = 'Failed to load todo details';
            }
        });
    }

    toggleTodo(todo: Todo): void {
        const command = {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            isCompleted: !todo.isCompleted
        };
        
        this.todoService.updateTodo(command).subscribe({
            next: () => {
                this.loadTodo(todo.id);
            },
            error: (error) => {
                console.error('Error updating todo:', error);
                this.error = 'Failed to update todo status';
            }
        });
    }

    onBack(): void {
        this.router.navigate(['/todos']);
    }
} 