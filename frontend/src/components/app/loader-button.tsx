import { ReactNode } from "react";
import { Button } from "@material-tailwind/react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type loaderButtonProp = {
  children: ReactNode;
  type?: "submit" | "button";
  loading?: boolean;
  onClick?: () => void;
  className?: string;
};
export const LoaderButton = ({
  children,
  type = "button",
  loading = false,
  className,
  onClick,
  ...prop
}: loaderButtonProp) => {
  return (
    <Button
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      {...prop}
      onClick={onClick}
      type={type}
      className={cn(
        "w-full h-12 bg-colors-forground flex-center gap-2 hover:bg-colors-forground ",
        className,
        { "pointer-events-none bg-colors-forground/70": loading }
      )}
    >
      {children}
      {loading && (
        <>
          <div className="animate-spin">
            <LoaderCircle className="w-5 bg  " />
          </div>
        </>
      )}
    </Button>
  );
};
