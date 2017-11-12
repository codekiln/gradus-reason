// package.json
declare module "*/package.json" {
  export const version: string;
  export const author: string;
}

declare module "*.png";

declare const graphql: (query: TemplateStringsArray) => void;
