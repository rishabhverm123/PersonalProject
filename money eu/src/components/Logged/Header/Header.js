import './Header.css';

import logo from './../../../assets/img/zest_logo.png';

import { Useravatar } from './UserAvatar/Useravatar';

export const Header=()=>{
    return(
        <div className="app-topbar" style={{display: 'flex'}}>
 <div id="div_switch_sidebar" className="container-sidebar-toggle d-none d-md-block">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <div className="container-sidebar-toggle d-md-none d-block" >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
            <a href="/#/logged" className="zest-logo" >
          <div className="image-big">
            <img src={logo} alt="logo" width="155px;"/>

          </div>
        </a>
        <div className="d-flex" style={{marginTop: '9px',marginRight: '35px'}}>
          <Useravatar />
</div>
            </div>  
         )
}