/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  View
} from 'react-native';

var { windowHeight, windowWidth } = Dimensions.get('window');


export default class ListScreen extends Component {
  static navigationOptions = {
    title: '首页',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.loadData(0)
  }

  loadData(page) {
    fetch("http://localhost:9090/novels?page=0")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  showNovel(item) {
    const { navigate } = this.props.navigation;
    navigate('Detail', { novel: item })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <TouchableOpacity style={{ flex: 1, marginVertical: 5, marginHorizontal: 5 }} onPress={
              () => {
                this.showNovel(item)
              }
            }>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image style={{ width: 100 }} source={{ uri: ("http:" + item.Coverimg) }} />
                <View style={{ width: windowWidth - 210, marginHorizontal: 5, backgroundColor: '#abc' }}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.Title}</Text>
                  <Text style={{ fontSize: 14 }}>{item.Author}</Text>
                  <Text style={{ fontSize: 14, height: 110 }}>{item.Summary}</Text>
                </View>
              </View>
              <View style={{ height: 1 }}></View>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

