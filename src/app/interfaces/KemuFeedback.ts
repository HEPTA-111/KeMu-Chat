import { Timestamp } from "firebase/firestore";

export default interface KemuFeedback {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  userRole: string;
  feedback: string;
  created_at: Timestamp;
}
