"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { ToastAction } from "../ui/toast";
import { axiosInstance } from "@/Api/Index";

const FormSchema = z.object({
  nom: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  prenom: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("This is not a valid email.").trim().toLowerCase(),
  position: z.string({
    required_error: "Please select a language.",
  }),
  departement: z.string({
    required_error: "Please select a language.",
  }),
  password: z
    .string()
    .min(5, "Password must be at least 8 characters long")
    .max(30, "Password must not exceed 100 characters"),
  role: z.string({
    required_error: "Please select a language.",
  }),
});
const AddUserForm = ({ onClose, closeButton }) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      position: "",
      departement: "",
      role: "",
    },
  });

  const [errors, setErrors] = useState({});
  const showSuccessToast = () => {
    toast({
      title: "User Created Successfully",
      description:
        "The user has been created and is now registered in the system.",
      action: <ToastAction altText="Try again">continue</ToastAction>,
    });
  };
  const showfailedToast = () => {
    toast({
      variant: "destructive",
      title: "User already exist ",
      description:
        "the email you give is already used in the system",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  };
  const { toast } = useToast();

  const onSubmit = async (dataa) => {
    console.log("Form Data:", dataa);
    try {
      const { data } = await axiosInstance.post("/auth/users/signup", dataa);
      console.log("islaaaaaaaaaaam", data);
      showSuccessToast(); // S
      form.reset();
    } catch (error) {
      if (error.response) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: error.response.data.message,
        }));
        showfailedToast()
        console.log("Error Response:ssssssssssssss", errors);
      } else if (error.request) {
        console.log("Error Request:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        console.log("Error lassssssst", error.message);
        alert(`Error lssssssssssssst: ${error.message}`);
      }
    } finally {
      onClose(); // Close the modal after form submission
    }
  };
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
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col gap-8 "
      >
        <div className="flex gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold ">nom</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold ">email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage>
                    {errors.email && (
                      <span className="text-red-500">{errors.email}</span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="font-bold ">position</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ingenieur">ingenieur</SelectItem>
                        <SelectItem value="technicien">technicien</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="font-bold ">role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="ep">E&P manager</SelectItem>
                        <SelectItem value="Inspection">Inspection manager</SelectItem>
                        <SelectItem value="construction">construction manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold ">prenom</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold ">password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <RemoveRedEyeIcon className="w-5 h-5" />
                        ) : (
                          <VisibilityOffIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departement"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="font-bold ">departement</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="departement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inspection">
                        inspection
                        </SelectItem>
                        <SelectItem value="construction">
                        construction
                        </SelectItem>
                        <SelectItem value="ep">
                        ep
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-16">
          {closeButton}
          <Button type="submit" className="w-fit variant">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddUserForm;
