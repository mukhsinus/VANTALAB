import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6">
      <div className="text-center max-w-md">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6C5CE7]">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-white tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-white/45 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button variant="vanta" className="mt-8 rounded-2xl px-8" asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
