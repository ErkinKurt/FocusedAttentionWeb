import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact';
import { Redirect, withRouter } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const CREATEPCFORM_STATE = {
    'pcName': '',
    'isRedirectToAdmin': false,
}

class CreatePCForm extends Component {

    constructor(props) {
        super(props);
        this.state = {...CREATEPCFORM_STATE};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    redirectToAdmin = () => {
        this.setState({
            isRedirectToAdmin : true
        });
    }

    onSubmit = (event) => {
        let { pcName } = this.state;
        let response = this.props.firebase.createPcForDoctor(pcName);
        if(response)
            this.redirectToAdmin();
        event.preventDefault();
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    

  render() {
      let { pcName, isRedirectToAdmin } = this.state;

      if (isRedirectToAdmin) {
        setTimeout(function() {
            return(
                <div>
                    {console.log("Redirect")}
                    <Redirect to={ROUTES.ADMIN} />
                </div>
            )
        }, 2000
        );
    }

    return (
      <MDBContainer>
                <MDBRow className="d-flex justify-content-center mt-5">
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">Add PC</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="PC Name"
                                    value={pcName}
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
                                <MDBBtn onClick={this.onSubmit} color="success">Add PC</MDBBtn>
                            </div>
                            
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
    )
  }
}

export default withRouter(CreatePCForm);
