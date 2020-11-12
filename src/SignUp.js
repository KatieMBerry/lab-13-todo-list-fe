import React, { Component } from 'react'

export default class SignUp extends Component {
    state = {
        email: '',
        password: ''
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:
                        <input />
                    </label>
                    <label>Password:
                        <input />
                    </label>
                    <button>
                        Sign Up!
                    </button>
                </form>
            </div>
        )
    }
}
