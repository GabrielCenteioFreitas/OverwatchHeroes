import Divider from "../Divider";
import Footer from "../Footer";
import Header from "../Header/Header";
import LoadingIcon from "./LoadingIcon";

const LoadingScreen = () => {
  return ( 
    <>
      <Header />

      <Divider />

      <div className="w-full flex-1 h-full grid place-content-center">
        <LoadingIcon className="size-16" />
      </div>

      <Divider />

      <Footer />
    </>
  );
}
 
export default LoadingScreen;