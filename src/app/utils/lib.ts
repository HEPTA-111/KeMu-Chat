import { Ollama } from "ollama/browser";
import { z } from "zod";

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMilliseconds: number = now.getTime() - date.getTime();
  const diffInSeconds: number = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes: number = Math.floor(diffInSeconds / 60);
  const diffInHours: number = Math.floor(diffInMinutes / 60);
  const diffInDays: number = Math.floor(diffInHours / 24);
  const diffInMonths: number = Math.floor(diffInDays / 30);
  const diffInYears: number = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }
}

interface SummaryResponse {
  summary: string;
}

const SummarySchema = z.object({
  summary: z.string(),
});

export const getConversationSummary = async (
  initialPrompt: string
): Promise<string> => {
  const ollama = new Ollama({ host: process.env.NEXT_PUBLIC_OLLAMA_URL });
  const response = await ollama.generate({
    model: "gemma:2b",
    stream: false,
    format: "json",
    options: {
      temperature: 0,
    },
    system:
      "Summarize the User prompt in 3 words. Output nothing else. No introductions or explanations. Do not answer the User prompt, just summarize it. Give me the response in JSON in this formart. {'summary':'summary'}. The summary should not exceed three (3) words\n",
    prompt: `User prompt: ${initialPrompt}`,
  });

  const parsedResponse = SummarySchema.safeParse(response.response);
  if (parsedResponse.success) {
    const summary = parsedResponse.data.summary;
    return summary;
  }

  // get the first 3 words of initalPrompt
  const summary = initialPrompt.split(" ").slice(0, 3).join(" ");
  return summary;
};
