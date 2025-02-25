import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoService } from '../../../core/services/todo.service';

@Component({
    selector: 'app-todo-update',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        FlexLayoutModule
    ],
    template: `
        <div class="container" fxLayout="column" fxLayoutGap="20px">
            <h2>Update Todo</h2>
            
            <form [formGroup]="todoForm" (ngSubmit)="onSubmit()" fxLayout="column" fxLayoutGap="20px">
                <mat-form-field appearance="fill">
                    <mat-label>Title</mat-label>
                    <input matInput formControlName="title" placeholder="Enter title">
                    <mat-error *ngIf="todoForm.get('title')?.errors?.['required']">
                        Title is required
                    </mat-error>
                </mat-form-field>

                <mat-form-field appearance="fill">
                    <mat-label>Description</mat-label>
                    <textarea matInput formControlName="description" 
                              placeholder="Enter description" rows="4">
                    </textarea>
                </mat-form-field>

                <div fxLayout="row" fxLayoutGap="10px">
                    <button mat-raised-button color="primary" type="submit" 
                            [disabled]="todoForm.invalid">
                        Update
                    </button>
                    <button mat-button type="button" (click)="onCancel()">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `,
    styles: [`
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
    `]
})
export class TodoUpdateComponent implements OnInit {
    todoForm: FormGroup;
    todoId: number;

    constructor(
        private fb: FormBuilder,
        private todoService: TodoService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.todoForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(200)]],
            description: ['', Validators.maxLength(1000)]
        });
        
        this.todoId = Number(this.route.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {
        this.todoService.getTodoById(this.todoId).subscribe({
            next: (todo) => {
                this.todoForm.patchValue({
                    title: todo.title,
                    description: todo.description
                });
            },
            error: (error) => {
                console.error('Error loading todo:', error);
                this.snackBar.open('Failed to load todo', 'Close', {
                    duration: 3000
                });
                this.router.navigate(['/todos']);
            }
        });
    }

    onSubmit(): void {
        if (this.todoForm.valid) {
            const command = {
                id: this.todoId,
                ...this.todoForm.value,
                isCompleted: false
            };

            this.todoService.updateTodo(command).subscribe({
                next: () => {
                    this.snackBar.open('Todo updated successfully', 'Close', {
                        duration: 3000
                    });
                    this.router.navigate(['/todos']);
                },
                error: (error) => {
                    console.error('Error updating todo:', error);
                    this.snackBar.open('Failed to update todo', 'Close', {
                        duration: 3000
                    });
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/todos']);
    }
} 