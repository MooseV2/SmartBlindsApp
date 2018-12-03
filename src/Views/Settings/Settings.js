import React, {Component} from 'react';
import { Page, Toolbar, Button, ToolbarButton, Icon, BackButton, List, ListItem, ListTitle, Input, Switch, Select } from 'react-onsenui';

class Settings extends Component {

    constructor() {
        super();
        this.state = {
            doSchedule: false,
            doSunrise: true,
            ip: "192.168.0.1",

            schedule_hour_activate: "01",
            schedule_min_activate: "00",
            schedule_time_activate: "PM",

            schedule_hour_deactivate: "04",
            schedule_min_deactivate: "00",
            schedule_time_deactivate: "PM",

            schedule_timestring: "00:00--12:00",

        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('settings', JSON.stringify(nextState));
        console.log("Saved state successfully")
    }

    componentWillMount() {
        let loadState = localStorage.getItem('settings');
        if (typeof loadState === 'string') {
            // Load successful
            console.log("Loaded state successfully");
            this.setState(JSON.parse(loadState));
        }
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar.bind(this)}>
                <ListTitle>Schedule</ListTitle>
                <List>
                    <ListItem>
                        <div className="left">Activate schedule</div>
                        <div className="right"><Switch onChange={this.changeSchedule.bind(this)} checked={this.state.doSchedule}/></div>
                    </ListItem>
                    {this.renderSchedulePicker.bind(this)()}
                </List>

                <ListTitle>Sunrise / Sunset</ListTitle>
                <List>
                    <ListItem>
                        <div className="left">Activate on sunrise/sunset</div>
                        <div className="right"><Switch onChange={this.changeSunrise.bind(this)} checked={this.state.doSunrise}/></div>
                    </ListItem>
                </List>

                <ListTitle>Device IP Address</ListTitle>
                <List>
                    <ListItem>
                        <div className="left">IP</div>
                        <div className="right"><Input onChange={this.changeIP.bind(this)} value={this.state.ip}/></div>
                    </ListItem>
                </List>
            </Page>

        );
    }

    renderToolbar() {
        return (<Toolbar>
                    <div className="left">
                        <BackButton>
                            Back
                        </BackButton>
                    </div>
                    <div className="center">
                        Settings
                    </div>
                </Toolbar>);
    }

    renderSchedulePicker() {
        const keys = ["Activate", "Deactivate"];
        return keys.map((item) => {
                    return (<ListItem key={item} style={{display: this.state.doSchedule ? null : 'none'}}>
                        <div className="left"><strong>{item}</strong></div>
                        <div className="right">
                            <Select select-id={`schedule_hour_${item}`.toLowerCase()} 
                                    style={{width:50, marginRight:20}} 
                                    onChange={this.updateTime.bind(this)}
                                    value={this.state[`schedule_hour_${item}`.toLowerCase()]}>
                                {[...Array(12).keys()].map((e) => <option key={`${e+1}`} value={`${e+1}`.padStart(2, 0)}>{`${e+1}`.padStart(2, 0)}</option>)}
                            </Select>
                            <h2 style={{width: 20, textAlign: "center"}}>:</h2>

                            <Select select-id={`schedule_min_${item}`.toLowerCase()} 
                                    style={{width:50, marginRight:20, marginLeft:20}} 
                                    onChange={this.updateTime.bind(this)}
                                    value={this.state[`schedule_min_${item}`.toLowerCase()]}>
                                {[...Array(59).keys()].map((e) => <option key={`${e+1}`} value={`${e}`.padStart(2, 0)}>{`${e}`.padStart(2, 0)}</option>)}
                            </Select>
                            
                            <Select select-id={`schedule_time_${item}`.toLowerCase()} 
                                    style={{width:50, marginRight:20}}
                                    value={this.state[`schedule_time_${item}`.toLowerCase()]}>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </Select>
                        </div>
                    </ListItem>)
                    });    
    }


    updateTime(event) {
        let newState = {...this.state}
        newState[event.target.id] = event.target.value;
        newState["schedule_timestring"] = this.getScheduleTimes(newState);
        this.doUpdate(newState);
        this.setState(newState);
    }

    getScheduleTimes(state) {
        return this.getTime("activate", state) + "--" + this.getTime("deactivate", state);
    }

    getTime(item, state) {
        let hh = parseInt(state["schedule_hour_" + item]) + (state["schedule_time_" + item] == "AM" ? 0 : 12);
        let mm = state["schedule_min_" + item];
        let result = hh.toString().padStart(2, 0) + ":" + mm;
        return result;
    }

    changeSchedule(event) {
            this.setState({doSchedule: event.target.checked});
            this.doUpdate({...this.state, doSchedule: event.target.checked});
    }

    changeSunrise(event) {
        this.setState({doSunrise: event.target.checked});
        this.doUpdate({...this.state, doSunrise: event.target.checked});
    }

    changeIP(event) {
        this.setState({ip: event.target.value});
    }

    apiCall(data) {
        const ip = this.state.ip;
        fetch(`http://${ip}:5000/${data}`)
            .then((response) => {
                response.text().then((text) => {
                    console.log(text);
                })
            })
            .catch((e) => {
                //window.alert("ERROR" + e);
            });
    }

    doUpdate(loadState) {
            // Set up schedules
            if (loadState["doSchedule"] == true) {
                this.apiCall(`schedule/set/${loadState.schedule_timestring}`);
            } else {
                this.apiCall(`schedule/disable`);
            }

            if (loadState["doSunrise"] == true) {
                this.apiCall(`sun_schedule/enable`);
            } else {
                this.apiCall(`sun_schedule/disable`);
            }
        console.log("Completed update")
    }
}

export default Settings;