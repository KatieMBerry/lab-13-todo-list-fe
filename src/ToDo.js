import React, { Component } from 'react';
import request from 'superagent';

export default class ToDo extends Component {
    state = {
        todos: [],
        toDo: '',
        priorityLevel: '',
        loading: false
    }

    componentDidMount = async () => {//we want to list out all the to-do itemsthe user has via feetch to db
        await this.setState({ loading: true });
        const response = await request.get('https://tranquil-taiga-53567.herokuapp.com/api/todos')
            .set('Authorization', this.props.token)

        this.setState({ todos: response.body, loading: false })
    }

    handleSubmit = async (e) => {//onSubmit, new task gets added to the list
        e.preventDefault();
        const response = await request.post('https://tranquil-taiga-53567.herokuapp.com/api/todos')
            .send({
                todo: this.state.toDo,
                priority: this.state.priorityLevel,
            })
            .set('Authorization', this.props.token)
    }

    render() {
        return (
            <div>
                <h2>Welcome to your To-Do's page!</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Create a task
                        <input value={this.state.toDo} onChange={(e) => this.setState({ toDo: e.target.value })} />
                    </label>
                    <label>
                        Priority 1-10
                        <input type="number" value={this.state.priorityLevel} onChange={(e) => this.setState({ priorityLevel: e.target.value })} />
                    </label>
                    <button>Add New Task</button>
                </form>
                {
                    Boolean(this.state.todos.length) && this.state.todos.map(task => <div>
                        Task: {task.todo};
                        Completed: {task.is_completed}
                    </div>)
                }
            </div>
        )
    }
}
