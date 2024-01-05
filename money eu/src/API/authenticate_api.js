import axios from 'axios';
import {server_url} from './../constants';

import Users from './../models/users';
import { NotificationType } from '../helperclasses/enums';
import { NotificationService } from './notification_service';
import { useHistory } from 'react-router-dom';



const BASE_URL = server_url;

const BASIC_AUTHORIZATION = 'Basic';

const TOKEN_DATA = 'token';

const CAPTCHA_KEY = '_grecaptcha:';

const IP_KEY = 'ip';

const ACCESS_TOKEN_KEY='access_token';

const AUTH_DATA = 'user';

const UserObj=new Users();

const service_notifier=new NotificationService();

export var token=null;
  // Function to authenticate from the API

  const getLoginAuthorizationHeaders=(username,password)=>{
    const credentials = btoa(`${username}:${password}`);
    return credentials;
  }

export const saveToken=(res)=>{

    debugger;
    guardarToken(res[ACCESS_TOKEN_KEY]);
    getDataToken();
    // service_shared.setUser(getUser());
    // fillSubjectWithTokenData();
  }

  const guardarToken=(tokenData)=> {
    sessionStorage.setItem(TOKEN_DATA, tokenData);
    token = tokenData;
  }

  export const getDataToken=()=> {
    let user=null;
    let tokenData = sessionStorage.getItem(TOKEN_DATA);
    if (!!tokenData) {
      token = tokenData;
      
      user = getUserFromDecryptedData(token);
    }
    else{
      user = null;
    }
    return user;
  }

  const getUserFromDecryptedData=(decryptedData)=> {
    let decryptedToken = null;
    if (!!decryptedData && decryptedData.length > 0) {
      const decryptedDataElements =
        decryptedData.split('.');
      if (
        !!decryptedDataElements &&
        decryptedDataElements.length > 1
      ) {
        const decryptedDecodedToken = atob(
          decryptedDataElements[1]
        );
        decryptedToken = JSON.parse(decryptedDecodedToken);
      }
    }
    return decryptedToken;
  }
export const Authenticate_user = (email,password) => {

    const authorizationHeaders = getLoginAuthorizationHeaders(email,password);
    
    return axios({
        method: 'post',
        url: BASE_URL+'oauth/token',
        data: null,
      
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With':'XMLHttpRequest',
        'Authorization':BASIC_AUTHORIZATION+' '+authorizationHeaders
        }, 
      })
  };

  export const  updateTrysUser=(user_name)=>{
    return axios.put(BASE_URL+`users/login/trys/${user_name}`,null);
  }

  export const  restorePassword=(email)=>{
    return axios.get(BASE_URL+`password/${email}`);
  }

  const getUser=()=>{
    return getDataToken();
  }

  export const getUserDTO=()=>{
    let user= UserObj.convertInterfaceToClass(getUser())
    // this.service_shared.setUser(user);
    return user;
  }

  export const  isAuthenticated=()=>{
    const user = getUser();
 
    return (
      !!user && !!user?.username && user.username.length > 0
    );
  }
  export const Logout=(reload_flg)=>{
    //debugger;
    localStorage.removeItem(IP_KEY);
    localStorage.removeItem(CAPTCHA_KEY);
    localStorage.clear();
    sessionStorage.removeItem(TOKEN_DATA);
    sessionStorage.removeItem(AUTH_DATA);
    sessionStorage.clear();
    service_notifier.showNotification(NotificationType.Success, "Log Out realized successfully. Goodbye!!");
    token = null;
    

    if(reload_flg){
      setTimeout(()=>{
        window.location.reload();
      },1000)
    

    }

  }