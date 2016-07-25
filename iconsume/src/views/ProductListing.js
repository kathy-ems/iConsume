/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppRegistry,
  AsyncStorage,
  ListView,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Vibration,
  View
} from 'react-native';

import EvilIcon from 'react-native-vector-icons/EvilIcons';
import ProductDetail from './ProductDetail';

export default class ProductListing extends Component {
  constructor(props) {
    super(props);
    const exampleData = Array(100).fill({
      title: 'this is placeholder'
    }) // creates an array of x number with the same object
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    }); // determines if the row has changed and updates it (this is needed for react native)

    this.state = {
      searchType: 'Movie',
      networkActive: false,
      dataSource: dataSource.cloneWithRows(exampleData) // made a datasource with this, cloned it and injected the data into the state
    }
  }

  componentWillMount() {
    let route = this.props.navigator.navigationContext.currentRoute; // access to the screen itself
    route.rightButtonTitle = "Help"; // set the route to help
    route.onRightButtonPress = this.helpTapped.bind(this); // bind the action to the rightButtonPress
    this.props.navigator.replace(route); // replace the route
  }

  componentDidMount() {
    AsyncStorage.getItem('iconsume:searchText')
      .then((value) => {
        if(value) {
          this.setState({searchText: value}, this.runSearch);
        } else {
          this.setState({searchText: 'pixar'}, this.runSearch);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  helpTapped() {
    this.props.navigator.push({
      component: ProductListing
    })
  }

  rowTapped(row) {
    this.props.navigator.push({
      component: ProductDetail,
      passProps: row // passes on the props
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <ListView
        dataSource = {this.state.dataSource}
        renderRow = {this.renderRow.bind(this)}
        renderHeader = {this.renderHeader.bind(this)}
        enableEmptySections={true}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <View>
        <TextInput style={styles.searchText}
          placeholder='Search Movies and TV Shows'
          clearButtonMode='always'
          defaultValue={this.state.searchText}
          onSubmitEditing={(event) => {
            this.setState({searchText: event.nativeEvent.text }, this.runSearch); // saves the input to state
            console.log(event.nativeEvent.text);
            AsyncStorage.setItem('iconsume:searchText', event.nativeEvent.text);
          }}
        />
        <SegmentedControlIOS
          values={['Movie', 'TV Show']}
          selectedIndex={0}
          onValueChange={(searchType) => {
            this.setState({searchType}, this.runSearch)
          }} // saves the searchType to state
        />
        {this.renderLoading()}
      </View>
    );
  }

  renderRow(item) {
    return (
      <TouchableHighlight
        onPress={() => this.rowTapped(item)}
        underlayColor='#e3e3e3'
      >
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {item.title}
          </Text>
          <EvilIcon
          name="chevron-right" size={34} style={{color: '#c7c7c7'}}
          />
        </View>
      </TouchableHighlight>
    );
  }

  renderLoading(){
    if(this.state.networkActive) {
      return (
        <ActivityIndicator
          color='black'
          size='large'
          style={{marginTop: 30 }}
        />
      )
    }
  }

  setSearchResults(searchResults) {
    let dataSource = this.state.dataSource;
    dataSource = dataSource.cloneWithRows(searchResults);
    this.setState({dataSource});
  }

  runSearch() {
    let searchType = "";
    // this.state.searchType == 'Movie' : searchType = 'movie' ? searchType = 'tvshow';
    if (this.state.searchType == 'Movie') {
       searchType = 'movie'
     } else {
       searchType = 'tvshow';
     }

    const searchText = this.state.searchText.trim();

    if (searchText.length > 0) {
      let url = `https://itunes.apple.com/search?term=${searchText}&media=${searchType}`;
      this.fetchData(url);
    }
  }

  fetchData(url) {
    this.setSearchResults([]);
    this.setState({networkActive: true});
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((jsonRes) => {
        let results = jsonRes.results.map((obj) => {
          return {
            title: obj.trackName,
            collectionName: obj.collectionName,
            summary: obj.longDescription || '[No Summary]',
            releaseDate: obj.releaseDate,
            price: obj.collectionPrice,
            image: obj.artworkUrl100,
            genre: obj.primaryGenreName,
            link: obj.trackViewUrl,
            duration: obj.trackTimeMillis
          }
        })
        if (results.length > 0) {
          this.setSearchResults(results);
        } else {
          // no results
          Vibration.vibrate();
          Alert.alert(
            'No results!', 'Try again' // two parameters title and description
          );
        }
        this.setState({networkActive: false});
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  row: { // makes the row look like a native iOS row
    marginLeft: 15,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#c7c7c7',
    borderBottomWidth: 0.5, // this is 1px on retina screens

  },
  rowText: {
    flex: 1 // takes up the whole page
  },
  searchText: {
    height: 36,
    backgroundColor: '#FFFFFF',
    borderColor: '#c7c7c7',
    margin: 5,
    paddingLeft: 12,
    borderRadius: 2
  }
});
