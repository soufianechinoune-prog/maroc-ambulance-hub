import { Outlet } from "react-router-dom";

export default function BlogLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
