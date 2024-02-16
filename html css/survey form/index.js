

function loadJS(){
    fetch("./countries.json")
    .then((res) => {
        if (!res.ok) {
            throw new Error
                (`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => 
    loadDropdown(data)
          
          )
    .catch((error) => 
           console.error("Unable to fetch data:", error));
}

function loadDropdown(data){
    let selectDropdown=document.getElementById('country');
    let elem='<option value="">Select</option>';
    data.forEach(element => {
        
        elem+=`<option value=${element.name}>${element.name}</option>`;
        
    });
    selectDropdown.innerHTML=elem;
}