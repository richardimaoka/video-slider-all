import fsPromises from "fs/promises";
import { SlidePage } from "../types";

export async function readPages(): Promise<SlidePage[]> {
  // Read pages from file
  const fileContents = await fsPromises.readFile(
    process.cwd() + "/app/api/slidePages/pages.json",
    "utf8"
  );

  const pages = JSON.parse(fileContents);
  return pages;
}
