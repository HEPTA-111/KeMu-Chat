import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  onSubmitForm: (prompt: string) => void;
  disabled?: boolean;
}

interface FormValues {
  prompt: string;
}

const ChatInput = ({ disabled, onSubmitForm }: Props) => {
  const { handleSubmit, register, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmitForm(data.prompt);
    reset();
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
          {...register("prompt")}
          id="prompt"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          disabled={disabled}
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            type="submit"
            size="sm"
            className="ml-auto gap-1.5"
            disabled={disabled}
          >
            <SendHorizonal />
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChatInput;
