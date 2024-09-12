"use client";
import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FaGlobeAfrica } from "react-icons/fa";
import Image from "next/image";
import companyLogo from "@/res/images/logos/logo.png";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { FeedbackDialog } from "./FeedbackDialog";

const AppNavbar = () => {
  const pathname = usePathname();
  const isAdminPath = pathname.includes("/admin");
  const { kemuUser, userInitials, signOutUser, userRole } = useAuth();
  const isAdmin = userRole?.userRole === "admin";
  const NavLink = ({
    href,
    children,
    className = "",
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const isActive = pathname.endsWith(href);
    return (
      <Link
        href={href}
        className={`transition-colors hover:text-foreground ${
          isActive ? "text-foreground" : "text-muted-foreground"
        } ${className}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        {/* Desktop Navbar */}
        {isAdminPath ? (
          // Admin Navbar
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <FaGlobeAfrica className="size-6" />
              <span className="sr-only">Kemu Chat</span>
            </Link>
            <NavLink href="/admin/dashboard">Dashboard</NavLink>
            <NavLink href="/admin/users">Users</NavLink>
            <NavLink href="/admin/feedback">Feedback</NavLink>
            <NavLink href="/">Chat</NavLink>
          </nav>
        ) : (
          // User Navbar
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <FaGlobeAfrica className="size-6" />
              <span className="sr-only">Kemu Chat</span>
            </Link>
            <NavLink href="/">Chat</NavLink>
            <NavLink href="/help">Help</NavLink>
            <NavLink href="/faqs">FAQs</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="#">
              <FeedbackDialog />
            </NavLink>
            {isAdmin && <NavLink href="/admin/dashboard">Admin</NavLink>}
          </nav>
        )}

        {/* Mobile Navbar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          {isAdminPath ? (
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Menu Items
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FaGlobeAfrica className="h-6 w-6" />
                  <span className="sr-only">Kemu Chat</span>
                </Link>
                <NavLink href="/admin/dashboard">Dashboard</NavLink>
                <NavLink href="/admin/users">Users</NavLink>
                <NavLink href="/">Chat</NavLink>
              </nav>
            </SheetContent>
          ) : (
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Menu Items
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FaGlobeAfrica className="h-6 w-6" />
                  <span className="sr-only">Kemu Chat</span>
                </Link>
                <NavLink href="/" className="hover:text-foreground">
                  Chat
                </NavLink>
                <NavLink href="/help">Help</NavLink>
                <NavLink href="/faqs">FAQs</NavLink>
                <NavLink href="/about">About</NavLink>
                {isAdmin && <NavLink href="/admin/dashboard">Admin</NavLink>}
              </nav>
            </SheetContent>
          )}
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="hover:cursor-pointer hover:bg-muted p-2 rounded-md"
            >
              <div className="flex gap-2 md:gap-4 ">
                <Button variant="ghost" size="icon" className="rounded-full ">
                  <Avatar className="size-12 ">
                    <AvatarFallback> {userInitials}</AvatarFallback>
                    <span className="sr-only">Toggle user menu</span>
                  </Avatar>
                </Button>

                <div className="hidden md:block ">
                  <div className="text-sm font-bold">
                    {kemuUser?.firstName} {kemuUser?.lastName}
                  </div>
                  <div className="text-xs font-light">{kemuUser?.email}</div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-medium">
                {userRole?.userRole.charAt(0).toUpperCase()}
                {userRole?.userRole.slice(1)}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {kemuUser?.firstName} {kemuUser?.lastName}
              </DropdownMenuItem>
              <DropdownMenuItem>{kemuUser?.email}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={signOutUser}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default AppNavbar;
