import { readPages } from "../read";
const slidePagesPath = "/api/slidePages";

export async function GET(
  request: Request,
  { params }: { params: { pageNum: string } }
) {
  // Validate the request path
  const pageNum = Number(params.pageNum);
  if (isNaN(pageNum)) {
    return new Response(
      `request path = '${slidePagesPath}/${params.pageNum}' has non-numeric path segment = '${params.pageNum}'`,
      { status: 400 }
    );
  } else if (!Number.isInteger(pageNum)) {
    return new Response(
      `request path = '${slidePagesPath}/${params.pageNum}' has non-integer number = ${params.pageNum}`,
      { status: 400 }
    );
  } else if (pageNum < 1) {
    return new Response(
      `request path = '${slidePagesPath}/${params.pageNum}' has page number = ${params.pageNum}, but it should be >= 1`,
      { status: 400 }
    );
  }

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

  if (pageNum > pages.length) {
    return new Response(
      `request path = '${slidePagesPath}/${params.pageNum}' has page number = ${params.pageNum}, but exceeds the max page = ${pages.length}`,
      { status: 400 }
    );
  }

  const page = pages[pageNum - 1];

  return Response.json(page);
}
