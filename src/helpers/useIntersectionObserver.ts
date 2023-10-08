import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionObserverEntry {
  isIntersecting: boolean;
  target: Element;
}

type IntersectionObserverCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

interface UseIntersectionObserverReturn {
  ref: Dispatch<SetStateAction<Element | null>>;
  isIntersecting: boolean;
}

type IntersectionObserverProps = {
  callback?: IntersectionObserverCallback;
  options?: IntersectionObserverOptions;
  defaultStatus?: boolean;
};

const useIntersectionObserver = ({
  defaultStatus = false,
  callback = () => {},
  options = { threshold: 1 },
}: IntersectionObserverProps): UseIntersectionObserverReturn => {
  const [isIntersecting, setIsIntersecting] = useState(defaultStatus);
  const [node, setNode] = useState<Element | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      callback(entry, observer.current!);
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (node) observer.current.observe(node);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [callback, node, options]);

  return { ref: setNode, isIntersecting };
};

export default useIntersectionObserver;
