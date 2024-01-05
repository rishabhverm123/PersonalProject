import { Navigate, Outlet } from "react-router-dom"
import { isAuthenticated,getDataToken } from "./../API/authenticate_api";

export const Protected=()=>{


   const canActivate=()=> {
    debugger;
        if (isAuthenticated()) {
          if (isTokenExpired()) {
    
            return false;
          }
          return true;
        }
        return false;
      }
    
     const isTokenExpired=()=> {
        let payload = getDataToken();
    
        let now = new Date().getTime() / 1000;
        if (payload && payload['exp'] < now) {
          return true;
        } else {
          return false;
        }
      }

      return(
        canActivate()?<Outlet />:<Navigate to={'/login'} />
      )




}