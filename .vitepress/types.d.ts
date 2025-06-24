declare module 'vitepress' {
  interface LocaleSpecificConfig {
    notice?: {
      text: string;
      linkText: string;
    };
  }
}

export {};
