interface DebounceCallback {
  (param1: any, param2: any): void;
}

export default function (func: DebounceCallback, wait: number, immediate: boolean = false): () => void {
  let timeout: any;
  return () => {
    let context = this;
    let args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
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
