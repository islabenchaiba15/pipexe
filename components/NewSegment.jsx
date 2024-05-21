"use client"
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Button } from "../components/ui/button"
const lengthSchema = z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return arg ? parseFloat(arg) : undefined;
    } else {
      return arg;
    }
  }, z.number().optional());

  const yearSchema = z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return arg ? parseInt(arg) : undefined;
    } else {
      return arg;
    }
  }, z.number().optional());

  const thiknessSchema = z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return arg ? parseInt(arg) : undefined;
    } else {
      return arg;
    }
  }, z.number().optional());

const formSchema = z.object({
    
    length: z.array(lengthSchema).optional(),
    thikness: z.array(thiknessSchema).optional(),
    year: z.array(yearSchema).optional(),
  });

export function NewSegment({ onSubmitForm, onPrev,totalDistance }) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: [],
      thinkness:[],
      year: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'length',
  });

  const { fields: yearFields, append: yearAppend, remove: yearRemove } = useFieldArray({
    control: form.control,
    name: 'year',
  });

  const { fields: thiknessFields, append: thiknessAppend, remove: thiknessRemove } = useFieldArray({
    control: form.control,
    name: 'thikness',
  });

  const [remainingDistance, setRemainingDistance] = useState(totalDistance);

  const onSubmit = (data) => {
    onSubmitForm(data);
    console.log(data);
    // console.log('leeeeeeeeeeeeeeeength',form.getValues('length'))
  };
  const calculateTotalLength = () => {
    const lengthValues = form.getValues('length');
    const totalLength = lengthValues.reduce((sum, value) => sum + parseFloat(value || 0), 0);
    const remainingDistance = totalDistance - totalLength;
    return remainingDistance;
  };


  const handleAddInput = () => {
    append(0);
    yearAppend(0);
    thiknessAppend(0)
    
  };

  return (
        <div className="bg-white p-6 2xl:mx-6 mx-2">
          <div className='flex justify-between items-center gap-24'>
            <p className="font-bold text-lg ml-6">length</p>
            <p className="font-bold text-lg mr-10">thikness</p>
            <p className="font-bold text-lg ">annéé d'installation</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {fields.map((item, index) => (
                <div key={item.id} className="flex gap-4 items-center">
                    <h1>{index + 1}</h1>
                    <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input
                            {...form.register(`length.${index}`)}
                            className=""
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="thikness"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input
                            type="number"
                            {...form.register(`thikness.${index}`)}
                            className=""
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input
                             {...form.register(`year.${index}`)}
                            type="number"
                            className=""
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                        remove(index);
                        yearRemove(index);
                        thiknessRemove(index)
                    }}
                    >
                    Remove
                    </Button>
                </div>
                ))}
               <Button
                type="button"
                variant="default"
                onClick={handleAddInput}
                className="w-full"
                >
                Add Input
                </Button>
                <div className="mb-4 flex items-center gap-5">
                    <h3 className="text-semibold text-xl">il vous reste {calculateTotalLength()}  m</h3>
                    </div>
                    <div className="flex justify-end">
                    <Button variant="outline" onClick={onPrev}>
                        annuler
                    </Button>
                    <Button variant="default" type="submit" disabled={calculateTotalLength() > 0 || calculateTotalLength() < 0 }>
                        continue
                    </Button>
                </div>
            </form>
          </Form>
        </div>
  );
}