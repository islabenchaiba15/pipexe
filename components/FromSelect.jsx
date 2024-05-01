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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function FromSelect() {
  const [open, setOpen] = React.useState(false)
  const [selectedValues, setSelectedValues] = React.useState([])

  const toggleValue = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value))
    } else {
      setSelectedValues([...selectedValues, value])
    }
  }

  return (
    <div className="">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            
                {selectedValues.length < 0
                    ? ''
                    : "Select framework..."}
            
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
            {frameworks.map((framework) => (
                <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => toggleValue(framework.value)}
                >
                    <Check
                    className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(framework.value) ? "opacity-100" : "opacity-0"
                    )}
                    />
                    {framework.label}
                </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="p-2 flex flex-wrap w-[200px]">
        {selectedValues.length > 0
              ? selectedValues.map((value) => (
                  <div key={value} className="flex items-center mr-1 p-2 rounded-2xl bg-gray-200 my-1">
                    <span>{frameworks.find((f) => f.value === value).label}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleValue(value)
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
  )
}