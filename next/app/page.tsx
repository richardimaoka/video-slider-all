import { SlidePage } from "./api/types";
import { Carousel } from "./components/Carousel";
import styles from "./page.module.css";

async function getPages() {
  const res = await fetch("http://localhost:3000/api/slidePages", {
    cache: "no-store",
  });
  const pages = (await res.json()) as SlidePage[];

  return pages;
}

async function getCurrentPage(pageNum: number) {
  const res = await fetch(`http://localhost:3000/api/slidePages/${pageNum}`, {
    cache: "no-store",
  });
  const page = (await res.json()) as SlidePage;

  return page;
}

function extendPages(pages: SlidePage[]) {
  return pages.map((page) => ({ ...page, isLoaded: false }));
}

interface Props {
  searchParams: { page?: string | string[] };
}

export default async function Page(props: Props) {
  // Validate the search param
  let pageNum = Number(props.searchParams.page);
  if (isNaN(pageNum)) {
    pageNum = 1;
  } else if (!Number.isInteger(pageNum)) {
    pageNum = 1;
  }

  const pages = await getPages().catch((error) => {
    console.log(error);
    return new Error("internal error happened");
  });
  if (pages instanceof Error) {
    throw new Error("error from getPages()");
  }

  const currentPage = await getCurrentPage(pageNum).catch((error) => {
    console.log(error);
    return new Error("internal error happened");
  });
  if (currentPage instanceof Error) {
    throw new Error("error from getCurrentPage()");
  }

  const extendedPages = extendPages(pages);

  return (
    <div className={styles.component}>
      <div className={styles.inner}>
        <Carousel
          initialPageNum={currentPage.pageNum}
          initialAllPages={extendedPages}
        />
      </div>
    </div>
  );
}
