import React from "react";
import clsx from "clsx";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void; //// 基本的な関数の型定義 voidは何も返さない
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  type = "button",
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2",
        {
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
            variant === "primary",
          "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500":
            variant === "secondary",
          "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500":
            variant === "outline",
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2.5 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
          "opacity-50 cursor-not-allowed": disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};
