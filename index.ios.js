/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ProductListing from './src/views/ProductListing.js';

class iconsume extends Component {
  render() {
    return (
      <NavigatorIOS
      initialRoute = {{
        component: ProductListing,
        title: 'iConsume'
      }}
      style = {{ flex: 1 }} // fill the screen
      />
    )
  }
}

AppRegistry.registerComponent('iconsume', () => iconsume);
