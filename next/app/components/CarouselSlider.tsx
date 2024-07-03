import { SlidePage } from "../api/types";
import styles from "./CarouselSlider.module.css";
import { CarouselPage } from "./CarouselPage";

type SlidePageState = SlidePage & {
  eager?: boolean;
};

interface Props {
  currentPageNum: number;
  images: SlidePageState[];
  onPageLoaded: (pageNum: number) => void;
}

export function CarouselSlider(props: Props) {
  const pageOffset = props.currentPageNum - 1;
  // `-0%` makes it a bit awkward, so special handling for 0%
  const translatePercentage = pageOffset === 0 ? 0 : -100 * pageOffset;

  return (
    <div className={styles.component}>
      <div
        className={styles.slider}
        style={{
          // simple props can make client-side animations!!
          transition: "transform 0.3s ease-in-out",
          transform: `translate(${translatePercentage}%)`,
        }}
      >
        {props.images.map((i) => (
          <CarouselPage
            key={i.id}
            pageNum={i.pageNum}
            imagePath={i.imageUrl}
            priority={props.currentPageNum === i.pageNum}
            eager={i.eager}
            onPageLoaded={props.onPageLoaded}
          />
        ))}
      </div>
    </div>
  );
}
