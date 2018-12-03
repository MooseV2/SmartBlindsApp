import React, {Component} from 'react';
import { Page, Toolbar, Button, ToolbarButton, Icon, BackButton } from 'react-onsenui';
import ScheduleCard from './ScheduleCard';
class Schedule extends Component {
    render() {
        return (
            <Page>
                <Toolbar>
                    <div className="left">
                        <BackButton>
                            Back
                        </BackButton>
                    </div>
                    <div className="center">
                        Schedules
                    </div>
                    <div className="right">
                        <ToolbarButton>
                            <Icon icon="fa-plus"/>
                        </ToolbarButton>
                    </div>
                </Toolbar>
                <Button>HEY HEY HEY</Button>
                <ScheduleCard days={[0,1,2,3,4,5,6,7]}/>
            </Page>

        );
    }
}

export default Schedule;