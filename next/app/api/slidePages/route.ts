import { readPages } from "./read";

export async function GET() {
  // Read the data
  const pages = await readPages().catch((error) => {
    console.log(error);
    return new Error("failed to read pages");
  });
  if (pages instanceof Error) {
    return new Response(`internal error happned upon reading pages`, {
      status: 500,
    });
  }

  return Response.json(pages);
}
