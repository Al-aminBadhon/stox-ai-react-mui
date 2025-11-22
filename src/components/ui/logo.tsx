import { TrendingUp } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({
  className = "",
  showText = true,
  size = "md",
}: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="p-2 bg-gradient-primary rounded-xl shadow-financial">
        <TrendingUp size={iconSizes[size]} className="text-white" />
      </div>
      {showText && (
        <span className={`font-bold text-foreground ${sizeClasses[size]}`}>
          StoX AI
        </span>
      )}
    </div>
  );
};
