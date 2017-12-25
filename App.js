import {
  StackNavigator,
} from 'react-navigation';

import ListScreen from './List'
import DetailScreen from './Detail'
import ChapterDetailScreen from './ChapterDetail'
import SearchScreen from './Search'

const App = StackNavigator({
  List: { 
    screen: ListScreen,
    navigationOptions: ({navigation}) => ({      
      headerTruncatedBackTitle:'',
      headerBackTitle:'',
    }),
  },
  Search : {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({      
      headerTruncatedBackTitle:'',
      headerBackTitle:'',
    }),
  },
  Detail: { 
    screen: DetailScreen , 
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.titleName}`,
      headerTruncatedBackTitle:'',
      headerBackTitle:'',
    }),
  },
  ChapterDetail: { screen: ChapterDetailScreen , 
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.titleName}`,      
      headerTruncatedBackTitle:'',
      headerBackTitle:'',
    }),
  },  
});

export default App;