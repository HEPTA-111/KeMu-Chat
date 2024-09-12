import { Timestamp } from "firebase/firestore";
import { ChatResponse } from "ollama/browser";

interface KemuChatResponse extends Omit<ChatResponse, "created_at"> {
  userId: string;
  prompt_eval_tks: number;
  response_eval_tks: number;
  created_at: Timestamp;
}

// Utility function to convert Timestamp to Date
function convertTimestampToDate(timestamp: Timestamp): Date {
  return timestamp.toDate();
}

// Use this function when you need to access created_at as a Date
function getKemuChatResponseWithDateCreatedAt(
  response: KemuChatResponse
): ChatResponse {
  return {
    ...response,
    created_at: convertTimestampToDate(response.created_at),
  };
}

export default KemuChatResponse;
export { getKemuChatResponseWithDateCreatedAt };
