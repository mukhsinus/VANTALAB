import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="vanta-app-bg flex min-h-dvh items-center justify-center px-6 py-12">
      <div className="text-center max-w-md">
        <p className="text-xs font-medium text-[#8B8F98]">404</p>
        <h1 className="mt-2 font-heading font-bold text-3xl text-[#F4F5F7] tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-[#8B8F98] leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button variant="vanta" className="mt-8 rounded-full px-8 text-xs font-semibold" asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
