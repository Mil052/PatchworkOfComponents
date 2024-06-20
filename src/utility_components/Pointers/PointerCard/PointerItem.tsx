import { useEffect, useRef } from 'react';
import WritingText from './WritingText/WritingText';
import styles from './PointerItem.module.css';

export type PointerItemData = {
  id: number|string,
  layout: "normal"|"reverse",
  lineWidth: number,
  imgUrl: string,
  imgAlt: string,
  title: string,
  description: string,
  observeItemInView: (elementRef: Element) => void
}

export default function PointerItem (props: PointerItemData) {
  const {id, layout, lineWidth, imgUrl, imgAlt, title, description, observeItemInView} = props;

  const imgItemRef = useRef<HTMLImageElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const writingTextRef = useRef<{triggerWriting: () => void}>(null);
  const svgAnimationRef = useRef<SVGAnimateElement>(null);
  
  const triggerImageAnimation = () => {
    imgItemRef.current!.style.animationPlayState = 'running';
  }

  const triggerDescriptionAnimation = () => {
    const title = descriptionRef.current?.firstElementChild as HTMLElement;
    title.style.animationPlayState = 'running';
    svgAnimationRef.current?.beginElement();
    writingTextRef.current?.triggerWriting();
  }

  useEffect(() => {
    const image = imgItemRef.current;
    const description = descriptionRef.current;
    if (image) {
      image.addEventListener('startAnimation', triggerImageAnimation);
      observeItemInView(image);
    }
    if (description) {
      description.addEventListener('startAnimation', triggerDescriptionAnimation);
      observeItemInView(description);
    }
    return () => {
      image?.removeEventListener('startAnimation', triggerImageAnimation);
      description?.removeEventListener('startAnimation', triggerDescriptionAnimation);
    }
  }, [observeItemInView]);

  return (
    <div className={styles.pointerItemContainer + " " + (layout === 'reverse' ?  styles.reverse : styles.normal)}>
      <img src={imgUrl} alt={imgAlt} className={styles.itemImg} ref={imgItemRef} />
      <div className={styles.itemDescription} ref={descriptionRef}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <svg viewBox="0 0 400 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M399 24H1" stroke="black" strokeWidth={lineWidth} strokeLinecap="round"  strokeDasharray="398" strokeDashoffset="398">
              <animate
                ref={svgAnimationRef}
                attributeType="XML"
                attributeName="stroke-dashoffset"
                id={"pointerLine" + id}
                from="398"
                to="0"
                dur="0.7s"
                fill="freeze"
                begin="indefinite"
              />
            </path>
            <polyline points="1,24 1,24 1,24" stroke="black" strokeWidth={lineWidth} strokeLinecap="round" strokeLinejoin="round" visibility="hidden" className={styles.arrowhead}>
              <set
                attributeType="XML"
                attributeName="visibility"
                to="visible"
                begin={"pointerLine" + id + ".end"}
                fill="freeze"
              />
              <animate
                attributeType="XML"
                attributeName="points"
                id="line-animation"
                to="26.5,1 1,24 26.5,47"
                dur="0.3s"
                fill="freeze"
                begin={"pointerLine" + id + ".end"}
              />
            </polyline>
          </g>
        </svg>
        <p className={styles.itemText}>
          <WritingText text={description} ref={writingTextRef}/>
        </p>
      </div>
    </div>
  )
}