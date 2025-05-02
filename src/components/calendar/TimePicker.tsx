
import React from "react";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
  disabled?: boolean;
}

export function TimePickerDemo({ value, onChange, className, disabled }: TimePickerProps) {
  // Helper function to validate time input
  const validateTimeInput = (input: string): boolean => {
    // Regex pattern for HH:MM format (24-hour)
    const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timePattern.test(input);
  };

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    // Always update the input value for better UX
    onChange(newValue);
    
    // Validate the format when we have enough characters
    if (newValue.length === 5 && !validateTimeInput(newValue)) {
      console.warn('Invalid time format. Please use HH:MM (24-hour format)');
    }
  };

  return (
    <div className="relative">
      <Input 
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="HH:MM"
        className={cn(
          "pl-8 w-full",
          className
        )}
        disabled={disabled}
        maxLength={5}
      />
      <Clock className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
