import css from './quantity-selector.css?inline';

export class QuantitySelector extends HTMLElement {
  private shadow: ShadowRoot;
  private quantity: number = 1;
  private spanEl!: HTMLSpanElement;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
    this.loadStyles();
  }

  static get observedAttributes() {
    return ['value'];
  }

  connectedCallback() {
    const valueAttr = this.getAttribute('value');
    this.quantity = valueAttr ? parseInt(valueAttr) : 1;
    this.updateDisplay();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'value') {
      this.quantity = parseInt(newValue);
      this.updateDisplay();
    }
  }

  private render() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('quantity-selector');

    const minus = document.createElement('button');
    minus.textContent = '-';
    minus.addEventListener('click', () => this.change(-1));

    this.spanEl = document.createElement('span');

    const plus = document.createElement('button');
    plus.textContent = '+';
    plus.addEventListener('click', () => this.change(1));

    wrapper.append(minus, this.spanEl, plus);
    this.shadow.appendChild(wrapper);
  }

  private change(delta: number) {
    this.quantity += delta;

    if (this.quantity < 1) {
      this.dispatchEvent(
        new CustomEvent('QuantityZero', { bubbles: true, composed: true })
      );
      this.remove();
      return;
    }

    this.setAttribute('value', this.quantity.toString());
    this.dispatchEvent(
      new CustomEvent('QuantityChange', {
        detail: { value: this.quantity },
        bubbles: true,
        composed: true,
      })
    );
  }

  private updateDisplay() {
    if (this.spanEl) {
      this.spanEl.textContent = this.quantity.toString();
    }
  }

  private loadStyles() {
    const style = document.createElement('style');
    style.textContent = css;
    this.shadow.appendChild(style);
  }
}

customElements.define('quantity-selector', QuantitySelector);
