import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ExpandableCard } from './expandable-card';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-page-2',
  template: `
    page2
    <app-expandable-card (isExpandedChanged)="isExpanded.set($event)">
      <div title>Load Post</div>
      <div>
        @defer {
          @for (post of postResource.value(); track post.id) {
            <div>{{ post.title }}</div>
          }
        } @loading {
          Loading...
        } @error {
          Error...
        }
      </div>
    </app-expandable-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExpandableCard],
})
export class Page2 {
  public isExpanded = signal<boolean>(false);

  public postResource = httpResource<Post[]>(() => {
    if (this.isExpanded()) return 'https://jsonplaceholder.typicode.com/posts';
    return undefined;
  });
}
