"use client";

import ChatBubble from "@/components/custom/ChatBubble";
import ChatInput from "@/components/custom/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";

import { Ollama, ChatResponse } from "ollama/browser";
import { useAuth } from "@/app/providers/AuthProvider";
import {
  ChatMessage,
  Conversation,
  createNewConversation,
  updateConversation,
  getConversation,
  storeResponseInFirestore,
} from "@/firebase/client/chatAction";
import ChatSideBar from "@/components/custom/ChatSideBar";

interface Props {
  params: {
    slug: string[];
  };
}

const Chat = ({ params }: Props) => {
  const conversationId = params?.slug ? params.slug[0] : null;
  const { user } = useAuth();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const loadConversation = useCallback(
    async (conversationId: string) => {
      if (!user) return;

      try {
        const loadedConversation = await getConversation(
          user.uid,
          conversationId
        );
        if (loadedConversation) {
          setConversation(loadedConversation);
        } else {
          setError("Conversation not found");
        }
      } catch (error) {
        setError("Error loading conversation");
        console.error("Error loading conversation:", error);
      }
    },
    [user]
  );

  useEffect(() => {
    if (user && conversationId) {
      loadConversation(conversationId);
    }
  }, [user, conversationId, loadConversation]);

  useEffect(() => {
    if (shouldRedirect && conversation) {
      router.push(`/chat/${conversation.conversationId}`);
      setShouldRedirect(false);
    }
  }, [conversation, router, shouldRedirect]);

  const handleFormSubmit = async (prompt: string) => {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    setError(null);
    const newMessage: ChatMessage = { role: "user", content: prompt };
    setIsLoading(true);

    // Optimistic update for user message
    setConversation((prev) =>
      prev
        ? {
            ...prev,
            chatMessages: [...prev.chatMessages, newMessage],
            modified_at: Timestamp.now(),
          }
        : {
            conversationId: "",
            chatMessages: [newMessage],
            created_at: Timestamp.now(),
            modified_at: Timestamp.now(),
            chatTitle: "New Conversation",
            model: "gemma:2b",
          }
    );

    try {
      let currentConversationId = conversationId;
      let isNewConversation = false;

      if (!currentConversationId) {
        currentConversationId = await createNewConversation(
          user.uid,
          newMessage,
          "gemma:2b"
        );
        isNewConversation = true;
      } else {
        await updateConversation(user.uid, currentConversationId, newMessage);
      }

      const response = await ollamaChat([newMessage]);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.message.content,
      };

      // Update conversation with both user message and assistant response
      setConversation((prev) => {
        if (!prev) return null;
        const updatedConversation = {
          ...prev,
          conversationId: currentConversationId,
          chatMessages: [...prev.chatMessages, assistantMessage],
          modified_at: Timestamp.now(),
        };
        return updatedConversation;
      });

      await updateConversation(
        user.uid,
        currentConversationId,
        assistantMessage
      );

      await storeResponseInFirestore(response, user.uid, [newMessage]);

      if (isNewConversation) {
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error("Error in chat process:", error);
      setError("Failed to save conversation. Please try again.");
      // Revert optimistic update if there's an error
      setConversation((prev) =>
        prev
          ? {
              ...prev,
              chatMessages: prev.chatMessages.slice(0, -1),
            }
          : null
      );
    } finally {
      setIsLoading(false);
    }
  };

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation?.chatMessages]);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <ChatSideBar />
      <div className="w-full p-4 flex flex-col h-full">
        <ScrollArea className="flex-grow pt-4 mb-4">
          <div className="flex flex-col items-center space-y-6">
            {conversation?.chatMessages.map((message, index) => (
              <ChatBubble
                key={index}
                bot={message.role === "user" ? false : true}
                message={message.content}
              />
            ))}
            {isLoading && <ChatBubble bot={true} message="" isLoading={true} />}
            <div ref={lastMessageRef} /> {/* Invisible element to scroll to */}
          </div>
        </ScrollArea>
        {/* Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {/* Chat Input */}
        <div className="flex items-center justify-center">
          <div className="w-full lg:w-8/12 xl:w-6/12">
            <ChatInput onSubmitForm={handleFormSubmit} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

const ollamaChat = async (messages: ChatMessage[]): Promise<ChatResponse> => {
  const ollama = new Ollama({ host: process.env.NEXT_PUBLIC_OLLAMA_URL });
  const response = await ollama.chat({
    model: "gemma:2b",
    messages: messages,
    stream: false,
  });
  return response;
};

const ollamaLoad = async () => {
  const ollama = new Ollama({ host: process.env.NEXT_PUBLIC_OLLAMA_URL });
  await ollama.chat({
    model: "gemma:2b",
    keep_alive: "6h",
  });
};
