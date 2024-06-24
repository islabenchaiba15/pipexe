"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  message: z
    .string()
    .min(10, {
      message: "message must be at least 10 characters.",
    })
    .max(160, {
      message: "message must not be longer than 30 characters.",
    }),
  pv_file: z.instanceof(FileList, {
    message: "Please select a file for upload",
  }),
});
const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];
export function ConstructionRaportForm() {
  const [formData, setFormData] = useState({});
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      rapport_file: "",
    },
  });
  const fileRefe = form.register("rapport_file");
  // 2. Define a submit handler.
  function onSubmit(values) {
    const data = {
      message: values.message,
      report_file: values.rapport_file[0],
    };
    setFormData(data);
    console.log("submitted data", data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-bold">message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can manage email addresses in your
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rapport_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-bold">construction final report file</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  type="file"
                  onChange={(event) => {
                    field.onChange(event.target?.files?.[0] ?? undefined);
                  }}
                  {...fileRefe}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
