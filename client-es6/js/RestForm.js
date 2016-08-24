import React from 'react'
import $ from 'jquery'

class RestForm extends React.Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.state = {
            token: '',
            searchString: '',
            results: null
        };
    }

    componentWillMount() {
          this.setState({
              token: (this.props.token ? this.props.token : '')
          });
    }

    renderRestults() {
      if(this.state.results !== null) {
          console.log('renderRestults');
          return this.state.results.records.map((data, index) => {
              var resultElemHtmlString = '';
              var i = 0;
              for(var propertyName in data) {
                  if(propertyName !== '__proto__' && propertyName !== 'attributes') {
                      if(i === 0) {
                          resultElemHtmlString += data[propertyName];
                      } else {
                          resultElemHtmlString += ' ---- ' + data[propertyName];
                      }
                       ++i;
                  }
              }
              return (
                  <tr key={index}>{resultElemHtmlString}</tr>
              );
          });
      }
      return null;
    }

    handleChange(event) {
      console.log('asss  rest_url');
        this.setState({ searchString: event.target.value });
    }

    handleClick(event) {
        // validate form
        // set loading msg
        var rest_url = '/api/query?id=' + this.state.token + '&query=' + this.state.searchString;
        console.log(rest_url);
        let that = this;
        $.ajax({
            method: "GET",
            url: rest_url,
            headers: {
                authedxyz: this.state.token
            },
            dataType: 'json',
            success: function(response) {
                console.log('success : ' + response);
                console.log(response);
                that.setState({ results: response });
                that.render();
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log('errror : ' + textStatus);
            }
        });
    }

    render() {

        let results = this.renderRestults();
        console.log(results);
        return (
            <div class="container-fluid">
                <div class="row minispacer">
                    <div class="col-md-6">
                        <div class="input-group">
                            <span class="input-group-addon" id="basic-addon1">$$</span>
                            <input value={this.state.searchString} onChange={this.handleChange.bind(this)} type="text"  class="form-control" placeholder="Query" aria-describedby="basic-addon1" />
                            <span class="input-group-addon" id="basic-addon1">$$</span>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <button onClick={this.handleClick} class="btn btn-primary" id="saveSetupInfoButton">
                            <span class="">Test Rest Call</span>
                        </button>
                    </div>
                </div>
                <div class="row minispacer">
                    <div class="col-md-8">
                        <table class="table table-striped">
                            <tbody>
                                {results}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
  }
}

export default RestForm
