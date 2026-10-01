"use client";

import { ArrowRight, Layers, Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type NavigationSection = {
  title: string;
  href: string;
  isActive?: boolean;
};

export default function Header({
  navigationData,
}: {
  navigationData: NavigationSection[];
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/90 py-3 pl-6 pr-3 shadow-lg backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2" aria-label="Next360 home">
          <Layers className="h-5 w-5 text-lime-500" aria-hidden="true" />
          <span className="text-lg font-bold tracking-tighter text-black">
            NEXT360
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationData.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  href={item.href}
                  active={item.isActive}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent",
                    item.isActive && "text-black",
                  )}
                >
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild className="rounded-full bg-black text-white hover:bg-gray-800">
            <Link href="/contact">
              Get In Touch
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Menu
            </p>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navigationData.map((item) => (
                <SheetClose asChild key={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-base font-medium transition hover:bg-accent",
                      item.isActive ? "text-black" : "text-gray-600",
                    )}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button asChild className="mt-auto rounded-full bg-black text-white">
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
