import { cn } from "@/utils/cn";
import { RotateCw } from "lucide-react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "link"
    | "danger"
    | "danger-outline";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
}

const buttonVariants = {
  primary:
    "bg-teal-700 text-white border-teal-700 hover:bg-teal-600 hover:text-white focus:ring focus:ring-teal-400 focus:ring-opacity-50 active:bg-teal-700 active:border-teal-700 dark:focus:ring-teal-400 dark:focus:ring-opacity-90",
  secondary:
    "bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-50 hover:text-teal-800 focus:ring focus:ring-teal-400 focus:ring-opacity-50 active:bg-teal-200 active:border-teal-200 dark:focus:ring-teal-400 dark:focus:ring-opacity-90",
  outline:
    "bg-transparent text-teal-700 border-teal-700 hover:bg-teal-50 hover:text-teal-800 focus:ring focus:ring-teal-400 focus:ring-opacity-50 active:bg-teal-100 active:border-teal-100 dark:focus:ring-teal-400 dark:focus:ring-opacity-90",

  link: "bg-transparent text-teal-700 hover:text-teal-800 focus:ring focus:ring-teal-400 focus:ring-opacity-50 active:text-teal-700 dark:focus:ring-teal-400 dark:focus:ring-opacity-90",
  danger:
    "bg-red-600 text-white border-red-600 hover:bg-red-500 hover:text-white focus:ring focus:ring-red-400 focus:ring-opacity-50 active:bg-red-600 active:border-red-600 dark:focus:ring-red-400 dark:focus:ring-opacity-90",
  "danger-outline":
    "bg-transparent text-red-600 border-red-600 hover:bg-red-50 hover:text-red-800 focus:ring focus:ring-red-400 focus:ring-opacity-50 active:bg-red-100 active:border-red-100 dark:focus:ring-red-400 dark:focus:ring-opacity-90",
};

const buttonSizes = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
  xl: "px-6 py-4 text-lg",
  icon: "p-2 w-10 h-10",
};

export default function GenericButton({
  className,
  children,
  isLoading,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: IButtonProps) {
  return (
    <>
      <button
        disabled={isLoading || props.disabled}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-semibold leading-5 border cursor-pointer transition-all",
          buttonVariants[variant],
          buttonSizes[size],
          className,
        )}
        {...props}
      >
        {isLoading && <RotateCw className="animate-spin" />}
        {children}
      </button>
    </>
  );
}
