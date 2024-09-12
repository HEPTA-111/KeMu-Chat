import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { getConversations, Conversation } from "@/firebase/client/chatAction";

const ConversationList = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getConversations(user.uid, 10) // Get the 10 most recent conversations
        .then((fetchedConversations) => {
          setConversations(fetchedConversations);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching conversations:", err);
          setError("Failed to load conversations");
          setIsLoading(false);
        });
    }
  }, [user]);

  if (isLoading) return <div>Loading conversations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {conversations.map((conversation) => (
        <li key={conversation.conversationId}>
          <a href={`/chat/${conversation.conversationId}`}>
            {conversation.chatTitle} -{" "}
            {conversation.created_at.toDate().toLocaleString()}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ConversationList;
