
import React, { Component } from 'react';
import {
  Text,  
  TouchableOpacity,
  Image,  
  Dimensions,
  View
} from 'react-native';

const  windowSize = Dimensions.get('window');

export default class NovelView extends Component {
    render() {
        item = this.props.item
        return (
            <TouchableOpacity style={{ flex: 1, marginVertical: 5 }} onPress={this.props.action}>
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor:'white'}}>
                  <Image style={{ width: 80, marginLeft:5 }} source={{ uri: ("http:" + item.Coverimg) }} />
                  <View style={{ width:windowSize.width - 115, marginLeft:5}}>
                    <Text style={{ fontSize: 17, marginTop:5, fontWeight: 'bold',color:'#444' }}>{item.Title}</Text>
                    <Text style={{ fontSize: 14, marginTop:10, color:'#888'}}>作者:{item.Author}</Text>                  
                    <Text style={{ fontSize: 14, height: 80 , marginTop:10, color:'#888'}}>简介:{item.Summary}</Text>
                  </View>
                </View>              
              </TouchableOpacity>
        )
    }
}