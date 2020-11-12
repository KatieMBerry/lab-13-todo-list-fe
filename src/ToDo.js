import React, { Component } from 'react';
import request from 'superagent';

export default class ToDo extends Component {
    state = {
        todos: []
    }

    componentDidMount = async () => {//we want to list out all the to-do itemsthe user has via feetch to db
        const response = await request.get(`https://tranquil-taiga-53567.herokuapp.com/api/todos`)
            .set('Authorization', this.props.token)

        this.setState({ todos: response.body })
    }

    render() {
        return (
            <div>
                Welcome to your To Do page!
            </div>
        )
    }
}
