import React from 'react'
import $ from 'jquery'

class RestTestButton extends React.Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            id: '',
            token: '',
            instanceUrl: ''
        };
    }

    componentWillMount() {
          this.setState({
              id: (this.props.id ? this.props.id : ''),
              token: (this.props.token ? this.props.token : ''),
              instanceUrl: (this.props.instanceUrl ? this.props.instanceUrl : '')
          });
          this.fetchData();
    }

    fetchData() {
      console.log('playing fetch');
      var rest_url = this.props.instanceUrl + "/services/data/v36.0/query/?q=SELECT Id, Name, AboutMe FROM User WHERE Id='" + this.props.id + "'";
      $.ajax({
          method: "GET",
          url: rest_url,
          dataType: 'json',
          headers: {
              'Authorization': 'Bearer ' + this.props.token
          },
          success: function(response) {
              console.log('success fetchfetchfetch : ' + response);
              console.log(response);
          },
          error: function(xhr, textStatus, errorThrown) {
              console.log('errror : ' + textStatus);
          }
      });
    }

    handleClick(event) {
        console.log('somethng happendinn');
        var rest_url = this.state.instanceUrl + "/services/data/v36.0/query/?q=SELECT Id, Name, AboutMe FROM User WHERE Id='" + this.state.id + "'";
        $.ajax({
            method: "GET",
            url: rest_url,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            },
            success: function(response) {
                console.log('success : ' + response);
                console.log(response);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log('errror : ' + textStatus);
            }
        });
    }

    render() {
        return (
            <div class="slds-form-element">
                <div class="slds-form-element__control">
                    <div class="slds-grid slds-grid--align-center">
                    	<button onClick={this.handleClick} class="slds-button slds-button--neutral jz--button-save" id="saveSetupInfoButton" aria-live="assertive">
                        	<span class="">Test Rest Call</span>
                        </button>
                    </div>
                </div>
            </div>
        );
  }
}

export default RestTestButton
