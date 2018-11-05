import React, { Component } from 'react';

class Navbar extends Component {
  state = {
    input: ''
  }
  render() {
    return (
      <div>
        <h1>Podcast</h1>
        <input onChange={this.handelInput} type="text" />
      </div>
    );
  }

  handelInput = (e) => {
    this.setState({
      textInput: e.target.value
    }, _ => this.props.filter(this.state.textInput))
  }
}

export default Navbar;