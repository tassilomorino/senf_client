/** @format */

import { useState, useEffect, useMemo, RefObject, createRef } from "react";

import { throttle } from "lodash";


export const useIntersection = (element: RefObject<HTMLElement>, rootMargin?: IntersectionObserver["rootMargin"]) => {
  const [isEntry, setEntry] = useState<IntersectionObserverEntry>();

  const observer = useMemo(() => new IntersectionObserver(
    ([entry]) => setEntry(entry),
    { rootMargin }
  ), [rootMargin]);

  useEffect(() => {
    if (element.current) observer.observe(element.current);
    return () => observer.disconnect()
  }, [element, observer]);

  return isEntry;
};

/**
 * Check if an element is in viewport

 * @param {number} offset - Number of pixels up to the observable element from the top
 * @param {number} throttleMilliseconds - Throttle observable listener, in ms
 */
type Visibility = boolean | string | undefined
export function useVisibility<Element extends HTMLElement>(offset = 0, throttleMilliseconds = 100): [Visibility, RefObject<Element>] {
  const [isVisible, setIsVisible] = useState<Visibility>(undefined);
  const currentElement = createRef<Element>();

  const checkVisibility = throttle(() => {
    if (!currentElement.current) {
      setIsVisible(undefined);
      return;
    }
    const { top, bottom, left, right } = currentElement.current.getBoundingClientRect();
    const t = top + offset >= 0 && top - offset <= window.innerHeight
    const b = bottom + offset >= 0 && bottom - offset <= window.innerHeight
    const l = left + offset >= 0 && left - offset <= window.innerWidth
    const r = right + offset >= 0 && right - offset <= window.innerWidth
    if (!t) setIsVisible("down");
    else if (!b) setIsVisible("up");
    else if (!l) setIsVisible("right");
    else if (!r) setIsVisible("left");
    else setIsVisible(false);
  }, throttleMilliseconds);

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    return () => window.removeEventListener("scroll", checkVisibility);
  });
  useEffect(checkVisibility, [isVisible, currentElement, checkVisibility]);

  return [isVisible, currentElement];
}
