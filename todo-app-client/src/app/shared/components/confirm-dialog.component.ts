import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    template: `
        <div role="dialog" aria-modal="true">
            <h2 mat-dialog-title>{{data.title}}</h2>
            <mat-dialog-content>{{data.message}}</mat-dialog-content>
            <mat-dialog-actions align="end">
                <button mat-button 
                        [mat-dialog-close]="false"
                        cdkFocusInitial>
                    Cancel
                </button>
                <button mat-raised-button 
                        color="warn" 
                        [mat-dialog-close]="true">
                    Delete
                </button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            padding: 16px;
        }
        mat-dialog-content {
            margin: 16px 0;
        }
        mat-dialog-actions {
            margin-bottom: 0;
        }
    `]
})
export class ConfirmDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            title: string;
            message: string;
        }
    ) {

        this.dialogRef.disableClose = true;
        this.dialogRef.backdropClick().subscribe(() => {
            const cancelButton = document.querySelector('button[mat-dialog-close="false"]');
            if (cancelButton instanceof HTMLElement) {
                cancelButton.focus();
            }
        });
    }
} 