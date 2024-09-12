import { Settings } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";

import useLocalStorage from "@/app/hooks/useLocalStorage";

interface FormValues {
  name: string;
  link: string;
}

const TopBarSettings = () => {
  const [serverSettings, setServerSettings] = useLocalStorage<FormValues>(
    "serverSettings",
    {
      name: "Localhost",
      link: "http://localhost:11434",
    }
  );

  const { register, handleSubmit, setValue } = useForm<FormValues>();

  useEffect(() => {
    setValue("name", serverSettings.name);
    setValue("link", serverSettings.link);
  }, [serverSettings, setValue]);

  const OnSubmit: SubmitHandler<FormValues> = async (data) => {
    setServerSettings(data);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="mr-6">
            <Settings className=" h-6 w-6 md:h-8 md:w-8" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(OnSubmit)}>
            <DialogHeader>
              <DialogTitle>Chat Server</DialogTitle>
              <DialogDescription>
                Make changes to your Server. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" {...register("name")} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Link
                </Label>
                <Input id="link" {...register("link")} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopBarSettings;
