"use client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Input } from "../components/ui/input";
import Draggable from "react-draggable";
import { useContext } from "react";
import CreatePipeFormContext from "../context/CreatePipeFormContext";

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
      largeur: "",
      type: "",
      nature: "",
      from: "",
      to: "",
      date: "",
    },
  });

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
            <h3 className="text-semibold text-xl">{totalDistance}</h3>
          </div>
          <div className="flex items-center mb-1  gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold ">name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" type="text" />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="largeur"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-1/2">
                  <FormLabel className="text-md font-bold">largeur</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="w-full" />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Your date of birth is used to calculate your age.
                  </FormDescription>
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
                  <FormLabel className="text-md font-bold">nature</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="the nature" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="type1">nature</SelectItem>
                        <SelectItem value="type2">nature2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Your date of birth is used to calculate your age.
                  </FormDescription>
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
                        <SelectValue placeholder="the type " />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="type1">type1</SelectItem>
                        <SelectItem value="type2">type2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Your date of birth is used to calculate your age.
                  </FormDescription>
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
                  <FormLabel className="text-md font-bold">from</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="the start of pipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="from1">from</SelectItem>
                        <SelectItem value="from2">from2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center w-1/2 gap-0">
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start ">
                      <FormLabel className="text-md font-bold">to</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          className="w-full"
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="the end of pipe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="to">to</SelectItem>
                            <SelectItem value="to2">to2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-2/3">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start ">
                      <FormLabel className="text-md font-bold">to</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          className="w-full"
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="the end of pipe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="to">to</SelectItem>
                            <SelectItem value="to2">to2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center mb-1 gap-4">
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

          {/* 
          <FormField
            control={form.control}
            name="largeur"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start ">
                <div className="flex items-center gap-5 w-full">
                  <FormLabel className="text-lg font-bold ">largeur</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      type="number"
                      className="w-full "
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <div className="flex items-center gap-10 w-full">
                  <FormLabel className="text-lg font-bold">type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} className="">
                      <SelectTrigger className="">
                        <SelectValue placeholder="type of pipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gaz">gaz</SelectItem>
                        <SelectItem value="petrol">petrol</SelectItem>
                        <SelectItem value="eau">eau</SelectItem>
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
              <FormItem className="flex flex-col items-start ">
                <div className="flex items-center gap-5 w-full">
                  <FormLabel className="text-lg font-bold">Nature</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="nature of pipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collecteur">collecteur</SelectItem>
                        <SelectItem value="collect">collect</SelectItem>
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
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start ">
                <div className="flex items-center gap-10 w-full">
                  <FormLabel className="text-lg font-bold">from</FormLabel>
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
              <FormItem className="mb-4 flex items-start ">
                <div className="flex items-center gap-14 w-full">
                  <FormLabel className="text-lg font-bold">to</FormLabel>
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
          /> */}
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="">
              annuler
            </Button>
            <Button
              variant="default"
              className=""
              type="submit"
              disabled={totalDistance <= 0}
            >
              continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
