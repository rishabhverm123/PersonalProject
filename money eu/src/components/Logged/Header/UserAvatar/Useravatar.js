import logo from "./../../../../assets/img/img_avatar.png";
import "./Useravatar.css";
export const Useravatar = () => {
  return (
    <div>
      <button
        type="button"
        className="circle-avatar remove_icon_drop position_relative"
        
      >
        <img height="40" width="40" src={logo} alt="Cloud Chen" />
      </button>

      <div className="userCard" id="userCard">
    <div className="cardContent">
      <span className="closeBtn" id="closeCardBtn">&times;</span>
      <h2>User Information</h2>
      <p>Name: John Doe</p>
      <p>Email: johndoe@example.com</p>
      <p>Location: New York</p>
    </div>
  </div>
    </div>
  );
};
