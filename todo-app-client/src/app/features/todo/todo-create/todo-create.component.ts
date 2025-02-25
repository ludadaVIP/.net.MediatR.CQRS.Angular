import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoService } from '../../../core/services/todo.service';

@Component({
    selector: 'app-todo-create',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule
    ],
    template: `
        <div class="container" fxLayout="column" fxLayoutGap="20px">
            <h2>Create New Todo</h2>
            
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
                        Create
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
export class TodoCreateComponent {
    todoForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private todoService: TodoService,
        private router: Router
    ) {
        this.todoForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(200)]],
            description: ['', Validators.maxLength(1000)]
        });
    }

    onSubmit(): void {
        if (this.todoForm.valid) {
            //console.log(this.todoForm.value);
            this.todoService.createTodo(this.todoForm.value)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/todos']);
                    },
                    error: (error) => {
                        console.error('Error creating todo:', error);
                    }
                });
        }
    }

    onCancel(): void {
        this.router.navigate(['/todos']);
    }
} 