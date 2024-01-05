import React from "react";
import { Breadcrumb } from "./../Breadcrumb/Breadcrumb";
import "./Order.css";
export const Orders = () => {
  return (
    <React.Fragment>
      <div className="main-breadcrumb">
        <Breadcrumb
          breadcrumb={[{ icon: "suitcase", name: "orders", selected: true }]}
        />
      </div>
      <div className="main_content">
        <div className="container">
          <h1>Coming Soon!!</h1>
          <p>
            Our website is under construction. We'll be here soon with our new
            awesome site. Stay tuned!
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
