import Link from "next/link";
import Search from "./search";

const Header = () => {
  return ( 
    <header className="flex items-center justify-between">
      <Link href="/">
        <h1 className="text-4xl font-bold">Overwatch Heroes</h1>
      </Link>
      <Search />
    </header>
  );
}
 
export default Header;