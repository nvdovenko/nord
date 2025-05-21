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
}

export {};
