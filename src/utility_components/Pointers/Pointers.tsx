import styles from './Pointers.module.css';
import PointerItem, { PointerItemData } from './PointerCard/PointerItem';
import { useEffect, useRef, useState } from 'react';

export type PointerData = {
  imgUrl: string,
  imgAlt: string,
  title: string,
  description: string,
}

const intersectionObserverCallback = (entries:IntersectionObserverEntry[], observer: IntersectionObserver) => {
  const startAnimationEvent = new CustomEvent('startAnimation');
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.dispatchEvent(startAnimationEvent);
      console.log('element in view');
      observer.unobserve(entry.target);
    }
  });
}

const intersectionObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
}

export default function Pointers ({id, pointersData}: {id: string, pointersData: PointerData[]}) {

  const pointersInViewObserver = useRef<IntersectionObserver>(
    new IntersectionObserver( intersectionObserverCallback, intersectionObserverOptions)
  );

  const observeItemInView = (elementRef: Element) => {
    console.log('new element added to observer!');
    pointersInViewObserver.current.observe(elementRef);
  }

  return (
    <div className={styles.container}>
      {pointersData.map((item, index) => {
          return (
            <PointerItem
              key={index}
              id={`id${index}`}
              layout={index % 2 ? "reverse" : "normal"}
              lineWidth={1}
              imgUrl= {item.imgUrl}
              imgAlt= {item.imgAlt}
              title= {item.title}
              description= {item.description}
              observeItemInView= {observeItemInView}
            />
          )
        })}
    </div>
  );
}

// How to dynamicly create refs:
// https://www.codemzy.com/blog/reactjs-useref-array
// https://mattclaffey.medium.com/adding-react-refs-to-an-array-of-items-96e9a12ab40c
  // ex:
  // const pointerAnimationRefs = useRef<(HTMLDivElement|null)[]>([]);
  // ref= {(element) => pointerAnimationRefs.current[index] = element}
  // In child component: function PointerItem (props: PointerData, ref: React.LegacyRef<HTMLDivElement>) {

// How to trigger animation when element is visible:
// https://coolcssanimation.com/how-to-trigger-a-css-animation-on-scroll/
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

// https://react.dev/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events