import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import Combobox from 'react-widgets/lib/Combobox';
import 'react-widgets/dist/css/react-widgets.css';

const GAMEADJUSTMENTFORM_STATE = {
  'gameScenarioId': 'Select',
  'patientsState': [],
  'patientId': 'Select',
  'patientName': 'Select',
  'pcState': [],
  'pcId': 'Select',
  'startLevel': 'Select',
  'maxLevel': 'Select',
  'minLevel': 'Select'
};

const gameScenariosArray = [
    'Select', 'Apples', 'Paintball', // Other options ....
];

class GameAdjustmentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...GAMEADJUSTMENTFORM_STATE};
    this.firebase = this.props.firebase;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  showPatients =  async () => {
    let firebasePromise = this.props.firebase.getAllPatientsForDoctor();
    let patients = [];
    if(firebasePromise !== null) {
      await firebasePromise.then(snapshot => {
        for (let i in snapshot.docs) {
          const doc = snapshot.docs[i]
          patients.push({
            id: doc.id,
            data: doc.data()
          });
        }
        this.setState({
          patientsState: patients
        });
      });
    }
    else {
      return "Empty";
    }
  }

  showPcs = async () => {
    let firebasePromise = this.props.firebase.getAllPcForClinic("Tesla");
    let pcs = [];
    if(firebasePromise !== null) {
      await firebasePromise.then(snapshot => {
        for (let i in snapshot.docs) {
          const doc = snapshot.docs[i]
          pcs.push({
            id: doc.id,
            data: doc.data()
          });
        }
        this.setState({
          pcState: pcs
        });
      });
    }
    else {
      return "Empty";
    }    
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = async (event) => {
    let { pcId, patientId, patientName, gameScenarioId, startLevel, minLevel, maxLevel } = this.state;
    let gameAdjustmentObj = { patientId, patientName, gameScenarioId, startLevel, minLevel, maxLevel }
    await this.firebase.setGameAdjustmentForPc(gameAdjustmentObj, pcId);
    event.preventDefault();
  }

  componentDidMount = async () => { 
    await this.showPatients();
    await this.showPcs();
    console.log(this.state.patientsState);
    console.log(this.state.pcState);  
  }

  render() {
    let { gameScenarioId, patientsState, startLevel, minLevel, maxLevel, pcState, patientId,
      pcId } = this.state;
    
    let numbersOneToTwenty = ['Select'];

    for (let i=1; i<21; i++) {
      numbersOneToTwenty.push(i);
    }

    // Fields for Patient
    let name = [];
    let email = [];
    let patientsArray = [];

    patientsState.forEach((item, index) => {
      name[index] = item.data.name;
      email[index] = item.data.email;
      patientsArray.push({id: item.id, name: name[index]+", "+email[index]});
    });

    // Fields for PC
    let pcName = [];
    let pcsArray = [];
    // Combobox data
    pcState.forEach((item, index) => {
      pcName[index] = item.data.PcName;
      pcsArray.push({id: item.id, name: pcName[index]})
    });

    console.log(pcId);
    console.log(patientId);
    console.log(pcsArray);

      return (
        <MDBContainer>
        <MDBRow className="d-flex justify-content-center mt-5">
          <MDBCol md="6">
            <form>
              <p className="h5 text-center mb-4">Game Adjustments</p>
              <div className="black-text">
                
                <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} icon="desktop" />
                <label style={{paddingRight: "10px"}}>PC</label>
                <Combobox onSelect = {pcId=>this.setState({pcId})} 
                onChange={pcsArray=>this.setState({pcId: pcsArray.id})}
                valueField = 'id'
                textField = 'name'
                value={pcId} data={pcsArray}  />

                <hr />

                <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} far icon="id-card" />
                <label style={{paddingRight: "10px"}}>Patient</label>
                <Combobox onSelect = {patientId => this.setState({patientId})}
                onChange={patientsArray=>this.setState({patientId: patientsArray.id, patientName: patientsArray.name})} 
                valueField = 'id'
                textField = 'name'
                value={patientId} data={patientsArray}  />
                
                <hr />

                <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} icon="book" />
                <label style={{paddingRight: "10px"}}>Game Scenario</label>
                <Combobox onChange={gameScenarioId=>this.setState({gameScenarioId})} 
                value={gameScenarioId} data={gameScenariosArray}  />
                
                <hr />

                <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} icon="arrows-alt-h" />
                <label style={{paddingRight: "10px"}}>Start Level</label>
                <Combobox onChange={startLevel=>this.setState({startLevel})} 
                value={startLevel} data={numbersOneToTwenty}  />
                
                <hr />
                
                <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} icon="arrow-down" />
                <label style={{paddingRight: "10px"}}>Min Level</label>
                <Combobox onChange={minLevel=>this.setState({minLevel})} 
                value={minLevel} data={numbersOneToTwenty}  />
                
                <hr />

                <MDBIcon style = {{fontSize: "30px", paddingRight: "10px"}} icon="arrow-up" />
                <label style={{paddingRight: "10px"}}>Max Level</label>
                <Combobox onChange={maxLevel=>this.setState({maxLevel})} 
                value={maxLevel} data={numbersOneToTwenty}  />

                <hr />
              </div>
              <div className="text-center">
                <MDBBtn color="primary" onClick = {this.onSubmit}>Make Adjustment</MDBBtn>
              </div>
              <br />
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default GameAdjustmentsForm;