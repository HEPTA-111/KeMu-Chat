"use client";
import ChatBubble from "@/components/custom/ChatBubble";
import ChatInput from "@/components/custom/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

import { Ollama, ChatResponse } from "ollama/browser";
import { db } from "@/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../providers/AuthProvider";
import { redirect } from "next/navigation";

interface Message {
  role: string;
  content: string;
}

const Chat = () => {
  return redirect("/chat");
  const { user } = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (prompt: string) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const newMessage: Message = { role: "user", content: prompt };
    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);

    setIsLoading(true);

    try {
      const response = await ollamaChat(updatedMessages);

      const assistantMessage: Message = {
        role: "assistant",
        content: response.message.content,
      };
      setChatMessages([...updatedMessages, assistantMessage]);

      // Store the response in Firestore
      // await storeResponseInFirestore(response, user.uid);

      // Store the response in Firestore without awaiting
      storeResponseInFirestore(response, user.uid, updatedMessages).catch(
        (error) => {
          console.error("Error storing response in Firestore:", error);
        }
      );
    } catch (error) {
      console.error("Error in ollamaChat:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  // Nano seconds to seconds
  const nsToS = (nanoSeconds: number) => {
    return nanoSeconds / 1_000_000_000;
  };

  const storeResponseInFirestore = async (
    response: ChatResponse,
    userId: string,
    contextMessages: Message[]
  ) => {
    if (!response.prompt_eval_count) {
      response.prompt_eval_count = 1;
    }
    try {
      const docRef = await addDoc(collection(db, "kemuChatResponses"), {
        userId: userId,
        model: response.model,
        created_at: serverTimestamp(),
        message: response.message,
        contextMessages: contextMessages,
        done_reason: response.done_reason,
        done: response.done,
        total_duration: nsToS(response.total_duration),
        load_duration: nsToS(response.load_duration),
        prompt_eval_count: response.prompt_eval_count,
        prompt_eval_duration: nsToS(response.prompt_eval_duration),
        eval_count: response.eval_count,
        eval_duration: nsToS(response.eval_duration),
        prompt_eval_tks:
          response.prompt_eval_count / nsToS(response.prompt_eval_duration),
        response_eval_tks: response.eval_count / nsToS(response.eval_duration),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // load the model
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    ollamaLoad()
      .then(() => console.log("Loaded Model"))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Model loading aborted");
          return;
        }
        console.error("Error loading model:", error);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px)] ">
      <div className="w-full p-4 flex flex-col h-full">
        {/* Chat Bubbles Space */}
        <ScrollArea className="flex-grow pt-4 mb-4">
          <div className="flex flex-col items-center space-y-6">
            {chatMessages.map((message, index) => (
              <ChatBubble
                key={index}
                bot={message.role === "user" ? false : true}
                message={message.content}
              />
            ))}
            {isLoading && <ChatBubble bot={true} message="" isLoading={true} />}
          </div>
        </ScrollArea>
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

const ollamaChat = async (messages: Message[]): Promise<ChatResponse> => {
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
