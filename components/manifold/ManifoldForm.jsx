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
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
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
import React, { useContext, useEffect, useState } from "react";
import WellContext from "../../context/WellContext";
import { axiosInstance } from "@/Api/Index";
import fetchElevation from "@/lib/functions";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  date: z.date({ message: "Name is required" }),
  file: z.instanceof(FileList).optional(),
  planFile: z.instanceof(FileList).optional(),
  n_elelements: z.string().min(1, { message: "Latitude is required" }),
  n_transverselle: z.string().min(1, { message: "Latitude is required" }),
  n_depart: z.string().min(1, { message: "Latitude is required" }),
  niance: z.string({message: "Latitude is required"})

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
      date: "",
      file: "",
      n_elelements: "",
      n_transverselle: "",
      n_depart: "",
      niance: "",
      planFile:""
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
      description: "failed to create toast,please try again",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  };
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  const fileRef = form.register("file");
  
  const fileRefe = form.register("planFile");

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
    const date = values.date.toISOString();
    const n_elelements = values.n_elelements;
    const n_transverselle = values.n_transverselle;
    const n_depart = values.n_depart;
    const niance = values.niance;
    const file = values.file[0]; 
    const planFile = values.planFile[0]; // Access the first file in the FileList
    // Access the first file in the FileList
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
      date: date,
      file: file,

      n_elements: n_elelements,
      n_transverselle: n_transverselle,
      n_depart: n_depart,
      niance: niance,
      planFile:planFile
    };
    setFormData(updatedData);
    try {
      const { data } = await axiosInstance.post(
        "/manifold/create-manifold",
        updatedData,{
          headers: {
             'Content-Type': 'multipart/form-data',
           },
        }
      );
      console.log("receeeeeeeeeeeive", data);
      showSuccessToast();
      form.reset(form.defaultValues);
      form.setValue("latitude", "");
    } catch (error) {
      if (error.response) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: error.response.data.message,
        }));
        showfailedToast();
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
                  <FormLabel className="text-md font-bold">latitude</FormLabel>
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
                  <FormDescription className="text-xs">
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">longitude</FormLabel>
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
                  <FormDescription className="text-xs">
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
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name of manifold"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold ">date</FormLabel>
                  <Popover>
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
          </div>
          <h1 className="text-black text-2xl font-bold">addresse</h1>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="centre"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">centre</FormLabel>
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
                  <FormDescription className="text-xs">
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
                  <FormLabel className="text-md font-bold">region</FormLabel>
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
                  <FormDescription className="text-xs">
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
                  <FormLabel className="text-md font-bold">zone</FormLabel>
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
                  <FormDescription className="text-xs">
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
                  <FormLabel className="text-md font-bold">wilaya</FormLabel>
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
                  <FormDescription className="text-xs">
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h1 className="text-black text-2xl font-bold">Technique</h1>
          <div className="flex items-center mb-2 mt-2 gap-4">
            <FormField
              control={form.control}
              name="n_elelements"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">N°element</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"N°element"}
                      {...field}
                      className="w-full"
                      type="number"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="n_transverselle"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">
                    N°transverselle
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"N°transverselle"}
                      type="number"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center mb-2 mt-2 gap-4">
            <FormField
              control={form.control}
              name="n_depart"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">N° depart</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"N°depart"}
                      {...field}
                      className="w-full"
                      type="number"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="niance"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2 ">
                  <FormLabel className="text-lg">Niance</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} className="">
                      <SelectTrigger>
                        <SelectValue placeholder="type of pipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fue">fue</SelectItem>
                        <SelectItem value="silver">silver</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-xs">
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h1 className="text-black text-2xl font-bold">fichier</h1>
          <div className="flex items-center mb-2 mt-2 gap-4">
            <FormField
              control={form.control}
              name="planFile"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">
                    fiche technique
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"fiche technique"}
                      onChange={(event) => {
                        field.onChange(event.target?.files?.[0] ?? undefined);
                      }}
                      className="w-full"
                      {...fileRefe}
                      type="file"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">
                    fiche technique
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"fiche technique"}
                      onChange={(event) => {
                        field.onChange(event.target?.files?.[0] ?? undefined);
                      }}
                      className="w-full"
                      {...fileRef}
                      type="file"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
