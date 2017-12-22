import {
  StackNavigator,
} from 'react-navigation';

import ListScreen from './List'
import DetailScreen from './Detail'
import ChapterDetailScreen from './ChapterDetail'
import SearchScreen from './Search'

const App = StackNavigator({
  List: { screen: ListScreen},
  Search : {screen: SearchScreen},
  Detail: { screen: DetailScreen },
  ChapterDetail: { screen: ChapterDetailScreen },  
});

export default App;