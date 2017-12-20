import {
  StackNavigator,  
} from 'react-navigation';

import ListScreen from './List'
import DetailScreen from './Detail'
import ChapterDetailScreen from './ChapterDetail'

const App = StackNavigator({
  List: { screen: ListScreen },
  Detail: { screen: DetailScreen },
  ChapterDetail: { screen: ChapterDetailScreen },
});

export default  App;