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
            console.log(url_params);
            this.setState({
                isLoggedIn: true,
                name: url_params.name,
                token: url_params.token
            });
        }
    }

    render() {
        console.log('this statee');
        console.log(this.state);
        let markUp = (this.state.isLoggedIn ? <Schedule token={this.state.token} name={this.state.name} /> : <LoginButton />);

        return (
            <div>
                {markUp}
            </div>
        );
  }
}

export default App
