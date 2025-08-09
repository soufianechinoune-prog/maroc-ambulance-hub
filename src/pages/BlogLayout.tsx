import { Outlet } from "react-router-dom";

// Lightweight layout for Blog nested routes
// Keeps pages in control of their own SEO/Header/Footer
export default function BlogLayout() {
  return <Outlet />;
}
