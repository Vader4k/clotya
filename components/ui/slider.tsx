"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function Slider({
    className,
    defaultValue,
    value,
    onValueChange,
    ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            onValueChange={onValueChange}
            className={cn(
                "relative flex w-full touch-none items-center select-none data-disabled:opacity-50",
                className
            )}
            {...props}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className="bg-neutral-200 relative h-1 w-full grow overflow-hidden rounded-full dark:bg-neutral-800"
            >
                <SliderPrimitive.Range
                    data-slot="slider-range"
                    className="absolute h-full bg-red-500"
                />
            </SliderPrimitive.Track>
            {(value || defaultValue || [0]).map((_, index) => (
                <SliderPrimitive.Thumb
                    key={index}
                    data-slot="slider-thumb"
                    className="border-red-500 bg-white focus-visible:ring-ring/50 block size-4 cursor-grab active:cursor-grabbing rounded-full border-2 shadow-md transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none hover:scale-110 active:scale-95"
                />
            ))}
        </SliderPrimitive.Root>
    )
}

export { Slider }
