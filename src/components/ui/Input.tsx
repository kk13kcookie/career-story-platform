import React from "react";
import clsx from "clsx";

interface InputProps {
  type?: "text" | "email" | "password" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  disabled = false,
  icon,
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          "w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200",
          {
            "pl-10": icon,
            "pl-4": !icon,
            "py-3": true,
            "pr-4": true,
            "opacity-50 cursor-not-allowed": disabled,
            "hover:border-gray-400": !disabled,
          },
          className
        )}
      />
    </div>
  );
};
