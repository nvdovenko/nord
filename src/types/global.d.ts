declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ['basic-button']: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          label?: string;
          secondary?: boolean;
          onClick?: () => void;
        },
        HTMLElement
      >;

      ['quantity-selector']: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: number;
          onQuantityChange?: (event: CustomEvent<{ value: number }>) => void;
          onQuantityZero?: (event: CustomEvent<void>) => void;
        },
        HTMLElement
      >;
    }
  }
}

declare global {
  declare module '*.scss?inline' {
    const content: string;
    export default content;
  }

  declare module '*.css?inline' {
    const content: string;
    export default content;
  }

  interface HTMLElementEventMap {
    QuantityChange: CustomEvent<{
      value: number;
    }>;
    QuantityZero: CustomEvent<void>;
  }
}

export {};
