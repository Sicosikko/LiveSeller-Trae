
import React from "react";
import { CheckCircle, XCircle, Clock, Info } from "lucide-react";

interface StatusIndicatorProps {
  type: "sent" | "failed" | "pending" | "estimated";
  value: number;
  total: number;
  label: string;
  sublabel?: string | React.ReactNode;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  type, 
  value, 
  total, 
  label, 
  sublabel 
}) => {
  const getIconAndColor = () => {
    switch (type) {
      case "sent":
        return {
          icon: <CheckCircle className="h-6 w-6 text-whatsapp" />,
          bgColor: "bg-whatsapp bg-opacity-20"
        };
      case "failed":
        return {
          icon: <XCircle className="h-6 w-6 text-red-500" />,
          bgColor: "bg-red-500 bg-opacity-20"
        };
      case "pending":
        return {
          icon: <Clock className="h-6 w-6 text-amber-500" />,
          bgColor: "bg-amber-500 bg-opacity-20"
        };
      case "estimated":
        return {
          icon: <Info className="h-6 w-6 text-blue-500" />,
          bgColor: "bg-blue-500 bg-opacity-20"
        };
      default:
        return {
          icon: <Info className="h-6 w-6 text-blue-500" />,
          bgColor: "bg-blue-500 bg-opacity-20"
        };
    }
  };

  const { icon, bgColor } = getIconAndColor();
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className={`${bgColor} p-2 rounded-full`}>
        {icon}
      </div>
      <div>
        <p className="font-medium">{label}</p>
        {typeof sublabel === "string" ? (
          <p className="text-sm text-muted-foreground">{sublabel}</p>
        ) : (
          sublabel
        )}
      </div>
    </div>
  );
};

export default StatusIndicator;
