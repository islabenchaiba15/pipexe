"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"
  import { Label } from "../components/ui/label"
  import {FromSelect} from "../components/FromSelect"
import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import Draggable from "react-draggable"
import { useContext } from "react"
import CreatePipeFormContext from "../context/CreatePipeFormContext"

const formSchema = z.object({
  largeur:z.string({
    required_error: 'largeur is required',
  }),
  type:z.string({
    required_error: 'Type is required',
  }),
  nature:z.string({
    required_error: 'nature is required',
  }),
  from:z.string({
    required_error: 'from is required',
  }),
  to:z.string({
    required_error: 'to is required',
  }),

})

export function NewLine({onNext,totalDistance}) {
    const {formData}=useContext(CreatePipeFormContext)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: formData
      })
     
      // 2. Define a submit handler.
      function onSubmit(values) {

        onNext(values);
        console.log(values)
      }

  return (
    <Draggable className="z-50">
        <div className="z-50 fixed flex items-center justify-center mr-[50%] "> 
            <div className="bg-white rounded shadow-xl p-6">
                <p className='font-bold text-black text-xl mb-3'>Nouvelle ligne </p>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
                        <div className="mb-4 flex items-center gap-5"> 
                            <Label htmlFor="longeur" className="text-lg">Longeur</Label>
                            <h3 className='text-semibold text-xl'>{totalDistance}</h3>
                        </div> 
                        <FormField
                        control={form.control}
                        name="largeur"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                                <div className="flex items-center gap-5">
                                    <FormLabel className="text-lg">largeur</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} type="number"/>
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                                <div className="flex items-center gap-5">
                                    <FormLabel className="text-lg">type</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} >
                                        <SelectTrigger className="w-[180px]">
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
                                <div className="flex items-center gap-5">
                                    <FormLabel className="text-lg">Nature</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} >
                                            <SelectTrigger className="w-[180px]">
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
                                <div className="flex items-center gap-5">
                                    <FormLabel className="text-lg">from</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} >
                                            <SelectTrigger className="w-[180px]">
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
                        {/* <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className=" flex flex-col items-start mt-4">
                                <div className="flex items-center gap-5">
                                    <FormLabel className="text-lg">from</FormLabel>
                                    <FormControl>
                                            <FromSelect/>
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                        /> */}

                        <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem className="mb-4 flex items-start ">
                                <div className="flex items-center gap-5">
                                    <FormLabel className="text-lg">to</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} >
                                            <SelectTrigger className="w-[180px]">
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
                        <div className="flex justify-end mt-4"> 
                            <Button variant="outline" className="">annuler</Button>
                            <Button variant="default" className="" type="submit">continue</Button>
                        </div> 
                    </form>
                </Form>
            </div>
        </div>
    </Draggable>
  )
}
