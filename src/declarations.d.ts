// package.json
declare module "*/package.json" {
  export const version: string;
  export const author: string;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.svg";

declare const __PREFIX_PATHS__: boolean;
declare const __PATH_PREFIX__: string;

declare const graphql: (query: TemplateStringsArray) => void;
