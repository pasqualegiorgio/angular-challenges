import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './services/loading.service';
import { TodosService } from './services/todos.service';
import { Todo } from './todo.model';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (loadingService.loading()) {
      <mat-progress-spinner mode="indeterminate" aria-label="Loading..." />
    }
    @for (todo of todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo.id)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private todoService = inject(TodosService);
  loadingService = inject(LoadingService);

  todos = signal<Array<Todo>>([]);

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(id: number) {
    this.todoService.updateTodo(id).subscribe((todoUpdated) => {
      this.todos.update((current) =>
        current.map((t) => (t.id === todoUpdated.id ? todoUpdated : t)),
      );
    });
  }

  delete = (id: number) => {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos.update((current) => current.filter((t) => t.id !== id));
    });
  };
}
