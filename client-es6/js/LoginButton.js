import React from 'react'

class LoginButton extends React.Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log('somethng happendinn');
        window.location.href = 'http://localhost:3000/authorize';
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="center-block">
                    	<button onClick={this.handleClick} class="btn btn-primary" id="saveSetupInfoButton">
                        	<span class="">Login to Salesforce</span>
                        </button>
                    </div>
                </div>
            </div>
        );
  }
}

export default LoginButton
