"use client";
import { useEffect, useMemo, useState } from "react";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import KemuChatResponse from "@/app/interfaces/KemuChatResponse";
import { AdminDashboard } from "@/components/custom/AdminDashboard";
import KemuUserRole from "@/app/interfaces/KemuUserRoles";
import KemuLoginLog from "@/app/interfaces/KemuLoginLog";
import { useWeeklyUserActivity } from "@/app/hooks/useWeeklyUserActivity";

const DashboardPage = () => {
  const chatResponseCollectionRef = collection(db, "kemuChatResponses");
  const chatResponseQuery = query(
    chatResponseCollectionRef,
    orderBy("created_at", "desc"),
    limit(10)
  );
  const [chatResponseSnapshot, loadingchatResponse, errorchatResponse] =
    useCollection(chatResponseQuery);
  const [trendPercentage, setTrendPercentage] = useState(0);

  const allChatResponses = useMemo(() => {
    return (
      chatResponseSnapshot?.docs.map((doc) => ({
        ...(doc.data() as KemuChatResponse),
        id: doc.id,
      })) ?? []
    );
  }, [chatResponseSnapshot]);

  useEffect(() => {
    if (allChatResponses.length < 2) {
      setTrendPercentage(0);
      return;
    }
    const responseChange =
      allChatResponses[0].response_eval_tks -
      allChatResponses[1].response_eval_tks;
    const percentageResponseChange =
      (responseChange / allChatResponses[1].response_eval_tks) * 100;

    setTrendPercentage(parseFloat(percentageResponseChange.toFixed(2)));
  }, [allChatResponses]);

  // Fetch all user roles
  const userRolesCollectionRef = collection(db, "kemuUserRoles");
  const userRolesQuery = query(userRolesCollectionRef);
  const [userSnapshot, loadingUserRoles, errorUserRoles] =
    useCollection(userRolesQuery);

  const allUserRoles = useMemo(() => {
    return (
      userSnapshot?.docs.map((doc) => ({
        ...(doc.data() as KemuUserRole),
        id: doc.id,
      })) ?? []
    );
  }, [userSnapshot]);

  const userRolesCount = useMemo(() => {
    const adminUsers = allUserRoles.filter(
      (role) => role.userRole === "admin"
    ).length;
    const staffUsers = allUserRoles.filter(
      (role) => role.userRole === "staff"
    ).length;
    const studentUsers = allUserRoles.filter(
      (role) => role.userRole === "student"
    ).length;
    const blockedUsers = allUserRoles.filter(
      (role) => role.userRole === "blocked"
    ).length;
    const totalUsers = allUserRoles.length - blockedUsers;

    return {
      totalUsers,
      adminUsers,
      staffUsers,
      studentUsers,
    };
  }, [allUserRoles]);

  // Fetch Login Logs
  const loginLogsCollectionRef = collection(db, "kemuLoginLogs");
  const loginLogsQuery = query(
    loginLogsCollectionRef,
    orderBy("last_login", "desc"),
    limit(9)
  );
  const [loginLogsSnapshot, loadingLoginLogs, errorLoginLogs] =
    useCollection(loginLogsQuery);

  const allLoginLogs = useMemo(() => {
    return (
      loginLogsSnapshot?.docs.map((doc) => ({
        ...(doc.data() as KemuLoginLog),
        id: doc.id,
      })) ?? []
    );
  }, [loginLogsSnapshot]);

  // Get Weekly User Activity

  const { userActivity, loading, error } = useWeeklyUserActivity(db);
  // console.log("userActivity", userActivity);

  // const weeklyUserActivity = useWeeklyUserActivity(db).then((activityData) => {
  //   return activityData;
  // });

  return (
    <div>
      <AdminDashboard
        allChatResponses={allChatResponses}
        trendPercentage={trendPercentage}
        userRolesCount={userRolesCount}
        allLoginLogs={allLoginLogs}
        userActivity={userActivity}
      />
    </div>
  );
};

export default DashboardPage;
