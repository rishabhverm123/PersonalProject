import { React, Component } from "react";
import Alert from "react-bootstrap/Alert";
import noData from "./../assets/images/No_Data_Found.png";

import { toast } from "react-toastify";
export class Notes extends Component {
  constructor() {
    super();

    this.state = { newNotes: "", notes: [],editedNotes:'' };
  }

  setNotes = (val) => {
    debugger;
    this.setState({ newNotes: val.target.value });
  };

  setEditedState=(val)=>{
    this.setState({ editedNotes: val.target.value });
  }

  addNotes = () => {
    debugger;
    if (this.state.newNotes.trim() === "") {
      toast.error("Please provide any note");
      return false;
    }
    const new_note = {
      id: Math.random(),
      text: this.state.newNotes.trim(),
      edited: false,
    };
    const list = [...this.state.notes];
    list.unshift(new_note);
    this.setState({ newNotes: "", notes: list });
    toast.success("New note is added");
  };

  editNotes = (note, index) => {
    debugger;
    let isEditingState = false;
    this.state.notes.forEach((item, index) => {
      if (item.edited) {
        isEditingState = true;
      }
    });
    if (isEditingState) {
      toast.error("Any note is already in editing mode");
      return false;
    }
    const list = [...this.state.notes];
    list[index].edited = true;
    this.setState({notes:list,editedNotes:list[index].text})
  };

  editNoteInner=(note, index) => {
    if (this.state.editedNotes.trim() === "") {
        toast.error("Empty note is not allowed");
        return false;
      }
    const list = [...this.state.notes];
    list[index].edited = false;
    list[index].text = this.state.editedNotes;
    this.setState({notes:list,editedNotes:''})
  }

  CancelEditing=(note, index) => {
    const list = [...this.state.notes];
    list[index].edited = false;
    this.setState({notes:list,editedNotes:''})
}

  deleteNotes = (index) => {
    debugger;
    const list = [...this.state.notes]; 

    list.splice(index,1)
  
    // Filter values and leave value which we need to delete 

    // Update list in state 
    this.setState({ 
        notes: list, 
    }); 

    toast.success("Note deleted successfully");
  };

  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col-sm-12 py-4">
            <Alert key="primary" variant="primary">
              TODO APP
            </Alert>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-10">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="inp_notes"
                    placeholder="Enter notes"
                    value={this.state.newNotes}
                    onChange={this.setNotes}
                  />
                </div>
              </div>

              <div className="col-sm-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.addNotes}
                >
                  <i className="fa fa-plus mx-2"></i>Add Note
                </button>
              </div>
            </div>

            {this.state.notes.length > 0 ? (
              <div>
                <ul className="list-group">
                  {this.state.notes.map((item, key) => {
                    return (
                      <li className="list-group-item my-2 " key={key}>
                        <div className="d-flex justify-content-between">
                            {
                               item.edited ? (                  <input
                                type="text"
                                className="form-control"
                                id="inp_notes"
                                placeholder="Enter notes"
                                value={this.state.editedNotes}
                                onChange={this.setEditedState}
                              />): ( <span>{item.text}</span>)
                            }
                      
                          {item.edited ? (
                            <div className="action_btn d-flex">
                              <button
                                className="btn btn-primary mx-1"
                                onClick={() => this.editNoteInner(item, key)}
                              >
                                <i className="fa fa-check"></i>
                              </button>
                              <button className="btn btn-danger mx-1" onClick={() => this.CancelEditing(item, key)}>
                                <i className="fa fa-close"></i>
                              </button>
                            </div>
                          ) : (
                            <div className="action_btn d-flex">
                              <button
                                className="btn btn-primary mx-1"
                                onClick={() => this.editNotes(item, key)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button className="btn btn-danger mx-1" onClick={()=>this.deleteNotes(key)}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="col-sm-12 py-4">
                <div className="alert alert-light" role="alert">
                  <img
                    className="no_data_found_content_img"
                    src={noData}
                    alt="no data"
                  />
                  <p className="no_data_found_content_text header_userdata p-2">
                    No notes available....!
                  </p>
                </div>

                {/* <Alert key="light" variant="light">
                  No Notes Added...!
                </Alert> */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
