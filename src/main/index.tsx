import MainBox from "@/main/componens/MainBox.tsx";
import NavBar from "@/main/componens/NavBar.tsx";
import Slide from "@/main/componens/Slide.tsx";

const MainApp = () => {
  return (
    <>
      <MainBox/>
      <NavBar/>
      <Slide/>
      <h1>路由承载页面</h1>
    </>
  );
};

export default MainApp;
