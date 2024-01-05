import logo from "./../../assets/img/zest_logo.png";
import { Divider } from "primereact/divider";
import {useState} from 'react';
import {LOGIN_RESULT,NotificationType} from './../../helperclasses/enums'
import { NotificationService } from "../../API/notification_service";
import {Authenticate_user,saveToken,updateTrysUser} from './../../API/authenticate_api';
import './Login.css'
import { Navigate, useNavigate } from "react-router-dom";
export default function Login() {
  const [inputs, setInputs] = useState({});

  const navigate=useNavigate();

  const service_notifier=new NotificationService();

  const handleChange = (event) => {
    const name = event.target.name;
    const value  = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const Login=()=>{
      debugger;
    const form_data=inputs;
    if((!form_data.username || form_data.username==='') || (!form_data.password || form_data.password==='')){
      return;
    }
    Authenticate_user(form_data.username,form_data.password).then((resLogin) => {
      resLogin =resLogin.data;
      if (resLogin && !resLogin['error']) {
        saveToken(resLogin);
        switch (resLogin['code']) {
          case LOGIN_RESULT.LOGGED:
            checkPasswordAndAccess(
              resLogin['password_valid_days']
            );
            break;
          case LOGIN_RESULT.DOUBLE_FACTOR:
            // this.service_authenticate.logout(false);
            // this.open_modal(LOGIN_RESULT.DOUBLE_FACTOR,{idUser:resLogin['aditional_id'],passDaysLeft:resLogin['password_valid_days']})

            break;
          case LOGIN_RESULT.EXPIRED_PASSWORD:
              // this.open_modal(LOGIN_RESULT.EXPIRED_PASSWORD,Number(resLogin['aditional_id']))
            break;
          case LOGIN_RESULT.RESETED_PASSWORD:
            // this.open_modal(LOGIN_RESULT.RESETED_PASSWORD,Number(resLogin['aditional_id']))

            break;
          case LOGIN_RESULT.TEMP_BANNED:
          case LOGIN_RESULT.BANNED:
          case LOGIN_RESULT.FAILED_DOUBLE_VERIFICATION_PROCCEES:
            service_notifier.showNotification(NotificationType.Error,resLogin['error'])
            break;    
          default: 
            break;    
        }
      }
    })
    .catch((error) => {
      TrysUser();
    });


  }

 const TrysUser=()=>{
  updateTrysUser(inputs.username).then((resTrys) => {
    resTrys=resTrys.data;
    if (resTrys && resTrys['code']) {
      switch (resTrys['code']) {
        case LOGIN_RESULT.TEMP_BANNED:
          service_notifier.showNotification(NotificationType.Error, "User Banned Temporarily");

          break;
        case LOGIN_RESULT.BANNED:
          service_notifier.showNotification(NotificationType.Error, "User Banned");
          break;
        default:
          break;
      }
    } else {
      service_notifier.showNotification(NotificationType.Error, "Username or Password incorrect");
    }
  })
  .catch((error) => {
    service_notifier.showNotification(NotificationType.Error,error.code)
  });
  }

  const checkPasswordAndAccess=(passDaysLeft) =>{
    
    let text =
      passDaysLeft >= 7
        ? `Hi ${inputs.username}, Logged successfully`
        : `Hi ${inputs.username}, Logged successfully. Your password will expire in ${passDaysLeft} days`;


    service_notifier.showNotification(NotificationType.Success,text)
    navigate('/Logged');
    // this.service_url.change_view(`/logged`);
  }

  const forgot=(e)=>{
    e.preventDefault();
    navigate('/forgot-password')
  }

  return (
    <section className="bg_image" id="sec_login_panel">
      <div className="wrapper fadeInDown">
      <div id="formContent">
 

 
    <div className="fadeIn first">
      <img  src={logo} id="icon" alt="User Icon" />
    </div>

    <Divider align="center">
                  <div className="inline-flex align-items-center">
                    <h5 className="fw-normal mb-0 responsive_font" style={{ letterSpacing: "0.8px", fontSize: "1rem" }}>
                      Sign into your account
                    </h5>
                  </div>
      </Divider>

   
    <form>
      <div>
      <input type="text" name="username" id="login" value={inputs.username || ""} onChange={handleChange} className="fadeIn second"  placeholder="Please enter username" />
      {
            inputs.username===""?<div  className="form_error responsive_font">
            <div >Username is required</div>
      </div>: null
          }

      </div>
      <div className="mt-2">
          <input type="password"  name="password" id="password" value={inputs.password || ""} onChange={handleChange} className="fadeIn third"  placeholder="Please enter password" />
          {
            inputs.password===""?    <div  className="form_error responsive_font">
            <div >Password is required</div>
          </div>: null
          }
      
      </div>
      <input type="button" className="fadeIn fourth mt-4" value="Log In" onClick={()=>Login()} />
    </form>

    <div id="formFooter">
      <a className="underlineHover" href="#!" onClick={(e)=>forgot(e)}>Forgot Password?</a>
    </div>
  </div>
</div>
    </section>
  );
}
