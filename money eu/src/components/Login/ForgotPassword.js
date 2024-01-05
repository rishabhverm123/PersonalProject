import { useState } from "react";
import logo from "./../../assets/img/zest_logo.png";
import { Divider } from "primereact/divider";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { restorePassword } from "../../API/authenticate_api";
import { NotificationService } from "../../API/notification_service";
import { NotificationType } from "../../helperclasses/enums";
export default function ForgotPassword() {
    const [input, setInputs] = useState('');

    const service_notifier=new NotificationService();

    const navigate=useNavigate()
    const Forgot=()=>{
        debugger;
        if(input===''){
            return;
        }
        restorePassword(input).then((restore) => {
            restore=restore.data;
            navigate('/login')
            service_notifier.showNotification(NotificationType.Success,restore.message)

          })
          .catch((error) => {
            if (error.response.status === 404) {
                service_notifier.showNotification(NotificationType.Error,"Doesn't exist in database");
              }
              else{
                service_notifier.showNotification(NotificationType.Error,error.code)

              }
          });
    }

    const login=(e)=>{
        e.preventDefault();
        navigate('/login')
    }
    return(
        <section className="bg_image" id="sec_login_panel">
        <div className="wrapper fadeInDown">
        <div id="formContent">
        <div className="fadeIn first">
      <img  src={logo} id="icon" alt="User Icon" />
    </div>

    <Divider align="center">
                  <div className="inline-flex align-items-center">
                    <h5 className="fw-normal mb-0 responsive_font" style={{ letterSpacing: "0.8px", fontSize: "1rem" }}>
                    Restore Password
                    </h5>
                  </div>
      </Divider>
      <form>
      <div className="mt-4">
      <input type="text" name="username" id="login" value={input || ""} onChange={(e)=>setInputs(e.target.value)} className="fadeIn second"  placeholder="Please enter email" />
      {
            input===""?<div  className="form_error responsive_font">
            <div >Email is required</div>
      </div>: null
          }

      </div>

      <input type="button" className="fadeIn fourth mt-4" value="Forgot" onClick={()=>Forgot()} />
    </form>
    <div id="formFooter">
      <a className="underlineHover" href="#!" onClick={(e)=>login(e)}>Back To Login</a>
    </div>
            </div>
            </div>
            </section>
    )
}