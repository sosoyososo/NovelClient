import React, { Component } from 'react';

import {
    Text,
    View
  } from 'react-native';

  
  export default class ChapterDetailScreen extends Component {    
    static navigationOptions = {
        title: '详情',
    };

    render() {
        return (
            <View style={{flex:1}}>
                <Text>{this.props.navigation.state.params.chapter.Title}</Text>
            </View>
        )
    }
  }