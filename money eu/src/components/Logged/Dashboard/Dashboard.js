import React, { useEffect, useState } from "react";
import { Breadcrumb } from "./../Breadcrumb/Breadcrumb";
import { TotalAmount } from "./childComponents/TotalAmount";
import { getUserDTO, } from "./../../../API/authenticate_api";
import { MonthAmount } from "./childComponents/MonthAmount";
import { DayAmount } from "./childComponents/DayAmount";
export const Dashboard = () => {

const [selectedTab,setTab]=useState('Total_Amounts')

const user = getUserDTO();

const onTabSelect=(e,tab)=>{
    e.preventDefault();
    setTab(tab)

}
  return (
    <React.Fragment>
      <div className="main-breadcrumb">
        <Breadcrumb
          breadcrumb={[{ icon: "th-large", name: "dashboard", selected: true }]}
        />
      </div>
      <div className="main_content">
        <div className="tab_panel">
          <ul className="nav-tabs">
            <li className="nav-item">
              <a className={`nav-link ${selectedTab==='Total_Amounts' ? "active" : ""}`} href="!#" onClick={(e)=>onTabSelect(e,'Total_Amounts')}>
                Total Amounts
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${selectedTab==='Amount_per_Month' ? "active" : ""}`} href="!#" onClick={(e)=>onTabSelect(e,'Amount_per_Month')}>
                Sales Amount Per Month
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${selectedTab==='Amount_per_Day' ? "active" : ""}`} href="!#" onClick={(e)=>onTabSelect(e,'Amount_per_Day')}>
                Sales Amount Per Day
              </a>
            </li>
          </ul>
        </div>
        <div className="tab_view_content">
            <div>
               

            {
                selectedTab==='Total_Amounts'?<TotalAmount user={user}/>:
                selectedTab==='Amount_per_Month'?<MonthAmount user={user}/>:
                <DayAmount user={user}/>

            }
          </div>
    </div>
      </div>
    </React.Fragment>
  );
};
