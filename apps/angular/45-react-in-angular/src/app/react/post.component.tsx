import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  output,
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

  constructor() {
    effect(() => {
      if (!this.root) return;
      this.post();
      this.isSelected();
      this.renderReact();
    });
  }

  ngAfterViewInit(): void {
    const domNode = this.rootElement()?.nativeElement;

    if (!domNode) return;

    this.root = createRoot(domNode);
    this.renderReact();
  }

  ngOnDestroy(): void {
    this.root?.unmount();
  }

  private renderReact(): void {
    if (!this.root) return;

    const post = this.post();

    this.root.render(
      <React.StrictMode>
        <ReactPost
          title={post?.title}
          description={post?.description}
          pictureLink={post?.pictureLink}
          selected={this.isSelected()}
          handleClick={() => this.selectPost.emit()}
        />
      </React.StrictMode>,
    );
  }
}
