import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MatToolbarModule
    ],
    template: `
        <mat-toolbar color="primary">
            <span>Todo App</span>
        </mat-toolbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [`
        .container {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
    `]
})
export class AppComponent {
    title = 'todo-app-client';
} 