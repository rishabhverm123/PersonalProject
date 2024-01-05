import { Component } from "react";
import Color from "./Color";
import "./Generator.css";

export default class ColorGenerator extends Component {
  constructor() {
    super();
    this.state = {
      colorNum: 90,
      colors: [],
    };
  }

  componentDidMount() {

    let color_arr = [];
    for (var i = 0; i < this.state.colorNum; i++) {
      const color =   this.generatorColors();
      color_arr.push(color);
    }
    this.setState({ colors: color_arr });
  
  }

  generatorColors = () => {
    return "#" + Math.random().toString(16).substr(-6);

  };

  updateColor=(index)=>{

    let colors_arr=[...this.state.colors];
    const currentColor=this.generatorColors()
    colors_arr[index]=currentColor;
     this.setState({ colors: colors_arr });
  }

  render() {
    debugger;
    return (
      <div className="container">
        <div className="row">
          {this.state.colors.map((item, key) => {
            return (
              <div className="col-md-4 my-2" key={key}>
                <Color color={item} index={key} update={this.updateColor}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
