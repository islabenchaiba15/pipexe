"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-10 ">
        <div className="flex justify-between items-center my-4 ">
            <h1 className="font-bold text-2xl text-black ">
                information personnel
            </h1>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded-xl">
                Sauvegarder
            </button>
        </div>
        <div className="flex flex-row gap-10">
            <div className="flex flex-col w-1/2  lg:w-1/3 gap-8">
                <FormField
                className=""
                control={form.control}
                name="Nom"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-bold text-gray-500 text-xl">Nom</FormLabel>
                    <FormControl>
                        <Input placeholder="Anes " {...field} className="account-form_input no-focus" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="Email adresse"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-bold text-gray-500 text-xl">Addresse Email</FormLabel>
                    <FormControl>
                        <Input placeholder="ma.saadi@esi-sba.dz" {...field} className="account-form_input no-focus" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="Position"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-bold text-gray-500 text-xl">Position</FormLabel>
                    <FormControl>
                        <Input placeholder="Ingenieur" {...field} className="account-form_input no-focus" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="flex flex-col w-1/2  lg:w-1/3 gap-8">
                <FormField
                    className=""
                    control={form.control}
                    name="Prenom"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold text-gray-500 text-xl">Prenom</FormLabel>
                        <FormControl>
                            <Input placeholder="mohammed anes " {...field} className="account-form_input no-focus" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    className=""
                    control={form.control}
                    name="Nom"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold text-gray-500 text-xl " >Departement</FormLabel>
                        <FormControl>
                            <Input placeholder="Informatique " {...field} className="placeholder-blue-400 account-form_input no-focus" style={{ placeholderColor: 'blue' }}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />    
            </div>
        </div>
        
      </form>
    </Form>
  )
}
