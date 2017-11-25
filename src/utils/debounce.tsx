export interface DebounceCallback {
  (reason: string, ocaml: string): void;
}

export default function (func: DebounceCallback, wait: number, immediate: boolean = false): DebounceCallback {
  let timeout: any;
  return (reason: string, ocaml: string) => {
    let context = this;
    let args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, [reason, ocaml]);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}
