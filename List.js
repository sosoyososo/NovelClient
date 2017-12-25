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
  Button,
  Dimensions,
  View
} from 'react-native';
import NovelView from './NovelView'

const  windowSize = Dimensions.get('window');


export default class ListScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '首页',
    headerRight: <Button title={'搜索'} onPress={(function (navigation) {      
      this.navigate('Search')
    }).bind(navigation)} />
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isRefresh: false,
      page : 0
    }
  }

  componentDidMount() {
    this.loadData(0)
  }

  loadData(page) {
    if (this.state.isLoading || this.state.isRefresh) {
      return
    }
    if (0 == page) {
      this.setState({
        isRefresh: true,
        isLoading: false
      })
    } else {
      this.setState({
        isRefresh: false,
        isLoading: true
      })
    }
    fetch("http://localhost:9090/novels?page="+page.toString())
      .then((response) => response.json())
      .then((responseJson) => {
        array = responseJson
        if (page > 0) {
          array = this.state.data.concat(responseJson)
        }
        this.setState({
          data: array,
          isLoading: false,
          isRefresh: false,
          page:page+1
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  showNovel(item) {
    const { navigate } = this.props.navigation;
    navigate('Detail', { novel: item, titleName:item.Title})
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          onRefresh={() => {
            this.loadData(0)
          }}
          refreshing={this.state.isRefresh}
          onEndReached={() => 
            this.loadData(this.state.page)
          }
          keyExtractor={(item, index) => index}
          renderItem={({ item }) =>
            <View>
              <NovelView item={item} action={() => 
                this.showNovel(item)
              }/>            
              <View style={{height:1, backgroundColor:'#ccc', marginHorizontal:5}} />
            </View>
          }
        />
      </View>
    );
  }
}

