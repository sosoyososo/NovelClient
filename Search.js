import React, { Component } from 'react';
import {
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    View
} from 'react-native';
import {
    ButtonGroup,
    SearchBar
} from 'react-native-elements';

import NovelView from './NovelView'

export default class SearchScreen extends Component {
    static navigationOptions = {
        title: '首页',
    };
    
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            searchKey : "",
            hasNext: true,
            page: 0            
        }
    }

    showNovel(item) {
        const { navigate } = this.props.navigation;
        navigate('Detail', { novel: item , titleName:item.Title})
    }

    search(loadNext) {
        page = this.state.page
        if (loadNext && page == 0) {
            return
        }
        if (loadNext && this.state.hasNext == false) {
            return
        }
        key = this.state.searchKey        
        selectedIndex = this.state.selectedIndex
        if (this.state.isLoading) {
            return
        }
        searchType = "title"
        switch (selectedIndex) {
            case 1:
                searchType = "author"
                break;
            case 2:
                searchType = "tags"
                break;
            case 3:
                searchType = "summary"
                break;
        
            default:
                break;
        }
        url =  "http://localhost:9090/search"+"/"+searchType+"?page="+page.toString()+"&key="+key
        fetch(url)
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
          hasNext:responseJson.length > 0,
          page:page+1
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });          
    }

    render() {
        titles = ["标题", "作者", "标签", "描述"]
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    lightTheme
                    placeholder={"输入内容进行搜索"}
                    onChangeText={(text) => {
                        this.setState({
                            searchKey:text
                        })
                    }}
                    onClearText={() => {
                        this.setState({
                            searchKey:""
                        })
                    }}
                    onEndEditing={() => {
                        this.setState({
                            page : 0,
                            data : [],
                            hasNext:true
                        })
                        this.search(false)
                    }} />

                <ButtonGroup
                    onPress={(index) => {
                        this.setState({ 
                            selectedIndex: index,
                            hasNext:true,
                            page : 0,
                            data : []})
                    }}
                    selectedIndex={this.state.selectedIndex}
                    buttons={titles}
                    containerStyle={{ height: 30 }}
                />

                <FlatList
                    data={this.state.data}
                    onEndReached={() =>                        
                        this.search(true)
                    }
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>
                    <View>
                        <NovelView item={item} action={() => 
                        this.showNovel(item)
                        }/>            
                    </View>
                    }
                />
            </View>
        );
    }
}