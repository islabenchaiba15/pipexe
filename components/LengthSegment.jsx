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

  const formSchema = z.object({
    length: z.array(lengthSchema).optional()
  });

export function LengthSegment({ onNext, onPrev,formData ,totalDistance}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'length',
  });

  const onSubmit = (data) => {
    onNext(data);
    console.log(data);
  };

  const handleAddInput = () => {
    append(0);
  };

  const calculateTotalLength = () => {
    const lengthValues = form.getValues('length');
    const totalLength = lengthValues.reduce((sum, value) => sum + parseFloat(value || 0), 0);
    const remainingDistance = totalDistance - totalLength;
    return remainingDistance;
  }
  return (
    <Draggable className="z-50">
      <div className="z-50 fixed flex items-center justify-center mr-[50%] ">
        <div className="bg-white rounded shadow-xl p-6 w-[450px]">
          <p className="font-bold text-black text-xl mb-3">Nouvelle Segment</p>
          <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mb-4 flex flex-col items-center gap-5">
                      <div className="flex flex-col items-start">
                        {fields.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center gap-12 my-2"
                          >
                            <h1>{index + 1}</h1>
                            <Input
                              
                              {...form.register(`length.${index}`)}
                              className="w-[180px]"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button
                        type="button"
                        variant="default"
                        onClick={handleAddInput}
                        className="w-full"
                      >
                        Add Input
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    il vous reste {calculateTotalLength()} m
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button variant="outline" onClick={onPrev}>
                annuler
              </Button>
              <Button variant="default" type="submit">
                continue
              </Button>
            </div>
            </form>
          </Form>
        </div>
      </div>
    </Draggable>
  );
}