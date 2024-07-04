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
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "@/Api/Index";
import DataContext from "@/context/DataContext";
import DataContextProvider from "@/context/DataContextProvider";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  file: z.instanceof(FileList, {
    message: "Please select a file for upload",
  }),
  date: z.date({ message: "date is required" }),
  observation: z.string().max(160, {
    message: "message must not be longer than 30 characters.",
  }),
});

export function InspectionPeriodicFile() {
  const {user}= useAuth()
  if(!user) return null;
  const [formData, setFormData] = useState({});
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: "",
      date: "",
    },
  });
  const fileRefe = form.register("file");
  const [errors, setErrors] = useState({});

  const onSubmit = async (values) => {
    const data = {
      file: values.file[0],
      date: values.date,
      observation: values.observation,
      user: user._id,
    };
    setFormData(data);
    console.log("submitted data", data);
    try {
      const { data } = await axiosInstance.post(
        "/inspection/periodic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Change to application/json
          },
        }
      );
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
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-md font-bold ">Date</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="text-xs">
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="observation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">PV file</FormLabel>
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
