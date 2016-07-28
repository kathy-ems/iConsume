import React, { Component } from 'react';
import {
  Animated,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View
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
        <View style={styles.titleContView}>
          <Text style={styles.title}>
          {this.props.title}
          </Text>
        </View>
        <View style={styles.infoContView}>
          <View style={styles.rowView}>
            <Text style={styles.duration}>
            Duration: {Math.round(moment.duration(this.props.duration, 'milliseconds').asMinutes())} min
            </Text>
            <Text style={styles.genre}>
            Genre: {this.props.genre}
            </Text>
          </View>
        </View>
        <View style={styles.summaryContView}>
          <Text style={styles.summary}>
            {this.formatSummary(this.props.summary)}
          </Text>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  }, // properties of the scrollView (whole page)
  contentContainer: {
    backgroundColor: '#000000',
    flexDirection: 'column',           /* stack flex items vertically */
    position: 'relative',               /* establish nearest positioned ancestor for
                                     absolute positioning */
  }, // the container of the content (inside scrollview)
  image: {
    height: 300,
    margin: 5,
  },
  titleContView: {
    position: 'absolute',
    left: 5,                        /* horizontal alignment */
    top: 5,                        /* vertical alignment */
    backgroundColor: 'rgba(204, 204, 204, .5)',
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    opacity: 1,
    flex: 1,
    textAlign: 'center'

  },
  infoContView: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    // backgroundColor: '#a9a9a9',
    borderColor: '#a9a9a9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  rowView: {
    flexDirection: 'row',
  },
  duration: {
    fontSize: 15,
    color: '#e3e3e3',
    flex: 1
  },
  genre: {
    fontSize: 15,
    color: '#e3e3e3',
  },
  summaryContView: {
    padding: 10,
  },
  summary: {
    fontSize: 15,
    color: '#e3e3e3'
  },

});
