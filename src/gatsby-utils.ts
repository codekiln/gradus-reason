import {withPrefix as withPrefixOrig} from "gatsby-link";

export function withPrefix(path: string): string {
  return withPrefixOrig(path);
}

export function getPrefixedSrcSet(srcSet: string): string {
  return srcSet.split(",\n").map((imgSrc) => withPrefix(imgSrc)).join(",\n");
}
