import { Timestamp } from "firebase/firestore";

export default interface KemuLoginLog {
  userId: string;
  email: string;
  last_login: Timestamp;
  firstName: string;
  lastName: string;
  userRole: string;
}
