import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = "md",
}) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg border shadow-sm",
        {
          "hover:shadow-md cursor-pointer": hover,
          "transition-shadow duration-200": hover,
          "p-0": padding === "none",
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
        },
        className
      )}
    >
      {children}
    </div>
  );
};
