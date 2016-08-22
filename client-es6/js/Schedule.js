import React from 'react'
import RestTestButton from './RestTestButton'

class Schedule extends React.Component {

    constructor() {
        super();
        this.state = {
            instanceUrl: '',
            id: '',
            name: '',
            schedule: {}
        };
    }

    componentWillMount() {
        this.setState({
            id: (this.props.id ? this.props.id : ''),
            name: (this.props.name ? this.props.name : ''),
            instanceUrl: (this.props.instanceUrl ? this.props.instanceUrl : ''),
            token: (this.props.token ? this.props.token : '')
        });
    }

    render() {
        return (
            <div class="slds-form-element">
                <div class="slds-form-element__control">
                    <div class="slds-grid slds-grid--align-center">
                    <h2>Welcome {this.state.name}</h2>
                    <RestTestButton token={this.state.token} instanceUrl={this.state.instanceUrl} id={this.state.id}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Schedule
