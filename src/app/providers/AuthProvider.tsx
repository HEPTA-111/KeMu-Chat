"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebase";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import KemuUserRole from "@/app/interfaces/KemuUserRoles";
import KemuUser from "../interfaces/KemuUser";
import { BallTriangle } from "react-loader-spinner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  userRole: KemuUserRole | null;
  kemuUser: KemuUser | null;
  userInitials: string | null;
  signInUser: (email: string, password: string) => Promise<User | null>;
  signOutUser: () => Promise<Boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<KemuUserRole | null>(null);
  const [kemuUser, setKemuUser] = useState<KemuUser | null>(null);
  const [userInitials, setUserInitials] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [signInWithEmailAndPassword, firebaseUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  const getUserRole = useCallback(
    async (userId: string): Promise<KemuUserRole | null> => {
      const userRoleDocRef = doc(db, "kemuUserRoles", userId);
      const userRoleSnapshot = await getDoc(userRoleDocRef);
      if (userRoleSnapshot.exists()) {
        return userRoleSnapshot.data() as KemuUserRole;
      }
      return null;
    },
    []
  );

  const getKemuUser = useCallback(
    async (userId: string): Promise<KemuUser | null> => {
      const kemuUserDocRef = doc(db, "kemuChatUsers", userId);
      const kemuUserSnapshot = await getDoc(kemuUserDocRef);
      if (kemuUserSnapshot.exists()) {
        const kemuUser = kemuUserSnapshot.data() as KemuUser;
        setUserInitials(
          `${kemuUser?.firstName?.charAt(0)}${kemuUser?.lastName?.charAt(0)}`
        );
        return kemuUser;
      }
      return null;
    },
    []
  );

  const handleUserAuthentication = useCallback(
    async (user: User) => {
      setIsAuthenticated(true);
      setUser(user);
      const fetchedUserRole = await getUserRole(user.uid);
      setUserRole(fetchedUserRole);
      const fetchedKemuUser = await getKemuUser(user.uid);
      setKemuUser(fetchedKemuUser);
    },
    [getUserRole, getKemuUser]
  );

  const signInUser = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(email, password);
    if (userCredential) {
      await handleUserAuthentication(userCredential.user);
      return userCredential.user;
    }
    return null;
  };

  const signOutUser = async (): Promise<boolean> => {
    const success = await signOut();
    if (success) {
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
      setKemuUser(null);
    }
    return success;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsAuthLoading(true);
      if (user) {
        await handleUserAuthentication(user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setUserRole(null);
        setKemuUser(null);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, [handleUserAuthentication]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isAuthLoading,
    userRole,
    kemuUser,
    signInUser,
    signOutUser,
    userInitials,
  };

  if (isAuthLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <BallTriangle color="black" height="120" width="120" />
        <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
          Loading your content...
        </p>
        <p className="mt-2 text-sm text-gray-500 animate-pulse delay-75">
          This may take a few moments
        </p>
      </div>
    ); // Or your custom loading component
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
