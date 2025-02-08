import { Card, type CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends CardProps {
  delay?: number;
}

export function AnimatedCard({ children, className, delay = 0, ...props }: AnimatedCardProps) {
  return (
    <Card
      className={cn(
        "bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </Card>
  );
}
