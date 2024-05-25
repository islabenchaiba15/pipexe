"use client"
import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"


export function FromSelect({filters,title,selectedValues,onSelect}) {
  const [open, setOpen] = React.useState(false)

  const toggleValue = (value) => {
    if (selectedValues.includes(value)) {
      onSelect(selectedValues.filter((v) => v !== value))
    } else {
      onSelect([...selectedValues, value])
    }
  }

  return (
    <div className="">
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild className="bg-gray-100">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[120px] md:w-[200px] justify-between"
          >
            
                {selectedValues.length < 0
                    ? ''
                    : title}
            
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[120px] md:w-[200px] p-0 ">
          <Command>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
            {filters.map((filter) => (
                <CommandItem
                    key={filter.value}
                    value={filter.value}
                    onSelect={() => toggleValue(filter.value)}
                >
                    <Check
                    className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(filter.value) ? "opacity-100" : "opacity-0"
                    )}
                    />
                    {filter.label}
                </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}