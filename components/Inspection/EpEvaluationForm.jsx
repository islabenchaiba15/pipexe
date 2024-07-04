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
import { axiosInstance } from "@/Api/Index";
import { useAuth } from "@/context/AuthContext";

const formSchema = z
  .object({
    message: z
      .string()
      .min(10, {
        message: "message must be at least 10 characters.",
      })
      .max(160, {
        message: "message must not be longer than 30 characters.",
      })
      .optional(),
    evaluation: z
      .string({
        message: "evaluation must be at least 2 characters.",
      })
      .min(1, {
        message: "evaluation is required",
      }),
    evaluation_file: z.any().optional(),
  })
  .refine(
    (data) => {
      if (data.evaluation === "passer") {
        return data.evaluation_file && data.evaluation_file.length > 0;
      }
      return true;
    },
    {
      message:
        "Evaluation file is required when passing to construction department",
      path: ["evaluation_file"],
    }
  );
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
export function EpEvaluationForm({ inspectionID }) {
  const [formData, setFormData] = useState({});
  const { user } = useAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      evaluation: "",
      evaluation_file: "",
    },
  });
  const fileRefe = form.register("evaluation_file");
  const watchResult = form.watch("evaluation");
  const [errors, setErrors] = useState({});

  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("evaluation", values.evaluation);
    formData.append("pv_evaluation", values.evaluation_file[0] || undefined);
    formData.append("InspectionID", inspectionID);
    formData.append("user", user._id);
    try {
      const { data } = await axiosInstance.post("/evaluation/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Change to application/json
        },
      });
      console.log("receeeeeeeeeeeive", data);
      form.reset(form.defaultValues);
    } catch (error) {
      if (error.response) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: error.response.data.message,
        }));
        console.log("Error Response:ssssssssssssss", errors);
      } else if (error.request) {
        console.log("Error Request:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        console.log("Error", error.message);
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
        <FormField
          control={form.control}
          name="evaluation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-bold">
                Result of evaluation
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="what is the result of evaluation " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="passer">
                    Proceed to technical department
                  </SelectItem>
                  <SelectItem value="close">Close inspection</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {watchResult && (
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-bold">
                  {watchResult === "close" ? "Note" : "Message"}
                </FormLabel>
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
        )}
        {watchResult === "passer" && (
          <FormField
            control={form.control}
            name="evaluation_file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-bold">
                  Evaluation report file
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    type="file"
                    onChange={(event) => {
                      field.onChange(event.target?.files?.[0]);
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
        )}
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
