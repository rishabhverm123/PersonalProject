export default function Product(props) {
  console.log("Product List", props);
  return (
    <div className="container mt-4">
      <div className="row">
  
          {props.items.map((item, index) => {
            return (
              <div className="col-md-4 my-2">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={item.img} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.title} </h5>
                    <p className="card-text">{item.desc}</p>
                    <a href="#!" class="btn btn-primary">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

      </div>
    </div>
  );
}
