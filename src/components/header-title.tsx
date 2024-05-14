import Link from "next/link";
import { twMerge } from "tailwind-merge";

const HeaderTitle = ({ className }: { className?: string }) => {  
  return ( 
    <Link href="/">
      <h1 className={twMerge("text-4xl font-bold", className)}>Overwatch Heroes</h1>
    </Link>
  );
}
 
export default HeaderTitle;