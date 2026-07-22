import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { posts } from '../data';
import { NavigationService } from '../navigation.service';
import { ThumbnailComponent } from './thumbnail.component';

@Component({
  selector: 'blog',
  imports: [ThumbnailComponent],
  template: `
    <div
      class="app-header fixed top-0 right-0 left-0 z-50 flex h-20 items-center justify-center border-b-2 bg-white text-4xl shadow-md">
      Blog List
    </div>
    <div class="my-20 flex h-screen flex-col items-center gap-10 p-10">
      @for (post of posts; track post.id) {
        <blog-thumbnail
          [post]="post"
          [class.transition]="
            $index === this.navigationService.selectedPostId()
          " />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogComponent {
  posts = posts;

  readonly navigationService = inject(NavigationService);

  constructor() {
    setTimeout(() => window.scrollTo(0, this.navigationService.prevScrollY()));
  }
}
