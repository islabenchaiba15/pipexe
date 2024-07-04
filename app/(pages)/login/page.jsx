"use client";
import Image from "next/image";
import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { axiosInstance } from "@/Api/Index";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
});

function page() {
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    console.log(values);
    setErrors({});
    try {
      const { data } = await axiosInstance.post("/auth/users/signin", values);
      console.log("daaaaaaaata", data);
      form.reset();
      router.push("http://localhost:3000");
    } catch (error) {
      if (error.response) {
        const { error: errorCode, message } = error.response.data;
        switch (errorCode) {
          case "email_not_found":
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: message,
            }));
            break;
          case "invalid_password":
            setErrors((prevErrors) => ({
              ...prevErrors,
              password: message,
            }));
            break;
          default:
            setErrors((prevErrors) => ({
              ...prevErrors,
              error: message,
            }));
            break;
        }
        console.log("Error Response:", error.response.data);
      } else if (error.request) {
        console.log("Error Request:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        console.log("Error", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  return (
    <section className=" bg-black flex flex-col sm:flex-row h-full ">
      <div className=" sm:w-1/2 flex flex-col justify-center items-center gap-10 sm:mt-1 mt-14 ">
        <Image src={"/pipexe1.png"} height={160} width={300} className="m-3" />
        <h1 className="text-red-500">{errors.error}</h1>
        <Form {...form} className="">
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="max-w-80">
                  <FormLabel className="text-white font-bold">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="anes@esi-sba.dz" {...field} />
                  </FormControl>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold ">Password</FormLabel>
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
                  <FormMessage>
                    {errors.password && (
                      <span className="text-red-500">{errors.password}</span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <p className="text-white text-right ">
              <a className="underline">Forgot the password ?</a>
            </p>
            <Button type="submit" className="w-80 my-6 bg-blue-900">
              Log in
            </Button>
          </form>
        </Form>
      </div>
      <div className="sm:w-1/2 flex flex-col items-end ">
        <video className="w-full rounded-lg" autoPlay muted loop>
          <source src="/square.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}

export default page;
