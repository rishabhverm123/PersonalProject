import { useState } from "react";
import "./Generator.css";
import { NotificationService } from "./notification_service";
export const Generator = () => {

const[inputs,setInputs]=useState({length:'',upper:false,lower:false,numbers:false,symbols:false});

const [password,setPassword]=useState('');

const notify=new NotificationService();

 const numbers = '0123456789'
 const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
 const lowerCaseLetters ='abcdefghijklmnopqrstuvwxyz'
 const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é"

const updateInputs=(event)=>{
    debugger;
    const name = event.target.name;
    let value = event.target.value;
    if(name!=='length'){
        value=event.target.checked;
    }
    setInputs(values => ({...values, [name]: value}))

    setPassword()

}

const copy=()=>{
    if(password===''){
        notify.showNotification(notify.NotificationType.Error,'Please generate password first');
        return;
    }

    navigator.clipboard.writeText(password);
    notify.showNotification(notify.NotificationType.Success,'Password copied successfully..!');


}

const createPassword = (characterList) => {
    let password = ""
    const characterListLength = characterList.length
    for (let i = 0; i < inputs.length; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }
  
const Generate=()=>{
    if(inputs.upper===false && inputs.lower===false && inputs.numbers===false && inputs.symbols===false){
       
        notify.showNotification(notify.NotificationType.Error,'Please select any checkbox to generate password');
        return;
    }
    let characterList = "";
    if (inputs.numbers) {
      characterList = characterList + numbers
    }
    if (inputs.upper) {
      characterList = characterList + upperCaseLetters
    }
    if (inputs.lower) {
      characterList = characterList + lowerCaseLetters
    }
    if (inputs.symbols) {
      characterList = characterList + specialCharacters
    }
    setPassword(createPassword(characterList))
    notify.showNotification(notify.NotificationType.Success,'Password is generated successfully');
}
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center h-50">
        <div className="col-6">
          <div className="card   mx-3 mx-md-0">
            <div className="card-body">
              <h5 className="card-title text-center">Password Generator</h5>
              <h6 className="card-subtitle mb-2 text-center text-muted">
                You can generate random password here..
              </h6>
              <div className="mt-4 password-container d-flex">
                <span className="text-container">{password}</span>
                <span className="copy_text" title="Copy" onClick={()=>copy()}><i className="fa fa-copy"></i></span>
              </div>

              <div className="rule_container mt-2 ">
                    <div className="row mt-3 text-center">
                        
                            <div className="col-6">
                            <label className="form_label mt-0">Password Length<span className="text_astric">*</span></label>
                            </div>

                            <div className="col-6">
                            <input type="number"  className="form-control" value={inputs.length|''} name='length' onChange={(e)=>updateInputs(e)} id="staticEmail2" min='12' max="25" />
                            </div>

                     

                    </div>
                    <div className="row mt-2 text-center">
                        
                        <div className="col-6">
                        <label className="form_label mt-0">Add Uppercase Letters</label>
                        </div>

                        <div className="col-6">
                        <div className="form-check">
  <input className="form-check-input" type="checkbox" name="upper" checked={inputs.upper|false} onChange={(e)=>updateInputs(e)} id="upperCheck" />
</div>
                        </div>
                </div>
                <div className="row mt-2 text-center">
                        
                        <div className="col-6">
                        <label className="form_label mt-0">Add Lowercase Letters</label>
                        </div>

                        <div className="col-6">
                        <div className="form-check">
  <input className="form-check-input" type="checkbox" name="lower" checked={inputs.lower|false} onChange={(e)=>updateInputs(e)} id="lowerCheck" />
</div>
                        </div>
                </div>
                <div className="row mt-2 text-center">
                        
                        <div className="col-6">
                        <label className="form_label mt-0">Include Numbers</label>
                        </div>

                        <div className="col-6">
                        <div className="form-check">
  <input className="form-check-input" type="checkbox" name="numbers" checked={inputs.numbers|false} onChange={(e)=>updateInputs(e)} id="numberCheck" />
</div>
                        </div>
                </div>
                <div className="row mt-2 text-center">
                        
                        <div className="col-6">
                        <label className="form_label mt-0">Include Symbols</label>
                        </div>

                        <div className="col-6">
                        <div className="form-check">
  <input className="form-check-input" type="checkbox" name="symbols" checked={inputs.symbols|false} onChange={(e)=>updateInputs(e)} id="symbolCheck" />
</div>
                        </div>
                </div>

                <div className="mt-4 text-center">
                <button type="button" className="btn btn-dark rounded" onClick={()=>Generate()}>Generate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
