import { Component } from '@angular/core';
import { HeavyComputation } from './heavy-computation.pipe';

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      {{ person | heavyComputation: $index }}
    }
  `,
  imports: [HeavyComputation],
})
export class AppComponent {
  persons: string[] = ['toto', 'jack'];
}
