import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import NovelView from './NovelView'

export default class DetailScreen extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isRefresh: false,
            page: 0
        }
    }


    componentDidMount() {
        this.loadData(0)
    }

    loadData(page) {
        if (this.state.isLoading || this.state.isRefresh) {
            return
        }
        novel = this.props.navigation.state.params.novel
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
        fetch("http://localhost:9090/chapters?page=" + page.toString() + "&id=" + novel.id)
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
                    page: page + 1
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    showChapterDetail(chapter) {
        const { navigate } = this.props.navigation;
        navigate('ChapterDetail', { chapter: chapter , titleName: chapter.Title})
    }

    ListHeaderComponent() {
        novel = this.props.navigation.state.params.novel
        return (
            <View> 
                <NovelView item={novel} />
                <View style={{height:5}} />
                <View style={{height:1, marginHorizontal:5, backgroundColor:'#ccc'}} />
                <View style={{height:5}} />
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
                    onRefresh={() => {
                        this.loadData(0)
                    }}
                    keyExtractor={(item, index) => index}x
                    refreshing={this.state.isRefresh}
                    onEndReached={() =>
                        this.loadData(this.state.page)
                    }
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{marginHorizontal:5 }} onPress={() => {
                            this.showChapterDetail(item)
                        }}>
                            <Text style={{ lineHeight: 44}}>{item.Title}</Text>
                            <View style={{height:1, backgroundColor:'#ccc'}} />
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }
}