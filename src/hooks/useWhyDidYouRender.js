import { useRef, useEffect } from "react";

export function useWhyDidYouRender(name, props) {
  const prevRef = useRef();
  useEffect(() => {
    const prev = prevRef.current;
    if (prev) {
      const allKeys = new Set([...Object.keys(prev), ...Object.keys(props)]);
      const changes = [];
      allKeys.forEach((key) => {
        if (prev[key] !== props[key]) {
          changes.push({
            key,
            prev: prev[key],
            next: props[key],
          });
        }
      });
      if (changes.length) {
        console.group(`[whyDidYouRender] ${name}`);
        changes.forEach((c) =>
          console.log(c.key, { prev: c.prev, next: c.next })
        );
        console.groupEnd();
      }
    }
    prevRef.current = props;
  }, [name, props]);
}
export default useWhyDidYouRender;