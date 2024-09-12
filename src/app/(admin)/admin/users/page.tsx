"use client";

import KemuUser from "@/app/interfaces/KemuUser";
import KemuUserRole from "@/app/interfaces/KemuUserRoles";
import { useAuth } from "@/app/providers/AuthProvider";
import AppUserTable from "@/components/custom/AppUserTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/firebase/firebase";
import { collection, doc, query, updateDoc } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

const UsersViewPage = () => {
  const { user } = useAuth();

  const userId = user?.uid;
  const userDocRef = userId ? doc(db, "kemuChatUsers", userId) : null;
  const [userData, loadingDoc, errorDoc] = useDocumentData(userDocRef);
  const KemuUserData = userData as KemuUser;

  const usersCollectionRef = collection(db, "kemuChatUsers");
  const usersQuery = query(usersCollectionRef);

  // const [users, loadingUsers, errorUsers] = useCollectionData(usersQuery);
  const [users, loadingUsers, errorUsers] = useCollectionData(usersQuery, {
    snapshotOptions: { serverTimestamps: "estimate" },
  });

  const allUsers = users as KemuUser[];

  // Fetch all user roles
  const userRolesCollectionRef = collection(db, "kemuUserRoles");
  const userRolesQuery = query(userRolesCollectionRef);

  const [snapshot, loadingUserRoles, errorUserRoles] =
    useCollection(userRolesQuery);

  const allUserRoles: KemuUserRole[] =
    snapshot?.docs.map((doc) => ({
      ...(doc.data() as KemuUserRole),
      id: doc.id,
    })) ?? [];

  // Block a User
  const handleUserBlock = async (user: KemuUser) => {
    const userRole = allUserRoles.find(
      (role) => role.id === user.uid
    )?.userRole;
    // const userRoleRef = doc(db, "kemuUserRoles", user.uid);

    try {
      const userRoleRef = doc(db, "kemuUserRoles", user.uid);
      await updateDoc(userRoleRef, {
        userRole: "blocked",
      });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <ScrollArea className="w-full mx-auto px-4 lg:px-8 max-h-screen">
      {loadingUsers && <p>Loading users...</p>}
      {errorUsers && <p>Error: {errorUsers.message}</p>}
      {users && (
        <AppUserTable
          KemuUsers={allUsers}
          userBlock={handleUserBlock}
          KemuUserRoles={allUserRoles}
        />
      )}
    </ScrollArea>
  );
};

export default UsersViewPage;
