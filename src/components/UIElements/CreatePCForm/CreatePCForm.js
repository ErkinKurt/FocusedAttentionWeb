import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

class CreatePCForm extends Component {
  render() {
    return (
      <MDBContainer>
                <MDBRow className="d-flex justify-content-center mt-5">
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">Add PC</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="PC Name"
                                    value=""
                                    name="pcName"
                                    icon="desktop"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={this.onChange}
                                />   
                            </div>
                            <div className="text-center">
                                <MDBBtn color="success">Add PC</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
    )
  }
}

export default CreatePCForm;
