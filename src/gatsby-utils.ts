import {withPrefix as withPrefixOrig} from "gatsby-link";

export function withPrefix(path: string): string {
  return withPrefixOrig(path);
}

export function withoutPrefix(path: string): string {
  if (typeof __PREFIX_PATHS__ !== "undefined" && __PREFIX_PATHS__) {
    return path.replace(__PATH_PREFIX__, "");
  }
  return path;
}

export function getPrefixedSrcSet(srcSet: string): string {
  return srcSet.split(",\n").map((imgSrc) => withPrefix(imgSrc)).join(",\n");
}
