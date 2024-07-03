## How to run

```
git clone https://github.com/richardimaoka/video-slider-app.git

cd video-slider-app/next

pnpm install
pnpm run dev
```

As the terminal output says, go to http://localhost:3000

## Source code

- `next/app/page.tsx` main page
- `next/app/components/Carousel.tsx` - main component and state management to check `if image(page) N is loaded?`

Below is the main logic to load 5 next/prev images(pages).

```
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
```

To avoid network contention while loading the current image(page), use `.isLoaded` state, and start the above eager loading only when the current page is already loaded.

```
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
```
