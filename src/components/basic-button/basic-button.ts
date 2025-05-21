import css from './basic-button.css?inline';

export class BasicButton extends HTMLElement {
  private buttonEl: HTMLButtonElement;

  constructor() {
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create a button element
    this.buttonEl = document.createElement('button');

    // Append the button to the shadow DOM
    shadow.appendChild(this.buttonEl);

    // Load styles
    this.loadStyles(shadow);
  }

  // Called when the element is added to the DOM
  connectedCallback(): void {
    this.updateButtonText();
    this.updateButtonType();
  }

  private updateButtonText(): void {
    const label = this.getAttribute('label') ?? '';

    // Clear existing button content (if any)
    this.buttonEl.innerHTML = '';

    // Append the label text
    const textNode = document.createTextNode(label);
    this.buttonEl.appendChild(textNode);
  }

  private updateButtonType(): void {
    this.buttonEl.classList.toggle('secondary', this.hasAttribute('secondary'));
  }

  // Method to load external CSS file into the shadow DOM
  private loadStyles(shadow: ShadowRoot): void {
    const styles = document.createElement('style');
    styles.appendChild(document.createTextNode(css));
    shadow.appendChild(styles);
  }
}

// Define the custom button element
customElements.define('basic-button', BasicButton);
