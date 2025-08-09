import { getDebugFilesInfo } from "@/lib/blog";

export const GET = () => {
  const data = getDebugFilesInfo();
  return new Response(JSON.stringify(data, null, 2), {
    headers: { "content-type": "application/json" }
  });
};
