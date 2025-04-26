
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface DataCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function DataCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: DataCardProps) {
  return (
    <Card className={cn("glass-panel bg-[#1B1B23] border-cafe-border", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-cafe-text-muted">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-7 w-7 rounded-md bg-cafe-accent/20 p-1.5 text-cafe-accent">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-xl md:text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "flex items-center text-xs",
                trend.isPositive
                  ? "text-cafe-success"
                  : "text-cafe-error"
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {trend.value}%
            </span>
            {description && (
              <CardDescription className="ml-2 text-xs">
                {description}
              </CardDescription>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
