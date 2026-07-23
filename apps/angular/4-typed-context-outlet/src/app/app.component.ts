import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from './list.component';
import { ListDirective } from './list.directive';
import { PersonComponent } from './person.component';
import { PersonDirective } from './person.directive';

@Component({
  imports: [PersonComponent, ListComponent, PersonDirective, ListDirective],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <ng-template #personRef appPerson let-name let-age="age">
        {{ name }}: {{ age }}
      </ng-template>
    </person>

    <list [list]="students">
      <ng-template #listRef appList [list]="students" let-student let-i="index">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </ng-template>
    </list>

    <list [list]="cities">
      <ng-template #listRef appList [list]="cities" let-city let-i="index">
        {{ city.name }}: {{ city.country }} - {{ i }}
      </ng-template>
    </list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person = {
    name: 'toto',
    age: 3,
  };

  students = [
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ];

  cities = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
