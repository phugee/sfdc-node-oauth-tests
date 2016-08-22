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
            <div class="slds-form-element">
                <div class="slds-form-element__control">
                    <div class="slds-grid slds-grid--align-center">
                    	<button onClick={this.handleClick} class="slds-button slds-button--neutral jz--button-save" id="saveSetupInfoButton" aria-live="assertive">
                        	<span class="">Login to Org62</span>
                        </button>
                    </div>
                </div>
            </div>
        );
  }
}

export default LoginButton
