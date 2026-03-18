import type { ButtonProps } from "@/types/ButtonProps";
import "./button.scss";

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={`button ${className}`} {...props}>
      <div className="buttonContent">{children}</div>
    </button>
  );
};
