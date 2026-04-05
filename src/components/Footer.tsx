import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/30 bg-background/40 backdrop-blur-sm">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-primary/60" />
            <span>© {new Date().getFullYear()} PMEFA</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
            {[
              { to: "/about", label: "About" },
              { to: "/terms", label: "Terms" },
              { to: "/privacy", label: "Privacy" },
              { to: "/cookies", label: "Cookies" },
              { to: "/support", label: "Support" },
            ].map(l => (
              <Link key={l.to} to={l.to} className="hover:text-foreground transition-colors duration-200">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
