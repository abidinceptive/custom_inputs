import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const CustomProgress = ({
  containerClassName,
  value,
  indicatorClassName,
}: {
  containerClassName: React.ElementRef<
    typeof ProgressPrimitive.Root
  >["className"];
  value: number;
  indicatorClassName: React.ElementRef<
    typeof ProgressPrimitive.Indicator
  >["className"];
}) => {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        containerClassName
      )}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};

CustomProgress.displayName = ProgressPrimitive.Root.displayName;

export { CustomProgress };
