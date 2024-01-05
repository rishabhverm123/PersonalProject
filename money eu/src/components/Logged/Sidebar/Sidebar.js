import { useContext, useEffect, useState } from "react";
import menu from "./../../../helperclasses/Menu.json";
import logo from "./../../../assets/img/zest_logo.png";
import logo_small from "./../../../assets/img/zest_logo_small.png";
import logo_avatar from "./../../../assets/img/img_avatar.png";
import { getUserDTO, Logout } from "./../../../API/authenticate_api";
import "./Sidebar.css";
import { ROLES, ACCESSES } from "./../../../helperclasses/enums";
import { Resource } from "./../../../models/resource";
import Appglobal from "../../../helperclasses/appglobal";
import { MenuVM } from "../../../models/MenuVm";
import { useLocation, useNavigate } from "react-router-dom";
export const Sidebar = () => {
  const [menuState, setMenuState] = useState(true);

  const [menuData, setMenuData] = useState([]);

  const user = getUserDTO();

  const appglobal = new Appglobal();

  const navigate=useNavigate();

  const location = useLocation();
  
  const [active,setActive]=useState(location.pathname);

  useEffect(() => {
    console.log("location.pathname", location.pathname);

    if (
      user.idRoles.id === ROLES.ROLE_ADMIN ||
      user.idRoles.id === ROLES.ROLE_SUPERADMIN ||
      user.idRoles.id === ROLES.ROLE_MERCHANT ||
      user.idRoles.id === ROLES.ROLE_SUBUSER
    ) {
      getMenuForuser(user);
    }

  }, []);

  const changeTheme=(value)=>{
    debugger;
    if(value.currentTarget.checked){
      document.body.classList.add('theme-dark');
    }
    else{
      document.body.classList.remove('theme-dark');
    }
  }

  const getMenuForuser = (user) => {
    let menu_to_return = [];
    let all_menu_items = menu;
    let user_resource_access = user.resourcesAccess;
    let resource_permitted = [];
    user_resource_access.forEach((item, index) => {
      if (!(item.idAccess.id === ACCESSES.ACCESS_NONE)) {
        resource_permitted.push(item.idResource);
      }
      if (item.idResource.id === 8 && item.idAccess.id !== 0) {
        resource_permitted.push(new Resource(7, "Companies General"));
      }
    });
    all_menu_items.forEach((item, index) => {
      if (item.idParent === 0 && item.idResource != null) {
        if (appglobal.containsObject(item.idResource, resource_permitted)) {
          menu_to_return.push(item);
        }
      } else if (item.idParent !== 0) {
        if (
          item.idResource != null &&
          appglobal.containsObject(item.idResource, resource_permitted)
        ) {
          let menuParent = getMenuItemById(item.idParent);
          if (
            menuParent != null &&
            !appglobal.containsObject(menuParent, menu_to_return)
          ) {
            menu_to_return.push(menuParent);
          }

          menu_to_return.push(item);
          // All menu items that do not have associated resources are introduced and
          // father -1
        } else if (item.idParent === -1) {
          menu_to_return.push(item);
        }
      }
    });
    let menu_tree = build_menu_tree(menu_to_return);

    console.log("menu_tree", menu_tree);
    setMenuData(menu_tree);
  };

  const getMenuItemById = (id) => {
    //debugger;
    let menu_to_return = null;
    menu.forEach((item, index) => {
      if (item.id === id) {
        menu_to_return = item;
        return;
      }
    });
    return menu_to_return;
  };

  const build_menu_tree = (menu_items) => {
    //debugger;
    let menu_to_return = [];
    menu_items.forEach((item, index) => {
      if (item.idParent === 0 || item.idParent === -1) {
        menu_to_return.push(buildNodeTree(item, menu_items));
      }
    });
    return menu_to_return;
  };

  const buildNodeTree = (item, menu_items) => {
    let menu_childrens = getChildrens(item, menu_items);
    if (menu_childrens.length == 0) return new MenuVM(item, []);
    else {
      let menutoReturn = new MenuVM(item, []);
      menu_childrens.forEach((item, index) => {
        menutoReturn.childrens.push(buildNodeTree(item, menu_items));
      });
      return menutoReturn;
    }
  };

  const getChildrens = (menu, menu_items) => {
    //debugger;
    let listToReturn = [];
    menu_items.forEach((item, index) => {
      if (item.idParent === menu.id) {
        listToReturn.push(item);
      }
    });
    return listToReturn;
  };

  const redirectView=(path)=> {
      setActive(path);
      navigate(path)

  }

  const logoutUser=()=>{
    Logout(true);
    navigate('/login')
  }

  return (

    <div className={`sidebar h-100 ${menuState ? "close" : ""}`}>
      <div className="logo-details text-center justify-content-center" onClick={()=>redirectView('/logged')} style={{cursor:'pointer'}}>
        {menuState ? (
          <img src={logo_small} alt="logo" width="40px;" />
        ) : (
          <img src={logo} alt="logo" width="200px;" />
        )}
      </div>
      <div  className={`toggle_icon ${menuState ? "" : "open"}`} onClick={()=>setMenuState(!menuState)}>
      <i  className="fa fa-angle-right"></i>
      </div>
      <ul className="nav-links h-100 scrollableY">
        {menuData.map((item, index) => {
          return (
            
            <li key={index} className={`${active===item.optionMenu.path?'active':''}`} onClick={()=>redirectView(item.optionMenu.path)}>
              <span >
                <i className={`fa fa-${item.optionMenu.icon} icon`}></i>
                <span className="link_name">{item.optionMenu.name}</span>
              </span>
              {item.childrens && item.childrens.length ? (
                <ul className="sub-menu">
                  <li>
                    <a className="link_name" href="!#">
                      {item.optionMenu.name}
                    </a>
                  </li>
                  {item.childrens.map((item2, index2) => {
                    return (
                      <li key={index2}>
                        <a href="!#">{item2.optionMenu.name}</a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="sub-menu blank">
                  <li>
                    <span className="link_name">{item.optionMenu.name}</span>
                  </li>
                </ul>
              )}
            </li>
          );
        })}
  </ul>
      
          <div className="profile-details">
            <div className="profile-content">
              <img src={logo_avatar} alt="profileImg" />
            </div>
            <div className="name-job">
              <div className="profile_name">{user.name} {user.lastname}</div>
              <div className="job">{user.email}</div>
            </div>

            <i className="fa fa-sign-out fa-lg" onClick={()=>logoutUser()} style={{marginLeft:'-5px', color:'#fff', fontSize:'1.5rem', cursor:'pointer'}}></i>


          </div>
            <div className="theme-mode">
              <lable className='lable_theme'>Dark Mode</lable>
            <label className="switch">
    <input type="checkbox" onChange={(e)=>changeTheme(e)}/>
    <span className="slider round"></span>
  </label>
          </div>

       
    
    </div>
  );
};
