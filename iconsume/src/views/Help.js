import React, { Component } from 'react';
import {
  WebView
} from 'react-native';

import About from './About';

export default class Help extends Component {

  componentWillMount() {
    var route = this.props.navigator.navigationContext.currentRoute;
    route.rightButtonTitle = 'About';
    route.onRightButtonPress = this.aboutTapped.bind(this); // bind the action to the rightButtonPress
    route.title = 'Help';
    this.props.navigator.replace(route);
  }

  render() {
    return (
      <WebView
      source={{ html: '<html><body><p>Hello World!</p></body></html>'}}
      />
    )
  }

  aboutTapped() {
    this.props.navigator.push({
      component: About
    })
  }
}
