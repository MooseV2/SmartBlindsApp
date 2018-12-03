import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid, Container, Header , Item, Divider, Segment} from 'semantic-ui-react'
import {
    Page,
    Toolbar,
    ToolbarButton,
    Icon,
    Card,
    Button,
    Row,
    Col,
} from 'react-onsenui';
import { Knob } from 'react-rotary-knob';
import Skin from '../../Skins/knob_skin';
import Settings from "../Settings/Settings";

class MainMenu extends Component {
    constructor() {
        super();
        this.buttonStrings = ["UP", "DOWN"];
        this.state = { buttonState: 0, knobValue: 100, data: ["A", "B"]};
        this.knobRef = React.createRef();

    }

    doTopClick() {
        this.setState({knobValue: 99});
        this.doMoveClick();
    }

    doMoveClick() {
        let { knobValue } = this.state;
        knobValue = Math.round(knobValue);
        this.apiCall(`set/${knobValue}`);
    }

    doBottomClick() {
        this.setState({knobValue: 1});
        this.doMoveClick();
    }

    changeKnob(val) {
        if (Math.abs(this.state.knobValue - val) < 50)
        this.setState({knobValue: val});
    }

    doSettings() {
        this.pushPage(Settings);
    }

    pushPage(component) {
        this.props.navigator.pushPage({ component: Settings, props: { key: 'pageNav' + this.props.navigator.routes.length, title: this.state.nexTitle } });
    }

    popPage() {
        this.props.navigator.popPage();
    }

    apiCall(data) {
        let ip = this.getIP();
        console.log(`Calling http://${ip}:5000/${data}`);
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

    renderToolbar() {
        return (
            <Toolbar>
                <div className="center">
                    Smart Blinds
                </div>
                <div className="right" onClick={this.doSettings.bind(this)}>
                    <ToolbarButton>
                        <Icon icon="fa-cog"/>
                    </ToolbarButton>
                </div>
            </Toolbar>
        );

    }

    componentDidMount() {
        this.getIP();
    }

    getIP() {
        let loadState = localStorage.getItem('settings');
        if (typeof loadState === 'string') {
            // Load successful
            loadState = JSON.parse(loadState);
            this.setState({ip: loadState["ip"]});
            console.log("Loaded IP from storage");
            return loadState["ip"];
        }
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar.bind(this)}>
                <Card>
                    <Knob ref={this.knobRef} onChange={this.changeKnob.bind(this)} value={this.state.knobValue} text={this.buttonStrings[this.state.buttonState]} preciseMode={false} style={{marginLeft: "auto", marginRight: "auto", width:'200px', height:'200px'}} skin={Skin} defaultValue={0} min={0} max={100} />
                    <br/>
                    <Row style={{textAlign: "center"}}>
                        <Col><Button onClick={this.doTopClick.bind(this)} style={{width: "80%"}} modifier={"outline"}>Up</Button></Col>
                        <Col><Button onClick={this.doMoveClick.bind(this)} style={{width: "80%"}} modifier={"outline"}>Go To</Button></Col>
                        <Col><Button onClick={this.doBottomClick.bind(this)} style={{width: "80%"}} modifier={"outline"}>Down </Button></Col>
                    </Row>

                </Card>
            </Page>

        );
    }
}

export default MainMenu;