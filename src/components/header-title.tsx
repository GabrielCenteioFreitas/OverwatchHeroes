import Link from "next/link";

const HeaderTitle = () => {  
  return ( 
    <Link href="/">
      <h1 className="text-4xl font-bold">Overwatch Heroes</h1>
    </Link>
  );
}
 
export default HeaderTitle;