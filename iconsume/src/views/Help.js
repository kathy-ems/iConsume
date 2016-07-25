import React, { Component } from 'react';
import {
  WebView
} from 'react-native';

export default class Help extends Component {

  componentWillMount() {
    var route = this.props.navigator.navigationContext.currentRoute;
    route.title = 'Help';
    this.props.navigator.replace(route);
  }

  render() {
    return (
      <WebView
      source={{ html: '<html><body><p>Hello World!</p></body></html>'}}
      injectedJavaScript="alert('Hello', 'Hello!');"
      />
    )
  }
}
