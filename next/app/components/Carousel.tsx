"use client";

import { useState } from "react";
import { SlidePage } from "../api/types";
import styles from "./Carousel.module.css";
import { CarouselSlider } from "./CarouselSlider";
import { NextButton } from "./NextButton";
import { PrevButton } from "./PrevButton";

type SlidePageState = SlidePage & {
  isLoaded: boolean;
};

interface Props {
  initialPageNum: number;
  initialAllPages: SlidePageState[];
}

export function Carousel(props: Props) {
  const [currentPageNum, setCurrentPageNum] = useState(props.initialPageNum);
  const lastPageNum = props.initialAllPages.length;

  // page array with loading state
  const [allPages, setAllPages] = useState(props.initialAllPages);

  // Page num starts from 1, not 0
  const hasPrevPage = currentPageNum > 1;
  const hasNextPage = currentPageNum < lastPageNum;

  const prevPath = `?page=${currentPageNum - 1}`;
  const nextPath = `?page=${currentPageNum + 1}`;

  function onPrevPage() {
    setCurrentPageNum(currentPageNum - 1);
  }

  function onNextPage() {
    setCurrentPageNum(currentPageNum + 1);
  }

  function onPageLoaded(pageNum: number) {
    // https://legacy.reactjs.org/docs/hooks-reference.html#functional-updates
    setAllPages((priorAllPages) => {
      const postAllPages = priorAllPages.map((e) => ({ ...e }));
      if (0 < pageNum && pageNum < priorAllPages.length) {
        postAllPages[pageNum - 1].isLoaded = true;
      }
      return postAllPages;
    });
  }

  // With eager-loading settings
  const isCurrentPageLoaded = allPages[currentPageNum - 1].isLoaded;
  const adjacentPagesToEagerLoad = 5;
  const allPagesToPassDown = allPages.map((x) => ({
    ...x,
    // eager image loading, only when current page is already loaded && page is adjacent to the current page
    eager:
      isCurrentPageLoaded &&
      Math.abs(currentPageNum - x.pageNum) <= adjacentPagesToEagerLoad,
  }));

  return (
    <div>
      <CarouselSlider
        currentPageNum={currentPageNum}
        onPageLoaded={onPageLoaded}
        images={allPagesToPassDown}
      />
      <div className={styles.buttons}>
        <PrevButton
          prevPath={prevPath}
          onPrevPage={onPrevPage}
          disabled={!hasPrevPage}
        />
        <NextButton
          nextPath={nextPath}
          onNextPage={onNextPage}
          disabled={!hasNextPage}
        />
      </div>
    </div>
  );
}
