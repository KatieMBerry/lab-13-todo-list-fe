import React, { Component } from 'react';
import request from 'superagent';

export default class SignUp extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })

        const user = await request
            .post(`https://tranquil-taiga-53567.herokuapp.com/auth/signin`)
            .send(this.state);//sending email and pssword from state

        this.setState({ loading: false })

        this.props.storeTokenandEmail(user.body.token, user.body.email);//being handled by app.js so it has been passed down via props
        this.props.history.push('/todo');
    }


    render() {
        return (//forms always need a handleSubmit and onChange
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Sign In Here</h2>
                    <label>Email:
                        <input
                            onChange={(e) => this.setState({ email: e.target.value })}
                            value={this.state.email} />
                    </label>
                    <label>Password:
                        <input
                            onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password}
                            type="password" />
                    </label>
                    {
                        this.state.loading
                            ? 'spinning!'
                            : <button>
                                Sign In!
                            </button>
                    }
                </form>
            </div>
        )
    }
}

