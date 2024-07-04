"use client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { FromSelect } from "../components/FromSelect";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
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
import { Input } from "../components/ui/input";
import Draggable from "react-draggable";
import { useContext, useEffect, useState } from "react";
import CreatePipeFormContext from "../context/CreatePipeFormContext";
import { axiosInstance } from "@/Api/Index";
import DataContext from "@/context/DataContext";

const formSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  largeur: z.string().min(1, { message: "lareur is required" }),
  type: z.string().min(1, { message: "type is required" }),
  nature: z.string().min(1, { message: "nature is required" }),
  from: z.string().min(1, { message: "from is required" }),
  to: z.string().min(1, { message: "to is required" }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function NewLine({ onNext, totalDistance }) {
  const { formData } = useContext(CreatePipeFormContext);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      diametre: "",
      type: "",
      nature: "",
      from: "",
      to: "",
      connection: "",
      date: "",
    },
  });
  const { wells, setWells, manifolds, setManifolds, junctions, setJunctions } =
    useContext(DataContext);

  const [infrastructures, setInfrastructures] = useState([]);
  const [infrastructures2, setInfrastructures2] = useState([]);

  useEffect(() => {
    console.log("weeeeeells", wells);
    console.log("manifoldsssssss", manifolds);
    console.log("juuunctions", junctions);
    const merged = [...wells, ...manifolds];
    setInfrastructures(merged);
    const merg = [...junctions, ...manifolds];
    setInfrastructures2(merg);
  }, [wells, junctions, manifolds]);
  // 2. Define a submit handler.
  function onSubmit(values) {
    onNext(values);
    console.log(values);
  }

  return (
    <div className="bg-white p-6 2xl:mx-5 mx-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 justify-between border px-5 py-3 "
        >
          <div className=" flex items-center gap-5 mt-4">
            <Label htmlFor="longeur" className="text-lg font-bold">
              Longeur
            </Label>
            <h3 className="text-semibold text-xl">{totalDistance} m</h3>
          </div>
          <div className="flex items-center mb-1  gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold ">Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" type="text" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="largeur"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">Thikness</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="w-full" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center mb-1 gap-4">
            <FormField
              control={form.control}
              name="nature"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">Nature</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="choose nature" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gas">Gas</SelectItem>
                        <SelectItem value="oil">Oil</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <FormLabel className="text-md font-bold">Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="choose type " />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collect">Collect</SelectItem>
                        <SelectItem value="collector">Collector</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center mb-1 gap-4 ">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">Start </FormLabel>
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
                                  infrastructure.ID === field.value
                              )?.name
                            : "Select depart"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          <h1 className="font-bold text-md mx-8 my-1">Wells</h1>
                          {wells.map((well) => (
                            <CommandItem
                              value={well.name}
                              key={well.ID}
                              onSelect={() => {
                                form.setValue("from", well.ID);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  well.ID === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {well.name}
                            </CommandItem>
                          ))}
                          <h1 className="font-bold text-md mx-8 my-3">
                            Manifolds
                          </h1>
                          {manifolds.map((manifold) => (
                            <CommandItem
                              value={manifold.name}
                              key={manifold.ID}
                              onSelect={() => {
                                form.setValue("from", manifold.ID);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  manifold.ID === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {manifold.name}
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
              name="connection"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">
                    Connect to
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} className="w-full">
                      <SelectTrigger className="">
                        <SelectValue placeholder="the end of pipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pipe">Pipe</SelectItem>
                        <SelectItem value="manifold">Manifold</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center mb-1 gap-4 ">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">
                    Destination
                  </FormLabel>
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
                            ? infrastructures2.find(
                                (infrastructure2) =>
                                  infrastructure2.ID === field.value
                              )?.name
                            : "Select depart"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          <h1 className="font-bold text-md mx-8 my-1">
                            Junctions
                          </h1>
                          {junctions.map((junction) => (
                            <CommandItem
                              value={junction.name}
                              key={junction.ID}
                              onSelect={() => {
                                form.setValue("to", junction.ID);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  junction.ID === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {junction.name}
                            </CommandItem>
                          ))}
                          <h1 className="font-bold text-md mx-8 my-3">
                            Manifolds
                          </h1>
                          {manifolds.map((manifold) => (
                            <CommandItem
                              value={manifold.name}
                              key={manifold.ID}
                              onSelect={() => {
                                form.setValue("to", manifold.ID);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  manifold.ID === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {manifold.name}
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
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold ">
                    Creation date
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
          <div className="flex items-center mb-1 gap-4"></div>

          <div className="flex justify-end mt-4">
            <Button variant="outline" className="">
              Cancel
            </Button>
            <Button
              variant="default"
              className=""
              type="submit"
              disabled={totalDistance <= 0}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
