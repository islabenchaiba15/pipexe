'use client'
import Image from 'next/image'
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
})
 
function page() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          password:""
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <section className=' bg-black flex flex-col sm:flex-row h-full ' >
      <div className=" sm:w-1/2 flex flex-col justify-center items-center gap-10 sm:mt-1 mt-14 ">
      <Image src={"/pipexe1.png"} height={80} width={150} className='m-3'/>
       <Form {...form} className=''>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='max-w-80'> 
                  <FormLabel className='text-white font-bold'>email</FormLabel>
                  <FormControl>
                    <Input placeholder="anes@esi-sba.dz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className='max-w-80 mt-4 mb-2'>
                  <FormLabel className='text-white font-bold'>mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className='text-white text-right '><a className='underline'>oublier le mot de passe ?</a></p>
            <Button type="submit" className='w-80 my-6 bg-blue-900'>Se connecter</Button>
          </form>
        </Form>
      </div>
      <div className="sm:w-1/2 flex flex-col items-end ">
        <video className="w-full rounded-lg"  autoPlay muted loop>
          <source src="/square.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

    </section>
  )
}

export default page