import { Outlet } from "react-router-dom";

import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";

export const Logged = () => {
  return (
    <div id="div_logged_module">
      {/* <div className="header">
        <Header />
      </div> */}
      <div className="main">
     
          <Sidebar />
        
        <section className="home-section scrollable">
          <div className="home-content">
           <Outlet />
        </div>
      </section>

      </div>
    </div>
  );
};
