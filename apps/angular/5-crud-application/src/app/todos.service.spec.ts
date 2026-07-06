import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import '@angular/compiler';
import { TestBed, getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import 'zone.js';
import { TodosService } from './services/todos.service';
import { Todo } from './todo.model';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  it('should get the todos list', async () => {
    const mockTodos: Todo[] = [
      {
        userId: 1,
        id: 1,
        title: 'Test Todo 1',
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: 'Test Todo 2',
        completed: true,
      },
    ];

    const promise = new Promise<Todo[]>((resolve) => {
      service.getTodos().subscribe(resolve);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos',
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockTodos);

    const result = await promise;
    expect(result).toEqual(mockTodos);
    expect(result.length).toBe(2);
  });

  it('should update a specific todo', async () => {
    const updatedTodo: Todo = {
      userId: 1,
      id: 42,
      title: 'Updated Title',
      completed: true,
    };

    const promise = new Promise<Todo>((resolve) => {
      service.updateTodo(42).subscribe(resolve);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos/42',
    );
    expect(req.request.method).toBe('PUT');

    req.flush(updatedTodo);

    const result = await promise;
    expect(result.title).toBe('Updated Title');
    expect(result.id).toBe(42);
  });
});
