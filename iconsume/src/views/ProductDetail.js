import React, { Component } from 'react';
import {
  Animated,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';

import moment from 'moment';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
        animValue: new Animated.Value(0)
    }
  }
  componentWillMount() {
      let route = this.props.navigator.navigationContext.currentRoute;
      route.rightButtonTitle = `Buy Now: $${this.props.price}`;
      route.onRightButtonPress = () => Linking.openURL(this.props.link);
      this.props.navigator.replace(route); // this wont work in the simulator because it doens't know how to open the itunes app
  }

  componentDidMount() {
    Animated.timing(
      this.state.animValue, // is updated as it's animated
      {
        toValue: 1,
        duration: 1000,
        delay: 500
      }
    ).start();
  }

  getHighResImage(image) {
    return image.replace('100x100bb', '500x500bb'); // replaces text
  }

  formatSummary(summary) {
    return summary.replace(/([A-Za-z]{3})\. +([A-Z])/g, '$1.\n\n$2');
  }

  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Animated.View style={{transform: [{scale: this.state.animValue}]}}>
          <Image source={{ uri: this.getHighResImage(this.props.image) }} style={styles.image}>
          </Image>
        </Animated.View>
        <Text style={styles.title}>
          {this.props.title}
        </Text>
        <Text style={styles.duration}>
        Duration: {Math.round(moment.duration(this.props.duration, 'milliseconds').asMinutes())}
        </Text>
        <Text>
          {this.formatSummary(this.props.summary)}
        </Text>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
  }, // properties of the scrollView (whole page)
  contentContainer: {
    backgroundColor: '#e3e3e3',
  }, // the container of the content (inside scrollview)
  image: {
    height: 300
  },
  title: {
    fontSize: 30,
    backgroundColor: '#a9a9a9',
  },
  duration: {
    fontSize: 10,
    color: 'grey'
  }

});
