import React from 'react'
import queryString from 'query-string'
import LoginButton from './LoginButton'
import Schedule from './Schedule'

class App extends React.Component {

    constructor() {
        super();
        this.state = {
          isLoggedIn: false,
          id: '',
          name: ''
        };
    }

    componentWillMount() {
        if(window.location.search.length) {
            console.log('has paramm');
            let url_params = queryString.parse(window.location.search);
            this.setState({
                isLoggedIn: true,
                id: url_params.id,
                name: url_params.name,
                instanceUrl: url_params.instanceUrl,
                token: url_params.token
            });
        }
    }

    render() {
        console.log('this statee');
        console.log(this.state);
        let markUp = (this.state.isLoggedIn ? <Schedule id={this.state.id} name={this.state.name} instanceUrl={this.state.instanceUrl} token={this.state.token} /> : <LoginButton />);

        return (
            <div class="slds-container--x-large slds-container--center setupBox">
                {markUp}
            </div>
        );
  }
}

export default App
