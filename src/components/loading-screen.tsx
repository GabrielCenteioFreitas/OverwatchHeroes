import Divider from "./divider";
import Footer from "./footer";
import Header from "./header";
import LoadingIcon from "./loading-icon";

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