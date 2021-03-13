import React from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createCompatNavigatorFactory} from '@react-navigation/compat';
import Login from './components/Login';
import Users from './components/Users';
import List from './components/List';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <RootStack />
        </Provider>
      </NavigationContainer>
    );
  }
}
const RootStack = createCompatNavigatorFactory(createStackNavigator)(
  {
    Login: {
      screen: Login,
    },
    Users: {
      screen: Users,
    },
    List: {
      screen: List,
    },
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerTitle: 'List!',
    },
  },
);

// import React, {useState} from 'react';
// import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
// import Header from './components/Header';
// import ListItem from './components/ListItem';
// import AddItem from './components/AddItem';

// const App = () => {
//   const [items, setItems] = useState([
//     {
//       id: 1,
//       text: 'Milk',
//     },
//     {
//       id: 2,
//       text: 'Eggs',
//     },
//     {
//       id: 3,
//       text: 'Bread',
//     },
//     {
//       id: 4,
//       text: 'Juice',
//     },
//   ]);

//   const deleteItem = (id) => {
//     setItems((prevItems) => {
//       return prevItems.filter((item) => item.id !== id);
//     });
//   };

//   const addItem = (text) => {
//     if (!text) {
//       Alert.alert('Error', 'Please enter an item', {text: 'Ok'});
//     } else {
//       setItems((prevItems) => {
//         return [...prevItems, {id: 5, text}];
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Shopping List" />
//       <AddItem addItem={addItem} />
//       <FlatList
//         data={items}
//         renderItem={({item}) => (
//           <ListItem item={item} deleteItem={deleteItem} />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 60,
//   },
// });

// export default App;
