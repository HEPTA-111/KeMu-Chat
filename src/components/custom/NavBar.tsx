import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaGlobeAfrica } from "react-icons/fa";

const NavBar = () => {
  return (
    <>
      {/* Mobile */}
      <div className="w-11/12 md:hidden">
        <NavigationMenu>
          {/* Logo */}
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <FaGlobeAfrica className="size-8" />
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          {/* Links */}
          <NavigationMenuList>
            <NavigationMenuItem>
              <Sheet>
                <SheetTrigger>
                  {/* <Button variant={"ghost"}> */}
                  <Menu className="w-8 h-8  " />
                  {/* </Button> */}
                </SheetTrigger>
                <SheetContent side={"left"} className="w-full">
                  <div className="flex flex-col text-xl space-y-6 m-2  text-center">
                    <Link href="/">Chat</Link>
                    <Link href="/about">About Us</Link>
                    <Link href="/help">Help</Link>
                    <Link href="/faqs">FAQs</Link>
                    <Link href="/admin/dashboard">Admin</Link>
                    <Button>
                      <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                    <Button variant="outline">
                      <Link href="/auth/login">Login</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Desktop */}
      <div className="hidden md:block md:w-11/12 lg:w-2/3 py-2">
        <NavigationMenu>
          {/* Logo */}
          <NavigationMenuList>
            <NavigationMenuItem className="cursor-pointer">
              <Link href="/" legacyBehavior passHref>
                <FaGlobeAfrica className="size-8" />
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          {/* Links */}
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Chat
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/help" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Help
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/faqs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  FAQs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/admin/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Admin
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          {/* On Boarding */}
          <NavigationMenuList>
            <NavigationMenuItem className="mr-6">
              <Button>
                <Link href="/auth/signup" legacyBehavior passHref>
                  <NavigationMenuLink>SignUp</NavigationMenuLink>
                </Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="">
              <Button variant="outline">
                <Link href="/auth/login" legacyBehavior passHref>
                  <NavigationMenuLink>Login</NavigationMenuLink>
                </Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};

export default NavBar;
