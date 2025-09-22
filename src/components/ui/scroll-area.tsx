import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root> & { scrollTo?: number },
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & { scrollTo?: number }
>(({ className, children, scrollTo, ...props }, ref) => {
  const scrollArea = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollArea.current && scrollTo) {
      scrollArea.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  }, [scrollTo])

  return <ScrollAreaPrimitive.Root type="always"
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
        <div className="w-full mt-1"></div>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] snap-y snap-mandatory " ref={scrollArea} >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <div className="w-full mt-1"></div>
    <ScrollBar orientation={"vertical"}  />
    <ScrollBar orientation={"horizontal"} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
})
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
      "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
      "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border bg-stone-300" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
