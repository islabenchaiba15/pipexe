"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "../../components/ui/switch";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
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
    required_error: "A type is required.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  oil: z.string().min(1, { message: "Oil is required" }),
  gas: z.string().min(1, { message: "Gas is required" }),
  go: z.string().min(1, { message: "G/O is required" }),
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
      title: "Manifold Created Successfully",
      description:
        "The manifold has been created and is now registered in the system.",
      action: <ToastAction altText="Try again">Continue</ToastAction>,
    });
  };

  const showfailedToast = () => {
    toast({
      variant: "destructive",
      title: "Failed to create manifold",
      description: "Failed to create manifold, please try again",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  };

  const { toast } = useToast();

  const onSubmit = async (values) => {
    console.log("Form Values", values);
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

    console.log("Updated Form Data", updatedData);
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
      console.log("Received Data", data);
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

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const handleCheck = () => {
    console.log("Toggle Check");
    setChecked((prev) => !prev);
    setMarker(null);
  };

  return (
    <div className="px-8 py-6 bg-white rounded-lg">
      <div className="flex items-center space-x-2">
        <Image
          src={"/pngarrow.png"}
          alt={"Add"}
          height={35}
          width={35}
          className="cursor-pointer"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Add New Well</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mt-8">
            Geographical Coordinates
          </h2>

          <div className="flex items-center gap-4 mb-4 ml-4">
            <label className="text-lg font-medium text-gray-700">
              Mark Well on Map
            </label>
            <Switch isChecked={ischecked} onCheckedChange={handleCheck} />
          </div>
          <div className="grid grid-cols-2 gap-4 ml-4">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Latitude
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly={ischecked}
                      placeholder={
                        ischecked ? "Latitude (read-only)" : "Latitude"
                      }
                      {...field}
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
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Longitude
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        ischecked ? "Longitude (read-only)" : "Longitude"
                      }
                      type="number"
                      readOnly={ischecked}
                      {...field}
                      value={ischecked ? marker?.lng : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 ml-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Type
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type of well" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Producer">Producer</SelectItem>
                        <SelectItem value="Gaslift">Gaslift</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mt-12">Address</h2>
          <div className="grid grid-cols-2 gap-4 ml-4">
            <FormField
              control={form.control}
              name="centre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Centre
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Centre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Region
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Region" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 ml-4">
            <FormField
              control={form.control}
              name="wilaya"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Wilaya
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Wilaya" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Zone
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Zone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mt-12">
            Production
          </h2>
          <div className="grid grid-cols-2 gap-4 ml-4">
            <FormField
              control={form.control}
              name="oil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Oil
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Oil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Gas
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Gas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="go"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    G/O
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="G/O" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
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
          <div className="flex justify-end space-x-4 ml-4">
            <Button
              type="button"
              onClick={() => form.reset()}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Well
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WellForm;
