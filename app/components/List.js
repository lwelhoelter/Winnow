import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {openList, sendTask} from '../redux';
import AddItem from './AddItem';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
    };
    this.send = this.send.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   taskList: await JSON.parse(this.props.tasks),
    // });
    openList({user: this.props.user, receiver: this.props.receiver});
  }

  send(task) {
    sendTask(task.text, this.props.user, this.props.receiver);
  }

  addItem(task) {
    this.send(task);
  }

  render() {
    return (
      <View>
        <AddItem
          addItem={this.addItem}
          user={this.props.user}
          receiver={this.props.receiver}
          tasks={this.props.tasks}
        />
        {this.props.tasks.map((task) => (
          <View key={task.id}>
            <Text>{task.text}</Text>
          </View>
        ))}
        {/* <FlatList
          data={this.state.taskList}
          renderItem={({task}) => <Text>{task}</Text>}
          keyExtractor={(task) => task.id}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  },
});

const mapState = (state, {navigation}) => ({
  tasks: state.tasks,
  user: state.user,
  receiver: navigation.getParam('receivingUser'),
});

export default connect(mapState)(List);

{
  /* <GiftedChat
          tasks={this.props.tasks}
          user={{
            _id: this.props.user.id,
          }}
          onSend={(task) => this.send(task[0])}
        /> */
}
