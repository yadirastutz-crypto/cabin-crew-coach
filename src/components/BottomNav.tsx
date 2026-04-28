import { Link, useLocation } from "wouter";
import { Home, BookOpen, Layers, Mic, Heart, User } from "lucide-react";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/academy", label: "Academy", icon: BookOpen },
    { href: "/practice", label: "Practice", icon: Layers },
    { href: "/speak", label: "Voice", icon: Mic },
    { href: "/calm", label: "Calm", icon: Heart },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 px-2 pb-safe pt-2 max-w-[430px] mx-auto shadow-[0_-4px_10px_rgba(23,50,77,0.05)]">
      <div className="flex justify-between items-center h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location === item.href ||
            (item.href !== "/" && location.startsWith(item.href));
          
          return (
            <Link key={item.href} href={item.href} className="flex-1 flex flex-col items-center justify-center gap-1 group touch-none select-none">
              <div className={`p-1.5 rounded-full transition-colors ${isActive ? 'bg-primary/5 text-accent' : 'text-muted-foreground group-hover:text-primary'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-primary'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
