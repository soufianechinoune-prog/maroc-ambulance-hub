import React from "react";
import { getDebugFilesInfo } from "@/lib/blog";

const BlogDebugFilesJSON: React.FC = () => {
  const data = getDebugFilesInfo();
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Blog Debug Files</h1>
      <pre className="text-sm whitespace-pre-wrap break-all bg-card p-4 rounded border">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
};

export default BlogDebugFilesJSON;
