import Glide from "@glidejs/glide";
import coreCSS from "@glidejs/glide/dist/css/glide.core.min.css?inline";
import themeCSS from "@glidejs/glide/dist/css/glide.theme.min.css?inline";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("carousel-element")
export class CarouselElement extends LitElement {
  @property({ type: Number }) currentIndex = 0;
  @property({ type: Array }) images = [
    "https://source.unsplash.com/random?dog&h=300",
    "https://source.unsplash.com/random?cat&h=300",
    "https://source.unsplash.com/random?tiger&h=300",
    "https://source.unsplash.com/random?lion&h=300",
    "https://source.unsplash.com/random?rabbit&h=300",
  ];
  @property({ type: Boolean }) autoSlide = true;
  @property({ type: Number }) slideInterval = 5000;

  static styles = css`
    :host {
      display: block;
      scroll-behaviour: smooth;
    }
    ${unsafeCSS(coreCSS)}
    ${unsafeCSS(themeCSS)}
  `;

  firstUpdated() {
    const glide = new Glide(
      this.shadowRoot?.querySelector(".glide") as HTMLElement
    ).mount();
  }

  render() {
    return html`
      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            ${this.images.map(
              (image) =>
                html`<li class="glide__slide"><img style="width:100%;height: 300px" src="${image}" /></li>`
            )}
          </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
            prev
          </button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
            next
          </button>
        </div>
        <div class="glide__bullets" data-glide-el="controls[nav]">
          <button class="glide__bullet" data-glide-dir="=0"></button>
          <button class="glide__bullet" data-glide-dir="=1"></button>
          <button class="glide__bullet" data-glide-dir="=2"></button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "carousel-element": CarouselElement;
  }
}
