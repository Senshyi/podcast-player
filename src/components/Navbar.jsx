import React, { Component } from 'react';

class Navbar extends Component {
  state = {
    input: ''
  }
  render() {
    return (
      <div className='navbar'>
        <div className='logo'>
          <i className="fas fa-microphone"></i>
          <h1>Podcast</h1>
        </div>
        <input onChange={this.handelInput} value={this.state.input} type="text" placeholder='Search Episode' />
      </div>
    );
  }

  handelInput = (e) => {
    this.setState({
      input: e.target.value
    }, _ => this.props.filter(this.state.input))
  }
}

export default Navbar;