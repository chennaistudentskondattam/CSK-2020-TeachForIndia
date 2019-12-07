import React from 'react';

import {db , Auth} from './config'
import InfiniteScroll from 'react-infinite-scroller';
import { List,Icon,Popconfirm, message } from 'antd';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class EventListView extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      ind:[],
      admin:false,
    }
  }

  componentDidMount(){
var that  = this
    Auth.onAuthStateChanged(function(user) {
  if (user) {
    if(user.uid != 'vT00GEdpnKTuXiZlvAF2KJFgZ1j1' && !that.state.admin){

    }
    else{
      that.setState({admin:true})
    }
  } else {
    // No user is signed in.
  }
});


  }

setSearch(){
  var that = this;
  var ind = [];
  if(this.props.search.length < 1){
     message.info('Enter SearchID');
  }
  else {
    if (this.state.admin) {
      db.ref(this.props.school).child(this.props.class).child(this.props.search).child('events').child(this.props.type).child(this.props.list).once('value').then(function(data){
        ind = []
        data.forEach(function(child){
          //console.log("data",child);
          var m = {
            key:child.key,
            id:child.val().id,
            name:child.val().name,
            cat:child.val().type
          }
          ind.push(m)
        })
    console.log("ind", ind);
        that.setState({ind})
      }).catch(function(error) {
        message.info('Participant Details not found');
      });
    }
    else{
      console.log("adassas" , this.props.school , this.props.class , this.props.search )
  db.ref(this.props.school).child(this.props.class).child(this.props.search).child('events').child(this.props.type).child(this.props.list).once('value').then(function(data){
    ind = []
    data.forEach(function(child){
      //console.log("data",child);
      var m = {
        key:child.key,
        id:child.val().id,
        name:child.val().name,
        cat:child.val().type
      }
      ind.push(m)
    })
console.log("ind", ind);
    that.setState({ind})
  }).catch(function(error) {
    message.info('Participant Details not found');
  });
 }
}
}

 confirm(key) {
    console.log("key",key);
    db.ref('eventlist').child(this.props.type).child(key).remove()
     message.info('Event Deleted.');
}



  render() {

    var data =[]
    data = this.state.ind;

    return (
      <div style={{margin:10}}>
      <FloatingActionButton mini={true} secondary={true} onClick={this.setSearch.bind(this)}>
        <ContentAdd />
      </FloatingActionButton><br />
        <InfiniteScroll>

            <List
            bordered={true}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item actions={[]}>
                <List.Item.Meta
                  title={item.name}
                />
              </List.Item>
            )}
          />

        </InfiniteScroll>
      </div>
    );
  }
}