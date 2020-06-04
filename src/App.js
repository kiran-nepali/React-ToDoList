import React from 'react';
import './App.css';
import ListItem from './ListItem';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items : [],
      currentItem :{
        text :'',
        key :''
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if (newItem !== ""){
      const newItems = [...this.state.items,newItem];
      this.setState({
        items:newItems,
        currentItem:{
          text:'',
          key:''
        }
      })
    }
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter(item => item.key!==key);
    this.setState({
      items:filteredItems
    })
  }

  updateList(text,key){
    const items = this.state.items;
    items.map(item => {
      if(item.key === key){
        item.text = text;
      }
    });
    this.setState({
      items:items
    })
  }
  
  render(){
  return (
    <div className ="App">
      <header>
        <h1>Todo List</h1>
          <form id ="to-do-form" onSubmit={this.addItem}>
            <input type = "text" placeholder="Enter Text" value ={this.state.currentItem.text} onChange={this.handleInput}/>
            <button type="submit">Add</button>
          </form>
      </header>
      <ListItem 
        items = {this.state.items} 
        deleteItem={this.deleteItem}
        updateList = {this.updateList}
      />
      
    </div>
    
  );
  }
}

export default App;
