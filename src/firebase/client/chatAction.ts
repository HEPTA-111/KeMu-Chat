// @/firebase/client/chatAction.ts

import { ChatResponse } from "ollama/browser";
import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  Timestamp,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  query,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { getConversationSummary } from "@/app/utils/lib";

export interface ChatMessage {
  role: string;
  content: string;
}

export interface Conversation {
  conversationId: string;
  chatMessages: ChatMessage[];
  created_at: Timestamp;
  modified_at: Timestamp;
  chatTitle: string;
  model: string;
}

const conversationConverter: FirestoreDataConverter<Conversation> = {
  toFirestore: (conversation: Conversation) => {
    return {
      ...conversation,
      created_at: serverTimestamp(),
      modified_at: serverTimestamp(),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: any
  ): Conversation => {
    const data = snapshot.data(options);
    return {
      conversationId: snapshot.id,
      chatMessages: data.chatMessages,
      created_at: data.created_at,
      modified_at: data.modified_at,
      chatTitle: data.chatTitle,
      model: data.model,
    };
  },
};

export const nsToS = (nanoSeconds: number): number => {
  return nanoSeconds / 1_000_000_000;
};

export const createNewConversation = async (
  userId: string,
  initialMessage: ChatMessage,
  model: string
): Promise<string> => {
  try {
    const userChatsRef = doc(db, "kemuUserChats", userId);
    const conversationTitle = initialMessage.content
      .split(" ")
      .slice(0, 2)
      .join(" ");
    const conversationsRef = collection(
      userChatsRef,
      "conversations"
    ).withConverter(conversationConverter);

    const newConversation: Omit<
      Conversation,
      "conversationId" | "created_at" | "modified_at"
    > = {
      chatMessages: [initialMessage],
      chatTitle: conversationTitle,
      model: model,
    };

    const newConversationRef = await addDoc(
      conversationsRef,
      newConversation as Conversation
    );

    return newConversationRef.id;
  } catch (error) {
    console.error("Error creating new conversation:", error);
    throw error;
  }
};

export const updateConversation = async (
  userId: string,
  conversationId: string,
  newMessage: ChatMessage
): Promise<void> => {
  try {
    const conversationRef = doc(
      db,
      "kemuUserChats",
      userId,
      "conversations",
      conversationId
    ).withConverter(conversationConverter);
    const conversationSnap = await getDoc(conversationRef);

    if (conversationSnap.exists()) {
      const currentConversation = conversationSnap.data();
      await updateDoc(conversationRef, {
        chatMessages: [...currentConversation.chatMessages, newMessage],
        modified_at: serverTimestamp(),
      });
    } else {
      console.error("Conversation not found");
      throw new Error("Conversation not found");
    }
  } catch (error) {
    console.error("Error updating conversation:", error);
    throw error;
  }
};

export const getConversation = async (
  userId: string,
  conversationId: string
): Promise<Conversation | null> => {
  try {
    const conversationRef = doc(
      db,
      "kemuUserChats",
      userId,
      "conversations",
      conversationId
    ).withConverter(conversationConverter);
    const conversationSnap = await getDoc(conversationRef);

    if (conversationSnap.exists()) {
      return conversationSnap.data();
    } else {
      console.error("Conversation not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};

export const getConversations = async (
  userId: string,
  limitCount?: number
): Promise<Conversation[]> => {
  try {
    const userChatsRef = doc(db, "kemuUserChats", userId);
    const conversationsRef = collection(
      userChatsRef,
      "conversations"
    ).withConverter(conversationConverter);

    let q = query(conversationsRef, orderBy("created_at", "desc"));

    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

export const storeResponseInFirestore = async (
  response: ChatResponse,
  userId: string,
  contextMessages: ChatMessage[]
): Promise<void> => {
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
    console.log("Stored response in Firestore");
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
