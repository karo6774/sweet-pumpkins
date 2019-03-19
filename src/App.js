import React, { Component } from 'react';
import Header from "./header/Header";
import Main from "./main/Main";

export default class App extends Component {
  render() {
    return (
        <div>
          <Header/>
          <Main/>
        </div>
    );
  }
}
