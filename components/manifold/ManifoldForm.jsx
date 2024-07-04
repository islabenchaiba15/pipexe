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
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  centre: z.string().min(1, { message: "Centre is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  wilaya: z.string().optional(),
  zone: z.string().min(1, { message: "Zone is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  date: z.date({ message: "Name is required" }),
  file: z.instanceof(FileList).optional(),
  planFile: z.instanceof(FileList).optional(),
  n_elelements: z.string().min(1, { message: "Latitude is required" }),
  n_transverselle: z.string().min(1, { message: "Latitude is required" }),
  n_depart: z.string().min(1, { message: "Latitude is required" }),
  niance: z.string({ message: "Latitude is required" }),
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
      wilaya: "ouargla",
      zone: "",
      name: "",
      date: "",
      file: "",
      n_elelements: "",
      n_transverselle: "",
      n_depart: "",
      niance: "",
      planFile: "",
    },
  });
  const showSuccessToast = () => {
    toast({
      title: "manifold Created Successfully",
      description:
        "The manifold has been created and is now registered in the system.",
      action: <ToastAction altText="Try again">Continue</ToastAction>,
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
    const wilaya = "ouargla";
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
      planFile: planFile,
    };
    setFormData(updatedData);
    try {
      const { data } = await axiosInstance.post(
        "/manifold/create-manifold",
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
  const zones = [
    { label: "E2A", value: "E2A" },
    { label: "E2P", value: "E2P" },
  ];

  const regions = [{ label: "HMD", value: "HMD" }];

  const centres = [
    { label: "Nord", value: "Nord" },
    { label: "Sud", value: "Sud" },
  ];

  const handleCheck = () => {
    console.log("check");

    setChecked((prev) => !prev);
    setMarker(null);
  };
  return (
    <div className="mx-10 my-6">
      <h1 className="text-black text-3xl font-bold">Add a manifold</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 "
        >
          <h1 className="text-black text-2xl font-bold mt-6">
            Geographic coordinates
          </h1>
          <div className="flex items-center gap-10 ">
            <h1 className="text-black text-xl font-medium">
              Mark the manifold on the map
            </h1>
            <Switch isChecked={ischecked} onCheckedChange={handleCheck} />
          </div>
          <div className="flex items-center mb-2 mt-2 gap-4">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">Latitude</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">Longitude</FormLabel>
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
                  <FormLabel className="text-md font-bold">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name of manifold"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold ">
                    Date of drill
                  </FormLabel>
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

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h1 className="text-black text-2xl font-bold">Address</h1>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="centre"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">Centre</FormLabel>
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
                            ? centres.find(
                                (centre) => centre.value === field.value
                              )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No centre found.</CommandEmpty>
                        <CommandGroup>
                          {centres.map((centre) => (
                            <CommandItem
                              value={centre.label}
                              key={centre.value}
                              onSelect={() => {
                                form.setValue("centre", centre.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  centre.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {centre.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">Region</FormLabel>
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
                            ? regions.find(
                                (region) => region.value === field.value
                              )?.label
                            : "Select region"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No region found.</CommandEmpty>
                        <CommandGroup>
                          {regions.map((region) => (
                            <CommandItem
                              value={region.label}
                              key={region.value}
                              onSelect={() => {
                                form.setValue("region", region.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  region.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {region.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

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
                  <FormLabel className="text-md font-bold">Zone</FormLabel>
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
                            ? zones.find((zone) => zone.value === field.value)
                                ?.label
                            : "Select zone"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No zone found.</CommandEmpty>
                        <CommandGroup>
                          {zones.map((zone) => (
                            <CommandItem
                              value={zone.label}
                              key={zone.value}
                              onSelect={() => {
                                form.setValue("zone", zone.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  zone.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {zone.label}
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
                  <FormLabel className="text-md font-bold">
                    N°elements
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"N°element"}
                      {...field}
                      className="w-full"
                      type="number"
                    />
                  </FormControl>

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
                    N°transversals
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"N°transverselle"}
                      type="number"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>

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

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="niance"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2 ">
                  <FormLabel className="text-md font-bold">Niance</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} className="">
                      <SelectTrigger>
                        <SelectValue placeholder="type of pipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fue">Fue</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h1 className="text-black text-2xl font-bold">Files</h1>
          <div className="flex items-center mb-2 mt-2 gap-4">
            <FormField
              control={form.control}
              name="planFile"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">Plan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Plan"}
                      onChange={(event) => {
                        field.onChange(event.target?.files?.[0] ?? undefined);
                      }}
                      className="w-full"
                      {...fileRefe}
                      type="file"
                    />
                  </FormControl>

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
                    Technical file
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

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="outline" className="">
              Cancel
            </Button>
            <Button variant="default" className="" type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ManifoldForm;
