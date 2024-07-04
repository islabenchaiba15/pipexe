"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../components/ui/label";
import { X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useContext, useEffect, useState } from "react";
import CreatePipeFormContext from "../context/CreatePipeFormContext";
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
    required_error: "Latitude is required",
  }),
  longitude: z.string({
    required_error: "Longitude is required",
  }),
});
const formSchema = z.object({
  largeur: z.string({
    required_error: "Diameter is required",
  }),
  type: z.string({
    required_error: "Type is required",
  }),
  nature: z.string({
    required_error: "Nature is required",
  }),
  from: z.string({
    required_error: "From is required",
  }),
  to: z.string({
    required_error: "To is required",
  }),
  episseur_nom: z.string({
    required_error: "Ep_nom is required",
  }),
  episseur_min: z.string({
    required_error: "Ep_min is required",
  }),
});
const PipeForm = () => {
  const { formData, setFormData } = useContext(CreatePipeFormContext);
  const [coordinates, setCoordinates] = useState([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    setFormData((prevData) => ({ ...prevData, coordinates: coordinates }));
    setFormData((prevData) => ({ ...prevData, ...values }));
    // console.log(formData,'iiiiioooooooooo')
    // onNext(formData)
  }

  const form1 = useForm({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      longitude: "",
      latitude: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit1(values) {
    console.log(values);

    const { latitude, longitude } = values;
    const newCoordinates = [...coordinates, [latitude, longitude]];
    setCoordinates(newCoordinates);
  }
  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  useEffect(() => {
    console.log("formsataaaaaaaaa", formData);
  }, [formData]);

  const handleRemoveCoordinate = (index) => {
    const newCoordinates = coordinates.filter((_, i) => i !== index);
    setCoordinates(newCoordinates);
  };
  return (
    <div className="mx-10 my-6">
      <h1 className="text-black text-2xl font-bold">Add a pipe manually</h1>
      <Form {...form1}>
        <form
          onSubmit={form1.handleSubmit(onSubmit1)}
          className="flex gap-2 items-center mb-10 mt-5"
        >
          <FormField
            control={form1.control}
            name="latitude"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <div className="flex items-center gap-5 w-full">
                  <FormLabel className="text-lg">Latitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="latitude"
                      {...field}
                      className="w-full"
                      type="number"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form1.control}
            name="longitude"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <div className="flex items-center gap-5 w-full">
                  <FormLabel className="text-lg">Longitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="longitude"
                      {...field}
                      className="w-full"
                      type="number"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="">
            <Button variant="default" className="" type="submit">
              Add
            </Button>
          </div>
        </form>
      </Form>
      <div className="bg-gray-300 w-full min-h-[120px] my-5 rounded-2xl">
        <div className="p-2 flex flex-wrap w-fit ">
          {coordinates.length > 0
            ? coordinates.map((coords, index) => (
                <div
                  key={index}
                  className="flex items-center mr-1 p-2 rounded-2xl bg-gray-200 my-1"
                >
                  <span>
                    {coords[0]}, {coords[1]}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCoordinate(index);
                    }}
                    className="ml-1"
                  >
                    <X className="h-3 w-3 text-black hover:text-black cursor-pointer" />
                  </button>
                </div>
              ))
            : ""}
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 "
        >
          <div className=" flex items-center gap-5 mt-4">
            <Label htmlFor="longeur" className="text-lg font-bold">
              Longeur
            </Label>
            <h3 className="text-semibold text-xl">{}</h3>
          </div>
          <FormField
            control={form.control}
            name="largeur"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-1/2">
                <div className="flex items-center gap-5 w-full">
                  <FormLabel className="text-lg">Diameter</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      className="w-full"
                      type="number"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2 ">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg">Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} className="">
                        <SelectTrigger>
                          <SelectValue placeholder="type of pipe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gaz">Gas</SelectItem>
                          <SelectItem value="petrol">Oil</SelectItem>
                          <SelectItem value="eau">Water</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nature"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg">Nature</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="nature of pipe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="collecteur">Collector</SelectItem>
                          <SelectItem value="collect">Collect</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg">From</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="">
                          <SelectValue placeholder="the start of pipe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="md1">md1</SelectItem>
                          <SelectItem value="md2">md2</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem className=" flex items-start w-1/2 ">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg">To</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="">
                          <SelectValue placeholder="end of pipe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mn1">mn1</SelectItem>
                          <SelectItem value="mn2">mn2</SelectItem>
                          <SelectItem value="mn3">mn3</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="episseur_nom"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg">Ep Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        {...field}
                        className="w-full"
                        type="number"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="episseur_min"
              render={({ field }) => (
                <FormItem className=" flex flex-col items-start w-1/2">
                  <div className="flex items-center gap-5 w-full">
                    <FormLabel className="text-lg w-fit ">Ep Min</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        {...field}
                        className="w-full"
                        type="number"
                      />
                    </FormControl>
                  </div>
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
export default PipeForm;
