export default interface KemuUserRole {
  userRole: "staff" | "student" | "admin" | "blocked";
  id?: string;
}
