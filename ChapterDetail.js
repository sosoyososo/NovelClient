import React, { Component } from 'react';

import {
    Text,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';


export default class ChapterDetailScreen extends Component {
    static navigationOptions = {
        title: '详情',
    };

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
                <Text>{this.state.data.Title}</Text>
                <Text>{this.state.data.Author}</Text>
                <Text>{this.state.data.Content}</Text>
            </ScrollView>
        )
    }
}