import React from 'react'
import RestForm from './RestForm'

class Schedule extends React.Component {

    constructor() {
        super();
        this.state = {
            token: '',
            name: '',
            schedule: {}
        };
    }

    componentWillMount() {
        this.setState({
            token: (this.props.token ? this.props.token : ''),
            name: (this.props.name ? this.props.name : '')
        });
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <h2>Welcome {this.state.name}</h2>
                    <RestForm token={this.state.token}/>
                </div>
            </div>
        );
    }
}

export default Schedule
