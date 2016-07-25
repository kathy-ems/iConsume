import React, { Component } from 'react';

import {
  ScrollView,
  Text
} from 'react-native';

export default class About extends Component {

  componentWillMount() {
    var route = this.props.navigator.navigationContext.currentRoute;
    route.title = 'About';
    this.props.navigator.replace(route);
  }

  render() {
    return (
      <ScrollView >
        <Text>Author: Kathy Ems</Text>
      </ScrollView>
    )
  }
}
