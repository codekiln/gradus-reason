
export function withPrefix(path: string): string {
  if (typeof __PREFIX_PATHS__ !== "undefined" && __PREFIX_PATHS__) {
    return __PATH_PREFIX__ + path;
  }
  return path;
}

export function getPrefixedSrcSet(srcSet: string): string {
  return srcSet.split(",\n").map((imgSrc) => withPrefix(imgSrc)).join(",\n");
}
