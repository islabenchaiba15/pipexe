"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "../../components/ui/switch";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../../components/ui/input";
import { useContext, useEffect, useState } from "react";
import WellContext from "../../context/WellContext";
import fetchElevation from "@/lib/functions";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { axiosInstance } from "@/Api/Index";
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
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  centre: z.string().min(1, { message: "Centre is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  wilaya: z.string().min(1, { message: "Wilaya is required" }),
  zone: z.string().min(1, { message: "Zone is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string({
    required_error: "A date of birth is required.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  oil: z.string().min(1, { message: "Name is required" }),
  gas: z.string().min(1, { message: "Name is required" }),
  go: z.string().min(1, { message: "Name is required" }),
});
const WellForm = () => {
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
    resolver: zodResolver(formSchema1),
    defaultValues: {
      longitude: "",
      latitude: "",
      name: "",
      centre: "",
      region: "",
      wilaya: "ouargla",
      zone: "",
      gas: "",
      oil: "",
      go: "",
      type: "",
      date: "",
    },
  });
  const [errors, setErrors] = useState({});
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
  const { toast } = useToast();
  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    console.log("vvvvvvvv", values);
    const latitude = ischecked ? marker?.lat : values.latitude;
    const longitude = ischecked ? marker?.lng : values.longitude;
    const name = values.name;
    const type = values.type;
    const centre = values.centre;
    const region = values.region;
    const wilaya = values.wilaya;
    const zone = values.zone;
    const gas = values.gas;
    const oil = values.oil;
    const go = values.go;
    const date = values.date.toISOString();
    const elevation = await fetchElevation(latitude, longitude);
    const updatedData = {
      ...formData,
      latitude: latitude,
      longitude: longitude,
      name: name,
      type: type,
      centre: centre,
      region: region,
      wilaya: wilaya,
      zone: zone,
      gas: gas,
      oil: oil,
      go: go,
      date: date,
      elevation: elevation,
      attributes: [],
    };
    setFormData(updatedData);

    console.log("welllllllll form", updatedData);
    try {
      const { data } = await axiosInstance.post(
        "/well/create-well",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json", // Change to application/json
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

  useEffect(() => {
    console.log("formsataaaaaaaaa", formData);
  }, [formData]);
  const handleCheck = () => {
    console.log("check");

    setChecked((prev) => !prev);
    setMarker(null);
  };
  return (
    <div className="mx-10 my-6">
      <h1 className="text-black text-3xl font-bold">Ajouter un puit</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-1 "
          >
            <h1 className="text-black text-2xl font-bold mt-6">
              coordonées geograpique
            </h1>
            <div className="flex items-center gap-10 ">
              <h1 className="text-black text-xl font-medium my-4">
                marquer le puit sur le map
              </h1>
              <Switch isChecked={ischecked} onCheckedChange={handleCheck} />
            </div>
            <div className="flex items-center mb-2 mt-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start w-1/2">
                    <FormLabel className="text-md font-bold ">
                      latitude
                    </FormLabel>
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
                    <FormLabel className="text-md font-bold">
                      longitude
                    </FormLabel>
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
            <div className="flex items-center mb-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start w-1/2">
                    <FormLabel className="text-md font-bold">name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
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
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start w-1/2">
                    <FormLabel className="text-md font-bold">type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="">
                          <SelectValue placeholder="the type of well" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Productor">Productor</SelectItem>
                          <SelectItem value="Gaslift">GazLift</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center mb-2 gap-4">
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
                              <span>date of drill</span>
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

            <h1 className="text-black text-2xl font-bold my-3">addresse</h1>
            <div className="flex items-center gap-2 ">
              <FormField
                control={form.control}
                name="centre"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start w-1/2">
                    <FormLabel className="text-md font-bold">centre</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="">
                          <SelectValue placeholder="enterer nom de centre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nord">Nord</SelectItem>
                          <SelectItem value="sud">sud</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem className=" flex flex-col items-start w-1/2 ">
                    <FormLabel className="text-md font-bold">region</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="">
                          <SelectValue placeholder="enterer nom de region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HMD">HMD</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-2 my-2">
              <FormField
                control={form.control}
                name="zone"
                render={({ field }) => (
                  <FormItem className=" flex flex-col items-start w-1/2 ">
                    <FormLabel className="text-md font-bold">zone</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="">
                          <SelectValue placeholder="enterer nom de zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="E2A">E2A</SelectItem>
                          <SelectItem value="E3A">E3A</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>
            <h1 className="text-black text-2xl font-bold my-2">Production</h1>
            <div className="flex items-center gap-2 my-2 ">
              <FormField
                control={form.control}
                name="gas"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start w-1/2">
                    <FormLabel className="text-md font-bold">gas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={"gas"}
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
                name="oil"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start w-1/2">
                    <FormLabel className="text-md font-bold">oil</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={"oil"}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-2 ">
              <FormField
                control={form.control}
                name="go"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start w-1/2">
                    <FormLabel className="text-md font-bold">G/O</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={"oil"}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    
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
export default WellForm;
