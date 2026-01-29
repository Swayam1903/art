import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Standard button implementation without generic Slot for now to avoid unused var issues 
// given I am not using the Radix Slot pattern fully here.

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm",
                destructive:
                    "bg-red-500 text-white hover:bg-red-500/90 shadow-sm",
                outline:
                    "border border-input bg-background hover:bg-zinc-50 hover:text-accent-dark transition-colors",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-zinc-100 hover:text-accent-dark",
                link: "text-accent underline-offset-4 hover:underline",
                poly: "bg-accent text-accent-foreground rounded-none px-6 py-3 hover:bg-accent-dark transition-all duration-300 shadow-md uppercase tracking-wider font-medium text-xs",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        // Note: asChild is in props but not used in implementation if we just render <button>.
        // To suppress lint, we can read it or remove it from destructured if not used.
        // Or we can just use _asChild.

        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
