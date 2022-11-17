import {
  useState,
  useRef,
  useEffect
} from "react";
export function useIntersectionObserver(ref, options = {}, forward = true) {
  const [element, setElement] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef(null);
  const cleanObserve = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };
  useEffect(() => {
    setElement(ref.current);
  }, [ref]);
  useEffect(() => {
    if (!element)
      return;
    cleanObserve();
    const ob = (observer.current = new IntersectionObserver(([entry]) => {
      const isElementIntersecting = entry.isIntersecting;
      if (!forward) {
        setIsIntersecting(isElementIntersecting);
      } else if (forward && !isIntersecting && isElementIntersecting) {
        setIsIntersecting(isElementIntersecting);
        cleanObserve();
      }
    }, Object.assign({}, options)));
    ob.observe(element);
    return () => {
      cleanObserve();
    };
  }, [element, forward, isIntersecting, options]);
  return isIntersecting;
}