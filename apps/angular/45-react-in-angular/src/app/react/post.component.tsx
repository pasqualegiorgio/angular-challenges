import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactPost from './ReactPost';

type Post = { title: string; description: string; pictureLink: string };

@Component({
  selector: 'app-post',
  template: `
    <div #root></div>
  `,
  styles: [''],
})
export class PostComponent implements AfterViewInit, OnDestroy {
  post = input<Post | undefined>(undefined);
  isSelected = input<boolean>(false);
  selectPost = output<void>();

  private rootElement = viewChild<ElementRef<HTMLElement>>('root');
  private root?: ReturnType<typeof createRoot>;
  private rootReady = signal(false);

  constructor() {
    effect(() => {
      const post = this.post();
      const selected = this.isSelected();
      const ready = this.rootReady();

      if (!ready || !this.root) return;

      this.root.render(
        <React.StrictMode>
          <ReactPost
            title={post?.title}
            description={post?.description}
            pictureLink={post?.pictureLink}
            selected={selected}
            handleClick={() => this.selectPost.emit()}
          />
        </React.StrictMode>,
      );
    });
  }

  ngAfterViewInit(): void {
    const domNode = this.rootElement()?.nativeElement;

    if (!domNode) return;

    this.root = createRoot(domNode);
    this.rootReady.set(true);
  }

  ngOnDestroy(): void {
    this.root?.unmount();
  }
}
