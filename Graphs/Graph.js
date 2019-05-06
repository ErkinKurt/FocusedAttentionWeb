import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';


class ChartsPage extends React.Component {
    state = {
      dataLine: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      }
    }
  
  render() {
      return (
        <MDBContainer>
          <h3 className="mt-5">Line chart</h3>
          <Line data={this.state.dataLine} options={{ responsive: true }} />
        </MDBContainer>
      );
    }
  }
  
  export default ChartsPage;

export default class Graph extends Component {
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
      <div>
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
