import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/config";
import { getDebugFilesInfo } from "@/lib/blog";
import { slugify } from "@/lib/slugify";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cities } from "@/data/cities";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

const PER_PAGE = 9;

const BlogIndex = () => {
  const { keys } = getDebugFilesInfo();
  return (
    <div className="container mx-auto p-6">
      <h1>Probe /blog</h1>
      <p>filesFound: {keys.length}</p>
      <pre className="text-xs whitespace-pre-wrap break-all">
        {JSON.stringify(keys, null, 2)}
      </pre>
    </div>
  );
};

export default BlogIndex;
