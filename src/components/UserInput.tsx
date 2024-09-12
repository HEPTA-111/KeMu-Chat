"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormValues {
  message: string;
}

interface Response {
  response: string;
  created_at: string;
  done: boolean;
}

const UserInput = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [response, setResponse] = useState<Response | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma:2b",
          prompt: data.message,
          stream: false,
          keep_alive: -1,
        }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok " + res.statusText);
      }

      const result: Response = await res.json();
      setResponse(result);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          {...register("message")}
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-bold">Response:</h3>
          <pre>{response.response}</pre>
        </div>
      )}
    </>
  );
};

export default UserInput;
