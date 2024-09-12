import React, { useEffect, useState } from "react";
import { Plus, Sidebar } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { Conversation, getConversations } from "@/firebase/client/chatAction";
import { Badge } from "../ui/badge";
import { getRelativeTime } from "@/app/utils/lib";

const ChatSideBar = () => {
  const { user } = useAuth();
  const [allConversations, setAllConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!user) return;
    getConversations(user.uid, 10).then((conversations) => {
      setAllConversations(conversations);
    });
  }, [user]);

  return (
    <div className="fixed left-4 top-20 z-40">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Sidebar className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Chats</SheetTitle>
            <SheetDescription className="sr-only">
              You manage your conversations here.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col pt-4">
            <div className="h-24 mb-8 flex flex-col justify-between">
              <Link href="/chat">
                <Button className="w-full">
                  <Plus className="mr-2 flex-shrink-0" />
                  <span className="truncate">New Chat</span>
                </Button>
              </Link>
            </div>
            <div className="font-semibold text-lg mb-2 truncate">Recent</div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              {allConversations.map((conversation, index) => (
                <Link
                  href={`/chat/${conversation.conversationId}`}
                  key={index}
                  className="flex justify-between items-center w-full mb-2"
                >
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="truncate text-base font-normal">
                      {conversation.chatTitle}
                    </span>
                  </Button>
                  <Badge
                    variant="outline"
                    className="text-muted-foreground hidden md:block text-nowrap"
                  >
                    {getRelativeTime(conversation.created_at.toDate())}
                  </Badge>
                </Link>
              ))}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatSideBar;
