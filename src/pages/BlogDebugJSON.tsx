import React from "react";
import { getAllPosts } from "@/lib/blog";

const BlogDebugJSON: React.FC = () => {
  const data = getAllPosts();
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Blog Debug JSON</h1>
      <pre className="text-sm whitespace-pre-wrap break-all bg-card p-4 rounded border">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
};

export default BlogDebugJSON;
