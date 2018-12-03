import React, {Component} from 'react';
import {Card, Row, Col, Switch, Button, Segment, ToolbarButton} from 'react-onsenui';

class ScheduleCard extends Component {
    daysRow(days) {
        return days.map((day, index) => {
            const daysCodes = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            const activeStyle = {
                color: "#3498db",
                fontWeight: "bolder"
            };
            const deactiveStyle = {
                color: "#95a5a6",
                fontWeight: "lighter"
            }
            return <td style={{paddingLeft: 3, paddingRight: 3}}><h4 style={day === 1 ? activeStyle : deactiveStyle}>{daysCodes[index]}</h4></td>
        });
    };
    render() {
        return (
            <Card>
                <Row>
                    <Col>
                        <table style={{paddingLeft: 5}}>
                            <tr>
                                <td><h2>Start:</h2></td>
                                <td><h2>10:00</h2></td>
                            </tr>
                            <tr>
                                <td><h2>End:</h2></td>
                                <td><h2>10:00</h2></td>
                            </tr>
                        </table>
                    </Col>
                    <Col width={50} verticalAlign={'center'}>
                        <Switch/>
                    </Col>
                </Row>
                <Row>
                <table>
                    <tr>
                        {this.daysRow(this.props.days)}
                    </tr>
                </table>
                </Row>
            </Card>
        );
    }
}

export default ScheduleCard;