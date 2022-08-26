import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import TodoApi from '../api/todo'
import TodoContext from './TodoContext'

class TodoItem extends PureComponent {
    constructor(props) {
        super(props)
        this.api = new TodoApi()
        let { task, id, done } = this.props.todo
        this.state = {
            editing: false,
            text: task,
            todo: {
                task,
                id,
                done,
            }
        }
    }

    static contextType = TodoContext

    onEdit = () => {
        this.setState({
            editing: true,
        })
    }

    onDelete = () => {
        let { id } = this.state.todo
        let todoId = String(id)
        this.api.delete(todoId, (r) => {
            let func = this.context.onContextDelete
            func(id)
        })
    }

    updateTodo(todoId, data) {
        this.api.update(todoId, data, (r) => {
            this.setState({
                todo: r,
                editing: false,
            })
            this.updateCounter()
        })
    }

    onSubmit = () => {
        let { id } = this.state.todo
        let text = this.state.text
        let todoId = String(id)
        let data = {
            task: text
        }
        this.updateTodo(todoId, data, )
    }

    onCancel = () => {
        this.setState({
            editing: false,
        })
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    updateCounter() {
        let func = this.context.onContextUpdate
        func(this.state.todo)
    }

    toggleComplete = () => {
        let { id, done } = this.state.todo
        let data = {
            done: !done,
        }
        let todoId = String(id)
        this.updateTodo(todoId, data)
    }

    render() {
        console.log('render in todo item')
        let {id, task, done} = this.state.todo
        let todo = null
        if (this.state.editing) {
            todo = (
                <div>
                    <button id='button4' onClick={this.onSubmit}>提交</button>
                    <button id='button5' onClick={this.onCancel}>取消</button>
                    <input id='box' type="text" value={this.state.text} onChange={this.onChange}/>
                </div>
            )
        } else {
            let text = this.state.todo.done ? '取消' : '完成'
            todo = (
                <div>
                    <button id='button1' onClick={this.onEdit}>编辑</button>
                    <button id='button2' onClick={this.onDelete}>删除</button>
                    <button id='button3' onClick={this.toggleComplete}>{text}</button>
                    <div id='todos'>
                        <Link to={`/todo/${id}`}>{task}</Link>
                    </div>
                </div>
            )
        }
        let cls = done ? 'todo-complete' : ''
        return (
            <div className={`todo-cell ${cls}`}>
                {todo}
            </div>
        )
    }
}

export default TodoItem
