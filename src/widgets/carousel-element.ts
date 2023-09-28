import Glide from "@glidejs/glide";
import coreCSS from "@glidejs/glide/dist/css/glide.core.min.css?inline";
import themeCSS from "@glidejs/glide/dist/css/glide.theme.min.css?inline";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("carousel-element")
export class CarouselElement extends LitElement {
  @property({ type: Array }) images = [];
  @property({ type: Boolean }) autoSlide = true;
  private glideInitialized = false;
  private isLoading = true;

  constructor() {
    super();
    const myHeaders = new Headers();
    myHeaders.append("X-Appwrite-Project", "651531816d40ffe94b3b");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      "https://cloud.appwrite.io/v1/databases/651531bb168df5f58762/collections/6515330e9cd4c6f73d9c/documents?queries[]=equal(\"playlist\", ['651533ae2a0f742c8c82'])&queries[]=select(['image', '$id'])",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.images = result.documents.map((v: any) => v.image);
        this.isLoading = false;
        if (!this.glideInitialized) {
          this.glideInitialized = true;
          this.requestUpdate();
        }
      })
      .catch((error) => {
        console.log("error", error);
        this.isLoading = false;
      });
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("images") && this.images.length > 0) {
      new Glide(this.shadowRoot?.querySelector(".glide") as HTMLElement, {
        type: "carousel",
        autoplay: this.autoSlide ? 2000 : false,
      }).mount();
    }
  }

  static styles = css`
    :host {
      display: block;
      scroll-behaviour: smooth;
    }
    ${unsafeCSS(coreCSS)}
    ${unsafeCSS(themeCSS)}
    .glide {
      max-width: 100%;
      margin: 0 auto;
    }

    .glide__slide img {
      width: 100%;
      height: auto;
    }
    .slider__arrow {
      border-radius: 50%;
      background-color: #818999;
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      -webkit-box-shadow: 0 0.5rem 4rem 0 rgba(0, 0, 0, 0.5);
      box-shadow: 0 0.5rem 4rem 0 rgba(0, 0, 0, 0.5);
      padding: 5px;
      width: 24px;
      height: 24px;
    }
    .slider__arrow svg {
      position: relative;
      right: 1px;
      top: -1px;
    }
    .loading-skeleton {
      width: 100%;
      height: 300px; /* Set an appropriate height for the loading skeleton */
      background-color: #eee; /* Placeholder background color */
      animation: loading 1.5s infinite; /* Add a loading animation */
    }

    @keyframes loading {
      0% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.5;
      }
    }
  `;

  render() {
    if (this.isLoading) {
      return html`<div class="loading-skeleton"></div>`;
    } else {
      return html`
        <div class="glide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              ${this.images.map(
                (image) =>
                  html`<li class="glide__slide">
                    <img src="${image}" />
                  </li>`
              )}
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
            <button
              class="slider__arrow glide__arrow glide__arrow--left"
              data-glide-dir="<"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path
                  d="M0 12l10.975 11 2.848-2.828-6.176-6.176H24v-3.992H7.646l6.176-6.176L10.975 1 0 12z"
                ></path>
              </svg>
            </button>
            <button
              class="slider__arrow glide__arrow glide__arrow--right"
              data-glide-dir=">"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="glide__bullets" data-glide-el="controls[nav]">
            ${this.images.map(
              (_, index) =>
                html`<button
                  class="glide__bullet"
                  data-glide-dir="=${index}"
                ></button>`
            )}
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "carousel-element": CarouselElement;
  }
}
