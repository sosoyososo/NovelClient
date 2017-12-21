import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';


export default class DetailScreen extends Component {
    static navigationOptions = {
        title: '详情',
    };


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }


    componentDidMount() {
        this.loadData()
    }

    loadData() {
        novel = this.props.navigation.state.params.novel
        fetch("http://localhost:9090/chapters?page=0&id=" + novel.id)
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

    showChapterDetail(chapter) {
        const { navigate } = this.props.navigation;
        navigate('ChapterDetail', { chapter: chapter })
    }

    ListHeaderComponent() {
        novel = this.props.navigation.state.params.novel
        return (
            <View style={{flex: 1}}>
                <Image style={{ width: 100, height: 120, margin: 10 }} source={{ uri: ("http:" + novel.Coverimg) }} />
                <Text>{novel.Title}</Text>
                <Text style={{ fontSize: 14 }}>{novel.Author}</Text>
                <Text style={{ fontSize: 14 }}>{novel.Summary}</Text>
                <View style={{height:1, backgroundColor:'#abc', marginVertical:10}}></View>
            </View>
        )
    }


    render() {
        novel = this.props.navigation.state.params.novel
        return (
            <View style={{ flex: 1, paddingVertical: 10 }}>                
                <FlatList
                    data={this.state.data}
                    ListHeaderComponent={this.ListHeaderComponent.bind(this)}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{ height: 40 }} onPress={() => {
                            this.showChapterDetail(item)
                        }}>
                            <Text>{item.Title}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }
}