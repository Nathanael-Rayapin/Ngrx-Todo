import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { todoFeature } from './store/todo.store';
import { TodoEffect } from './store/todo.effect';

export const appConfig: ApplicationConfig = {
  providers: [provideStore({todo: todoFeature.reducer}), provideEffects(TodoEffect)]
};
