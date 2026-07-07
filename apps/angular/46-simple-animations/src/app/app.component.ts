import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styles: `
    @reference "tailwindcss";

    section {
      @apply flex flex-1 flex-col gap-5;
    }

    .list-item {
      @apply flex flex-row border-b px-5 pb-2;

      span {
        @apply flex-1;
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        trasform: translateX(0);
      }
    }

    .fade-in-up {
      animation: fadeInUp 0.5s ease-out;
    }

    .list-item-enter {
      animation: fadeInUp 0.5s ease-out both;
    }

    .list-item-enter:nth-child(0) {
      animation-delay: 0ms;
    }
    .list-item-enter:nth-child(1) {
      animation-delay: 100ms;
    }
    .list-item-enter:nth-child(2) {
      animation-delay: 200ms;
    }
    .list-item-enter:nth-child(3) {
      animation-delay: 300ms;
    }
    .list-item-enter:nth-child(4) {
      animation-delay: 400ms;
    }
    .list-item-enter:nth-child(5) {
      animation-delay: 500ms;
    }
    .list-item-enter:nth-child(6) {
      animation-delay: 600ms;
    }
  `,
  template: `
    <div class="mx-20 my-40 flex gap-5">
      <section>
        <div [animate.enter]="'fade-in-up'">
          <h3>2008</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div [animate.enter]="'fade-in-up'">
          <h3>2010</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div [animate.enter]="'fade-in-up'">
          <h4>2012</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>
      </section>

      <section>
        <div class="list-item" [animate.enter]="'list-item-enter'">
          <span>Name:</span>
          <span>Samuel</span>
        </div>

        <div class="list-item" [animate.enter]="'list-item-enter'">
          <span>Age:</span>
          <span>28</span>
        </div>

        <div class="list-item" [animate.enter]="'list-item-enter'">
          <span>Birthdate:</span>
          <span>02.11.1995</span>
        </div>

        <div class="list-item" [animate.enter]="'list-item-enter'">
          <span>City:</span>
          <span>Berlin</span>
        </div>

        <div class="list-item" [animate.enter]="'list-item-enter'">
          <span>Language:</span>
          <span>English</span>
        </div>

        <div class="list-item" [animate.enter]="'list-item-enter'">
          <span>Like Pizza:</span>
          <span>Hell yeah</span>
        </div>
      </section>
    </div>
  `,
})
export class AppComponent {}
