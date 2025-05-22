import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SVGProps } from "react";

interface SpinnerProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2 
      className={cn("h-4 w-4 animate-spin", className)} 
      {...props} 
    />
  );
} 