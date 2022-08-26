import React, { Component } from 'react'
import Menu from './Menu'
import TodoList from './TodoList'
import TodoCounter from './TodoCounter'
import TodoApi from '../api/todo'
import TodoContext from './TodoContext'

import './todo.css'

class Todo extends Component {
    constructor(props) {
        super(props)
        this.api = new TodoApi()
        this.state = {
            todos: [],
            text: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    componentDidMount() {
        this.api.all(r => {
            // 获取数据后在回调函数中更新 todos 的值
            this.setState({
                todos: r,
            })
        })
    }

    onUpdate(todo) {
        let todos = this.state.todos
        let index = todos.findIndex(e => e.id === todo.id)
        todos[index] = todo
        this.setState({
            todos: todos,
        })
    }

    onDelete(id) {
        let todos = this.state.todos
        let index = todos.findIndex(e => e.id === id)
        todos.splice(index, 1)
        this.setState({
            todos: todos,
        })
    }

    render() {
        let todos = this.state.todos
        console.log('todos', todos)
        let path = this.props.match.path
        let actions = {
            onContextUpdate: this.onUpdate,
            onContextDelete: this.onDelete,
        }
        return (
            <div>
                <TodoContext.Provider value={actions}>
                    <Menu path={path}/>
                    <h1>
                        Todo List
                        <span>Become a true time.</span>
                    </h1>
                    <TodoList todos={todos}/>
                    <TodoCounter todos={todos}/>
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="new-todo">
                            Add to the todo list
                        </label>
                        <br />
                        <input
                            id="new-todo"
                            onChange={this.onChange}
                            value={this.state.text}
                        />
                        <button>
                            Add {todos.length + 1} item
                        </button>
                    </form>
                </TodoContext.Provider>
            </div>
        )
    }

    onChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.state.text.length === 0) {
            return
        }
        let task = this.state.text
        let data = {
            task,
        }
        let todos = this.state.todos
        this.api.add(data, (r) => {
            this.setState((prevState) => {
                return {
                    todos: prevState.todos.concat(r),
                    text: '',
                }
            })
        })
    }
}

export default Todo
