import React, { useState, useEffect, useMemo } from "react";
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import KemuChatResponse from "../interfaces/KemuChatResponse";

export interface DailyUserCount {
  [day: string]: number;
}

export function useWeeklyUserActivity(db: Firestore) {
  const [userActivity, setUserActivity] = useState<DailyUserCount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUserActivity() {
      try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const chatResponsesRef = collection(db, "kemuChatResponses");
        const weekQuery = query(
          chatResponsesRef,
          where("created_at", ">=", Timestamp.fromDate(oneWeekAgo))
        );

        const querySnapshot = await getDocs(weekQuery);

        const usersByDay: { [day: string]: Set<string> } = {
          Sunday: new Set(),
          Monday: new Set(),
          Tuesday: new Set(),
          Wednesday: new Set(),
          Thursday: new Set(),
          Friday: new Set(),
          Saturday: new Set(),
        };

        querySnapshot.forEach((doc) => {
          const response = doc.data() as KemuChatResponse;
          const date = response.created_at.toDate();
          const dayOfWeek = date.toLocaleDateString("en-US", {
            weekday: "long",
          });
          usersByDay[dayOfWeek].add(response.userId);
        });

        const result: DailyUserCount = {};
        for (const [day, users] of Object.entries(usersByDay)) {
          result[day] = users.size;
        }

        setUserActivity(result);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setLoading(false);
      }
    }

    fetchUserActivity();
  }, [db]);

  const memoizedUserActivity = useMemo(() => userActivity, [userActivity]);

  return { userActivity: memoizedUserActivity, loading, error };
}
