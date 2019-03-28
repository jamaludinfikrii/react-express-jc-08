import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

class App extends Component {
  state = {todo : [] ,users : [],selectEdit :0}
  componentDidMount(){
    this.getItem()
    this.getUser()
  }
  getItem = () => {
    Axios.get('http://localhost:2000/alltodo')
    .then((res) => {
      console.log(res)
      this.setState({todo : res.data})
    })
  }

  getUser = () => {
    Axios.get('http://localhost:2000/alluser')
    .then((res) => {
      this.setState({users : res.data})
    })
  }

  printUserDropDown = () => {
    var jsx = this.state.users.map((val) => {
      return(
        <option value={val.id}>{val.username}</option>
      )
    })
    return jsx
  }

  onBtnSave = (param) => {
    Axios.put('http://localhost:2000/edittodo/' + param , {todo : this.refs.editTodo.value})
    .then((res) => {
      alert('Suksess')
      this.setState({selectEdit : 0 , todo : res.data})
    } )

  }

  renderTodoJsx = () => {
    var jsx =  this.state.todo.map((val, index)=>{
      if(val.id === this.state.selectEdit){
        return(
          <tr>
            <td>{index +1}</td>
            <td>{val.username}</td>
            <td>
              <input type='text' className='form-control' ref='editTodo' defaultValue={val.to_do}/>
            </td>
            <td>
              <input type='button' className='btn btn-success mr-3' onClick={() => this.onBtnSave(val.id)} value='save'/>
              <input type='button' className='btn btn-danger' onClick={()=>this.setState({selectEdit : 0})} value='cancel'/>
            </td> 
          </tr>
        )

      }
      return(
        <tr>
          <td>{index +1}</td>
          <td>{val.username}</td>
          <td>{val.to_do}</td>
          <td>
            <input type='button' className='btn btn-primary mr-3'  onClick={()=> 
              this.setState({selectEdit: val.id})} value='edit'/>
            <input type='button' className='btn btn-danger' onClick={() => this.onBtnDelete(val.id)} value='delete'/>
          </td>
        </tr>
      )
    })
    return jsx
  }
  onBtnAdd = () => {
    var newData = {
      user : parseInt(this.refs.username.value),
      todo : this.refs.todo.value
    }

    Axios.post('http://localhost:2000/addtodo' , newData)
    .then((res)=>{
      this.setState({todo : res.data})
      alert('add data success')
      this.refs.todo.value = ''
    })
  }

  onBtnDelete =(terserah)=>{
    Axios.delete('http://localhost:2000/deletetodo/' + terserah)
    .then((res) => {
      alert(res.data)
      this.getItem()
    })

  }

  render() {
    return (
      <div className='container'>
        <h1>Todo App With React Express</h1>
        <table className='table'>
          <tr>
            <td>NO</td>
            <td>User</td>
            <td>Todo</td>
            <td>Act</td>
          </tr>
          {this.renderTodoJsx()}

        </table>
        <div className='row'>
          <div className='col-md-4'>
            <select ref='username' class="form-control form-control-sm">
            {this.printUserDropDown()}
            </select>
           </div> 
           <div className='col-md-4'>
            <input ref='todo' type='text' className='form-control' placeholder='masukan todo' />
           </div> 
           <div className='col-md-4'>
            <input type='button' className='btn btn-info' onClick={this.onBtnAdd} value='add'/>
           </div> 
        </div>
      </div>
    );
  }
}

export default App;
