"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Label } from "../../components/ui/label"
import { X } from "lucide-react"
import { Switch } from "../../components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../components/ui/select"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { useContext, useEffect, useState } from "react"
import CreatePipeFormContext from "../../context/CreatePipeFormContext"
import WellContext from "../../context/WellContext"
const latitudeSchema = z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return arg ? parseFloat(arg) : undefined;
    } else {
      return arg;
    }
  }, z.number());
  const longitudeSchema = z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return arg ? parseFloat(arg) : undefined;
    } else {
      return arg;
    }
  }, z.number());

  const formSchema1 = z.object({
    latitude:z.string({
        required_error: 'latitude is required',
    }),
    longitude:z.string({
        required_error: 'longitude is required',
    })
})
const formSchema = z.object({
    latitude:z.string({
      
    }).optional(),
    longitude:z.string({
      
    }).optional(),
    centre:z.string({
      required_error: 'centre is required',
    }),
    region:z.string({
      required_error: 'region is required',
    }),
    wilaya:z.string({
      required_error: 'wilaya is required',
    }),
    zone:z.string({
        required_error: 'zone is required',
    }),
    gas:z.string({
        required_error: 'gas is required',
    }),
    oil:z.string({
        required_error: 'oil is required',
    }),
    go:z.string({
        required_error: 'go is required',
    }),

  })
const WellForm=()=> {
    const {
        marker,
        setMarker,
        activeCoordinates,
        setActiveCoordinates,
        formData,
        setFormData,
        ischecked,
        setChecked } = useContext(WellContext);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            longitude:'',
            latitude:'',
        }
      })
     
      // 2. Define a submit handler.
      function onSubmit(values) {
        console.log('vvvvvvvv',values)
        const latitude = ischecked ? marker?.lat : values.latitude;
        const longitude = ischecked ? marker?.lng : values.longitude;
        const centre =values.centre
        const region =values.region
        const wilaya =values.wilaya
        const zone =values.zone
        const gas=values.gas
        const oil=values.oil
        const go=values.go
        const updatedData = {
            ...formData,
            latitude: latitude,
            longitude: longitude,
            centre:centre,
            region:region,
            wilaya:wilaya,
            zone:zone,
            gas:gas,
            oil:oil,
            go:go,
          };
        setFormData(updatedData)
      }
      
      useEffect(() => {
        console.log('formsataaaaaaaaa',formData);
      }, [formData]);
      const handleCheck =()=>{
        console.log('check');

        setChecked((prev)=>!prev)
        setMarker(null);
      }
  return (
    <div className="mx-10 my-6"> 
    <h1 className="text-black text-3xl font-bold">Ajouter un puit</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
      <h1 className="text-black text-2xl font-bold mt-6">coordonées geograpique</h1>
            <div className="flex items-center gap-10 ">
                <h1 className="text-black text-xl font-medium" >marquer le puit sur le map</h1>
                <Switch isChecked={ischecked} onCheckedChange={handleCheck}/>
            </div>
            <div className="flex gap-2 items-center mb-2 mt-2 gap-4">
                <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-1/2">
                        <div className="flex items-center gap-5 w-full">
                            <FormLabel className="text-lg">latitude</FormLabel>
                            <FormControl>
                                <Input readOnly={ischecked} placeholder={ischecked ? 'Latitude (read-only)' : 'Latitude'} 
                                {...field} className="w-full" 
                                type="number"
                                value={ischecked ?  marker?.lat  : field.value }
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-1/2">
                        <div className="flex items-center gap-5 w-full">
                            <FormLabel className="text-lg">longitude</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder={ischecked ? 'longitude (read-only)' : 'longitude'}
                                type="number"
                                readOnly={ischecked} {...field} className="w-full" 
                                value={ischecked ?  marker?.lng  : field.value }
                                />
                            </FormControl>
                        </div>
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
                                <div className="flex items-center gap-5 w-full">
                                    <FormLabel className="text-lg">centre</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} >
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
                        name="region"
                        render={({ field }) => (
                            <FormItem className=" flex items-start w-1/2 ">
                                <div className="flex items-center gap-5 w-full">
                                    <FormLabel className="text-lg">region</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} >
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
            <div className="flex items-center gap-2">
                 <FormField
                control={form.control}
                        name="zone"
                        render={({ field }) => (
                            <FormItem className=" flex items-start w-1/2 ">
                                <div className="flex items-center gap-5 w-full">
                                    <FormLabel className="text-lg">zone</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} >
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
                <FormField
                control={form.control}
                        name="wilaya"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start w-1/2">
                                <div className="flex items-center gap-5 w-full">
                                    <FormLabel className="text-lg">Wilaya</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} >
                                            <SelectTrigger className="w-full">
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
            </div>
            <h1 className="text-black text-2xl font-bold">Production</h1>
            <div className="flex flex-wrap gap-4 items-center mb-2 mt-2 ">
                <FormField
                control={form.control}
                name="gas"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start ">
                        <div className="flex items-center gap-5 w-full">
                            <FormLabel className="text-lg">gas</FormLabel>
                            <FormControl>
                                <Input 
                                 type="number"
                                 placeholder={"gas"} 
                                {...field} className="w-full" 
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="oil"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                        <div className="flex items-center gap-5 w-full">
                            <FormLabel className="text-lg">oil</FormLabel>
                            <FormControl>
                                <Input 
                                 type="number"
                                placeholder={'oil'}
                                {...field} className="w-full" 
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="go"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                        <div className="flex items-center gap-5 w-full">
                            <FormLabel className="text-lg">G/O</FormLabel>
                            <FormControl>
                                <Input 
                                type="number"
                                placeholder={'oil'}
                                {...field} className="w-full" 
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="flex justify-end mt-4"> 
                <Button variant="outline" className="">annuler</Button>
                <Button variant="default" className="" type="submit">continue</Button>
            </div> 
        </form>
    </Form>
    </div>
  )
}
export default WellForm