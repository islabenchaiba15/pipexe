"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../../components/ui/label";
import { X } from "lucide-react";
import { Switch } from "../../components/ui/switch";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import React,{ useContext, useEffect, useState } from "react";
import WellContext from "../../context/WellContext";
import { axiosInstance } from "@/Api/Index";
import fetchElevation from "@/lib/functions";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";


const latitudeSchema = z.preprocess((arg) => {
  if (typeof arg === "string") {
    return arg ? parseFloat(arg) : undefined;
  } else {
    return arg;
  }
}, z.number());
const longitudeSchema = z.preprocess((arg) => {
  if (typeof arg === "string") {
    return arg ? parseFloat(arg) : undefined;
  } else {
    return arg;
  }
}, z.number());

const formSchema1 = z.object({
  latitude: z.string({
    required_error: "latitude is required",
  }),
  longitude: z.string({
    required_error: "longitude is required",
  }),
});
const formSchema = z.object({
    latitude: z.string().min(1, { message: "Latitude is required" }),
    longitude: z.string().min(1, { message: "Longitude is required" }),
    centre: z.string().min(1, { message: "Centre is required" }),
    region: z.string().min(1, { message: "Region is required" }),
    wilaya: z.string().min(1, { message: "Wilaya is required" }),
    zone: z.string().min(1, { message: "Zone is required" }),
    name: z.string().min(1, { message: "Name is required" }),
});



const ManifoldForm = () => {
  const {
    marker,
    setMarker,
    activeCoordinates,
    setActiveCoordinates,
    formData,
    setFormData,
    ischecked,
    setChecked,
  } = useContext(WellContext);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longitude: "",
      latitude: "",
      centre: "",
      region: "",
      wilaya: "",
      zone: "",
      name: "",
    },
  });
  const showSuccessToast = () => {
    toast({
      title: "manifold Created Successfully",
      description:
        "The manifold has been created and is now registered in the system.",
      action: <ToastAction altText="Try again">continue</ToastAction>,
    });
  };
  const showfailedToast = () => {
    toast({
      variant: "destructive",
      title: "failed to create toast ",
      description:
        "failed to create toast,please try again",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  };
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    console.log("vvvvvvvv", values);
    const latitude = ischecked ? marker?.lat : values.latitude;
    const longitude = ischecked ? marker?.lng : values.longitude;
    const centre = values.centre;
    const region = values.region;
    const wilaya = values.wilaya;
    const zone = values.zone;
    const name = values.name;
    const elevation = await fetchElevation(latitude, longitude);
    const updatedData = {
      ...formData,
      latitude: latitude,
      longitude: longitude,
      name: name,
      centre: centre,
      region: region,
      wilaya: wilaya,
      zone: zone,
      elevation: elevation,
      attributes: [],
    };
    setFormData(updatedData);
    try {
      const { data } = await axiosInstance.post(
        "/manifold/create-manifold",
        updatedData
      );
      console.log('receeeeeeeeeeeive',data)
      showSuccessToast();
      form.reset(form.defaultValues);
      form.setValue('latitude', '');

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
          console.log("Error", error.message);
          alert(`Error: ${error.message}`);
        }
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
  const handleCheck = () => {
    console.log("check");

    setChecked((prev) => !prev);
    setMarker(null);
  };
  return (
    <div className="mx-10 my-6">
      <h1 className="text-black text-3xl font-bold">Ajouter un manifold</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 "
        >
          <h1 className="text-black text-2xl font-bold mt-6">
            coordonées geograpique
          </h1>
          <div className="flex items-center gap-10 ">
            <h1 className="text-black text-xl font-medium">
              marquer le manifold sur le map
            </h1>
            <Switch isChecked={ischecked} onCheckedChange={handleCheck} />
          </div>
          <div className="flex items-center mb-2 mt-2 gap-4">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg">latitude</FormLabel>
                    <FormControl>
                      <Input
                        readOnly={ischecked}
                        placeholder={
                          ischecked ? "Latitude (read-only)" : "Latitude"
                        }
                        {...field}
                        className="w-full"
                        type="number"
                        value={ischecked ? marker?.lat : field.value}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg">longitude</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          ischecked ? "longitude (read-only)" : "longitude"
                        }
                        type="number"
                        readOnly={ischecked}
                        {...field}
                        className="w-full"
                        value={ischecked ? marker?.lng : field.value}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-1/2">
                <div className="flex items-center gap-8 w-full">
                  <FormLabel className="text-lg">name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name of manifold"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <h1 className="text-black text-2xl font-bold">addresse</h1>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="centre"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg font-bold">centre</FormLabel>
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
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Select language"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("centre", language.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg font-bold">region</FormLabel>
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
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Select language"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("region", language.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg font-bold">zone</FormLabel>
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
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Select language"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("zone", language.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wilaya"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg font-bold">wilaya</FormLabel>
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
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Select language"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("wilaya", language.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <h1 className="text-black text-2xl font-bold">Production</h1>
            <div className="flex flex-wrap gap-4 items-center mb-2 mt-2 ">
                <FormField
                control={form.control}
                name="gas"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start ">
                        <div className="flex items-center gap-5 w-full">
                            <FormLabel className="text-lg">gas</FormLabel>
                            <FormControl>
                                <Input 
                                 type="number"
                                 placeholder={"gas"} 
                                {...field} className="w-full" 
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="oil"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                        <div className="flex items-center gap-5 w-full">
                            <FormLabel className="text-lg">oil</FormLabel>
                            <FormControl>
                                <Input 
                                 type="number"
                                placeholder={'oil'}
                                {...field} className="w-full" 
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="go"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                        <div className="flex items-center gap-5 w-full">
                            <FormLabel className="text-lg">G/O</FormLabel>
                            <FormControl>
                                <Input 
                                type="number"
                                placeholder={'oil'}
                                {...field} className="w-full" 
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </div> */}
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="">
              annuler
            </Button>
            <Button variant="default" className="" type="submit">
              continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ManifoldForm;
