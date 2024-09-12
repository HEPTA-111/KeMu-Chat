// Icons
import { Sidebar } from "lucide-react";

// Shadcn
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Custom Components
import ChatSideBar from "./ChatSideBar";
import TopBarSettings from "./TopBarSettings";

// Next
import Link from "next/link";

// Firebase
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import KemuUser from "@/app/interfaces/KemuUser";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  const router = useRouter();

  const userId = user?.uid;
  const userDocRef = userId ? doc(db, "kemuChatUsers", userId) : null;
  const [userData, loadingDoc, errorDoc] = useDocumentData(userDocRef);
  const KemuUserData = userData as KemuUser;
  const userInitials = `${KemuUserData?.firstName?.charAt(
    0
  )}${KemuUserData?.lastName?.charAt(0)}`;

  return (
    <div className=" flex justify-between items-center ">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Sidebar className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-full">
            <ChatSideBar />
          </SheetContent>
        </Sheet>
      </div>
      <Link href="/" className="font-semibold text-lg md:text-xl">
        KeMU Chat
      </Link>
      <div className="flex  items-center  ">
        <TopBarSettings />
        <Avatar className="h-8 w-8 md:h-10 md:w-10">
          <Popover>
            <PopoverTrigger asChild>
              <AvatarFallback
                className={`hover:ring-2 hover:cursor-pointer focus:ring-2 ring-primary ring-inset ${
                  loadingDoc ? "animate-pulse" : ""
                }`}
              >
                {!loadingDoc && userInitials}
              </AvatarFallback>
            </PopoverTrigger>
            <PopoverContent className="mr-4">
              <div className="flex flex-col space-y-2 text-center">
                <div className="font-semibold">{`${KemuUserData?.firstName} ${KemuUserData?.lastName}`}</div>
                <div className="pb-2">{KemuUserData?.email}</div>
                <Button
                  variant="outline"
                  onClick={async () => {
                    const success = await signOut();
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
        </Avatar>
      </div>
    </div>
  );
};

export default TopBar;
