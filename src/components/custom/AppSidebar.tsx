import {
  Globe2,
  Home,
  LayoutDashboard,
  MessageSquare,
  Users2,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import clsx from "clsx";
import { CiChat1 } from "react-icons/ci";
import { useAuth } from "@/app/providers/AuthProvider";

interface Props {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  signOut: () => Promise<boolean>;
}

const AppSidebar = () => {
  const { user, isAuthenticated, userRole, signInUser, signOutUser, kemuUser } =
    useAuth();
  const userData = kemuUser;
  const router = useRouter();
  const pathname = usePathname();

  const userInitials = `${userData?.firstName?.charAt(
    0
  )}${userData?.lastName?.charAt(0)}`;
  return (
    <>
      <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
        <div>
          {/* User Profile */}
          <div className="inline-flex size-16 items-center justify-center">
            <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              {/* <Avatar>
                <AvatarFallback> {userInitials}</AvatarFallback>
              </Avatar> */}
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="hover:cursor-pointer hover:ring-2">
                    <AvatarFallback> {userInitials}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="ml-16">
                  <div className="flex flex-col space-y-2 text-center">
                    <div className="font-semibold">{`${userData?.firstName} ${userData?.lastName}`}</div>
                    <div className="pb-2">{userData?.email}</div>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        const success = await signOutUser();
                        if (success) {
                          router.replace("/auth/login");
                        }
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </span>
          </div>

          <div className="border-t border-gray-100">
            <div className="px-2">
              {/* Top Icon */}
              <div className="py-4">
                <Link
                  href="/admin/dashboard"
                  className={clsx(
                    "t group relative flex justify-center rounded  px-2 py-1.5 ",
                    pathname.endsWith("dashboard")
                      ? "bg-foreground text-white"
                      : ""
                  )}
                >
                  <LayoutDashboard className="size-5" />

                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    Dashboard
                  </span>
                </Link>
              </div>

              <ul className="space-y-1 border-t border-gray-100 pt-4">
                {/* Users */}
                <li>
                  <Link
                    href="/admin/users"
                    className={clsx(
                      "group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700",
                      pathname.endsWith("users")
                        ? "bg-foreground text-white"
                        : ""
                    )}
                  >
                    <Users2 className="size-5 " />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Users
                    </span>
                  </Link>
                </li>

                {/* Chat */}
                <li>
                  <Link
                    href="/"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <MessageSquare className="size-5" />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Chat
                    </span>
                  </Link>
                </li>

                {/* Home */}
                <li>
                  <Link
                    href="/"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <Home className="size-5 " />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Home Page
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <form action="#">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span
                className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                onClick={async () => {
                  const success = await signOutUser();
                  if (success) {
                    router.replace("/auth/login");
                  }
                }}
              >
                Logout
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;
