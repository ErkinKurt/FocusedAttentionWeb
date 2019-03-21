import React, { Component } from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';

// Doctor -> Patient Name, Age, Gender, email, password

class DoctorDashboard extends Component {
    render() {
        const dataBar = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
            {
                label: '#1',
                data: [12, 39, 3, 50, 2, 32, 84],
                backgroundColor: 'rgba(245, 74, 85, 0.5)',
                borderWidth: 1
            }, {
                label: '#2',
                data: [56, 24, 5, 16, 45, 24, 8],
                backgroundColor: 'rgba(90, 173, 246, 0.5)',
                borderWidth: 1
            }, {
                label: '#3',
                data: [12, 25, 54, 3, 15, 44, 3],
                backgroundColor: 'rgba(245, 192, 50, 0.5)',
                borderWidth: 1
            }
            ]
        };

        const barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
            xAxes: [{
                barPercentage: 1,
                gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
                }
            }],
            yAxes: [{
                gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                beginAtZero: true
                }
            }]
            }
        }

        const dataPie = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
            {
                data: [300, 50, 100, 40, 120, 24, 52],
                backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
                hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
            }
            ]
        }
        return (
            <div className = "responsive" >
                <h2>Welcome Doctor</h2>
                {/* Redirect to create patient form*/}
                <MDBBtn color="elegant">Create Patient</MDBBtn>
                {/* Redirect to datatable, in datatable, edit patient and show patient's results
                Maybe it can be unnecessary we can show it at the beginning, when the page opens */}
                <MDBBtn color="elegant">Show Patients</MDBBtn>
                {/* Redirect to get report form, in which user will select either in time 
                based or scenario based reports */}
                <MDBBtn color="elegant">Get Report</MDBBtn>
                {/* Send an email to himself/herself of some specific reports */}
                <MDBBtn color="elegant">Email Report</MDBBtn> 
                {/* Adjustment of test difficulties for current scenario */}
                <MDBBtn color="elegant">Adjustments for Test</MDBBtn> 
                <hr />
                {/* Tables */}
                <MDBRow className="mb-4">
                    <MDBCol md="8" className="mb-4">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <Bar data={dataBar} height={500} options={barChartOptions} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className="mb-4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader>Pie chart</MDBCardHeader>
                            <MDBCardBody>
                                <Pie data={dataPie} height={300} options={{responsive: true}} />
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBListGroup className="list-group-flush">
                                    <MDBListGroupItem>
                                        Sales
                                        <MDBBadge color="success-color" pill className="float-right">
                                            22%
                                            <MDBIcon icon="arrow-up" className="ml-1"/>
                                        </MDBBadge>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        Traffic
                                        <MDBBadge color="danger-color" pill className="float-right">
                                            5%
                                            <MDBIcon icon="arrow-down" className="ml-1"/>
                                        </MDBBadge>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        Orders
                                        <MDBBadge color="primary-color" pill className="float-right">
                                            14
                                        </MDBBadge>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        Issues
                                        <MDBBadge color="primary-color" pill className="float-right">
                                            123
                                        </MDBBadge>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        Messages
                                        <MDBBadge color="primary-color" pill className="float-right">
                                            8
                                        </MDBBadge>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default DoctorDashboard;
