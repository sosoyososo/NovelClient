import React, { Component } from 'react';

import {
    Text,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';


export default class ChapterDetailScreen extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: { Title: "", Author: "", Content: "" }
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        chapter = this.props.navigation.state.params.chapter
        fetch("http://localhost:9090/detail?url=" + chapter.URL)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    data: responseJson
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <ScrollView style={{ flex: 1 }}>                
                <Text style={{color:'#aaa', marginHorizontal:5, marginVertical:10}}>{this.state.data.Author}</Text>
                <Text style={{color:'#aaa', marginHorizontal:5, marginVertical:10, lineHeight:20}}>{this.state.data.Content}</Text>
            </ScrollView>
        )
    }
}