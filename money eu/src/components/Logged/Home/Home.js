import React, { useEffect, useState } from "react";
import { Breadcrumb } from "./../Breadcrumb/Breadcrumb";
import { getUserDTO } from "./../../../API/authenticate_api";
import { ROLES } from "../../../helperclasses/enums";
import moment from "moment";
export const Home = () => {
  const [isAdmin, setAdmin] = useState(false);
  const [time, setTime] = useState(new Date());
  const user = getUserDTO();
  const role = user.idRoles.id;

  useEffect(() => {
    if (role === ROLES.ROLE_ADMIN || role === ROLES.ROLE_SUPERADMIN) {
      setAdmin(true);
    }
    setInterval(() => {
      setTime(new Date());
    }, 1000);
    console.log("TIme", time);
  }, []);

  return (
    <React.Fragment>
      <div className="main-breadcrumb">
        <Breadcrumb breadcrumb={[]} />
      </div>
      <div className="main_content">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-sm-6  text-center text-sm-start"></div>

              {isAdmin ? (
                <div className="col-sm-6 mt-2 mt-sm-0 d-flex justify-content-sm-end justify-content-center align-items-center">
                  <div style={{ fontSize: "15px" }}>
                    <div style={{ fontWeight: "600" }}>
                      {moment(time).format("yyyy-MM-dd HH:mm:ss")}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 text-center">
                <h3>Welcome!</h3>
                <div style={{ textAlign: "center" }}>
                  <h6>You are logged as {user.username}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
