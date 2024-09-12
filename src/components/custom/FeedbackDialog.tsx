import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import { useAuth } from "@/app/providers/AuthProvider";
import { db } from "@/firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import { Sub } from "@radix-ui/react-dropdown-menu";

interface FormValues {
  feedback: string;
}

export function FeedbackDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { kemuUser, userRole } = useAuth();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      if (kemuUser && userRole) {
        const feedbackDocRef = collection(db, "kemuFeedback");
        await addDoc(feedbackDocRef, {
          userId: kemuUser.uid,
          email: kemuUser.email,
          firstName: kemuUser.firstName,
          lastName: kemuUser.lastName,
          userRole: userRole?.userRole,
          feedback: data.feedback,
          created_at: serverTimestamp(),
        });
      }
      toast({
        title: "Thank you for your feedback!",
        description: "We will get back to you soon!",
        duration: 2500,
      });
      setIsOpen(false);
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>Feedback</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
            <DialogDescription>
              Your input is important to us. Let us know what we can do better.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            {...register("feedback", { required: "Feedback is required" })}
            placeholder="Write your feedback here..."
            id="feedback"
          />
          {errors.feedback && (
            <p className="text-red-500">{errors.feedback.message}</p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSubmit(onSubmit)}>
                {isLoading ? (
                  <>
                    <span className="mr-4">
                      <ThreeDots
                        visible={true}
                        height="40"
                        width="40"
                        color="white"
                      />
                    </span>
                    Submitting
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
