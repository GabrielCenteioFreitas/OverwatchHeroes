import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

const LoadingIcon = ({ className, ...rest }: React.ComponentProps<'svg'>) => {
  return ( 
    <AiOutlineLoading3Quarters
      className={twMerge("animate-spin", className)}
      {...rest}
    />
  );
}
 
export default LoadingIcon;