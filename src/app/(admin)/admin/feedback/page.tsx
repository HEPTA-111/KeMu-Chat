"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import React, { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import KemuFeedback from "@/app/interfaces/KemuFeedback";
import { Badge } from "@/components/ui/badge";
import { getRelativeTime } from "@/app/utils/lib";

const FeedBackPage = () => {
  // Fetch Login Logs
  const feedbackCollectionRef = collection(db, "kemuFeedback");
  const feedbackQuery = query(
    feedbackCollectionRef,
    orderBy("created_at", "desc"),
    limit(20)
  );
  const [feedbackSnapshot, loadingFeedback, errorFeedback] =
    useCollection(feedbackQuery);

  const allFeedback = useMemo(() => {
    return (
      feedbackSnapshot?.docs.map((doc) => ({
        ...(doc.data() as KemuFeedback),
        id: doc.id,
      })) ?? []
    );
  }, [feedbackSnapshot]);

  return (
    <div className="w-full mx-auto p-4 lg:px-8 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 xl:gap-12 xl:grid-cols-3">
        {allFeedback.map((feedback) => (
          <FeedBackCard key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default FeedBackPage;

const FeedBackCard = ({ feedback }: { feedback: KemuFeedback }) => {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>
          {feedback.firstName} {feedback.lastName}
        </CardTitle>
        <CardDescription>
          {feedback?.userRole.charAt(0).toUpperCase()}
          {feedback?.userRole.slice(1)}
        </CardDescription>
        <CardDescription>{feedback.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{feedback.feedback}</p>
      </CardContent>
      <CardFooter className=" flex justify-center">
        <Badge variant="outline">
          {getRelativeTime(feedback.created_at.toDate())}
        </Badge>
      </CardFooter>
    </Card>
  );
};

// function getRelativeTime(date: Date): string {
//   const now = new Date();
//   const diffInMilliseconds: number = now.getTime() - date.getTime();
//   const diffInSeconds: number = Math.floor(diffInMilliseconds / 1000);
//   const diffInMinutes: number = Math.floor(diffInSeconds / 60);
//   const diffInHours: number = Math.floor(diffInMinutes / 60);
//   const diffInDays: number = Math.floor(diffInHours / 24);
//   const diffInMonths: number = Math.floor(diffInDays / 30);
//   const diffInYears: number = Math.floor(diffInDays / 365);

//   if (diffInSeconds < 60) {
//     return "just now";
//   } else if (diffInMinutes < 60) {
//     return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
//   } else if (diffInHours < 24) {
//     return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
//   } else if (diffInDays < 30) {
//     return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
//   } else if (diffInMonths < 12) {
//     return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
//   } else {
//     return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
//   }
// }
