import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './Views/MainMenu/MainMenu';
import Settings from './Views/Settings/Settings';
import {Navigator} from "react-onsenui";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {view: 'main'}
    }

    doViewMain() {
      this.setState({view: 'main'});
    }

    doViewSettings() {
        this.setState({view: 'settings'})
    }

    doViewSchedules() {
        this.setState({view: 'schedule'});
    }

    renderPage(route, navigator) {
        route.props = route.props || {};
        route.props.navigator = navigator;

        return React.createElement(route.component, route.props);
    }

    render() {
        return (<Navigator renderPage={this.renderPage} initialRoute={{component: MainMenu}}/>)
  }
}

export default App;
