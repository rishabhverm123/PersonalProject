export default function Menu(props) {
  return (
   
    <div className="container mt-2">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded" >
            <div className="container-fluid">
              <a className="navbar-brand"  href="#!">
                Image Gallery
              </a>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav navbar-dark bg-dark">
                    {
                       props.items.map((item,index)=>{
                        return(
                        <li className="nav-item" key={index}>
                            <a className={`nav-link ${props.category===item ? "active" : ""}`} onClick={()=>props.event(item)} aria-current="page" href="#!">
                                {item}
                            </a>
                        </li>
                        )
                       }) 
                    }



                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
