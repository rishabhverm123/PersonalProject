import { Component } from "react";

export default class Color extends Component {
  constructor(props) {
    super(props);
    this.state = { color: props.color };
  }

  render() {
    debugger;
    return (
      <div className="square" onClick={()=>this.props.update(this.props.index)} style={{ backgroundColor:  this.props.color }}>
        <div className="square-content">
            <strong style={{ textTransform: 'uppercase'}}>{this.props.color}</strong>
        </div>
      </div>
    );
  }
}
