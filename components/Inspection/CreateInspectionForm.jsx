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
import { useContext, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "@/Api/Index";
import DataContext from "@/context/DataContext";
import DataContextProvider from "@/context/DataContextProvider";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  message: z
    .string()
    .min(10, {
      message: "message must be at least 10 characters.",
    })
    .max(160, {
      message: "message must not be longer than 30 characters.",
    }),
  ouvrage: z
    .string({
      message: "ouvrage must be at least 2 characters.",
    })
    .min(1, {
      message: "ouvrage is resqired",
    }),
  type: z.string({
    message: "type is required",
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

export function CreateInspectionForm({ wells, pipes, manifolds }) {
  const { user } = useAuth();
  const getInfrastructures = (type) => {
    switch (type) {
      case "Ids":
        return wells;
      case "manifold":
        return manifolds;
      case "pipeline":
        return pipes;
      default:
        return [];
    }
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      type: "",
      ouvrage: "",
      pv_file: "",
    },
  });
  const fileRefe = form.register("pv_file");
  const [errors, setErrors] = useState({});
  const watchType = form.watch("type");
  const infrastructures = useMemo(
    () => getInfrastructures(watchType),
    [watchType]
  );

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("message", values.message);
    formData.append("type", values.type);
    formData.append("ouvrage", values.ouvrage);
    formData.append("pv_file", values.pv_file[0]);
    formData.append("user", user._id);
    console.log("submitted data", formData);
    try {
      const { data } = await axiosInstance.post("/epnote/create", formData, {
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
          name="message"
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
        <div className="flex flex-row items-start gap-4 ">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-bold">
                  Type of inspection
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type of inspection " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manifold">Manifold</SelectItem>
                    <SelectItem value="Ids">IDS</SelectItem>
                    <SelectItem value="pipeline">Pipeline</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {watchType && (
            <FormField
              control={form.control}
              name="ouvrage"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">Equipment</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between mr-4",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? infrastructures.find(
                                (infrastructure) =>
                                  infrastructure._id === field.value
                              )?.name
                            : "Select infrastructure "}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>
                        <CommandInput placeholder="Search infrastructure..." />
                        <CommandEmpty>No infrastructure found.</CommandEmpty>
                        <CommandGroup>
                          {infrastructures.map((infrastructure) => (
                            <CommandItem
                              value={infrastructure.name}
                              key={infrastructure._id}
                              onSelect={() => {
                                form.setValue("ouvrage", infrastructure._id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  infrastructure._id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {infrastructure.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="">
                    Select the specific infrastructure for inspection.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        {watchType && (
          <FormField
            control={form.control}
            name="pv_file"
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
        )}
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
