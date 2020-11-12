import React, { Component } from 'react';
import request from 'superagent';

export default class SignUp extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    }

    handleSubmit = async (e) => {//make a new acct and direct the user to the todos page, they will need their token in localStorage
        e.preventDefault();
        this.setState({ loading: true })

        const user = await request
            .post(`https://tranquil-taiga-53567.herokuapp.com/auth/signup`)//makes a new acct with Post req
            .send(this.state);//sending email and pssword from state

        this.setState({ loading: false })

        // localStorage.setItem('TOKEN', user.body.token);//want to show user they are logged in by showing their email (when in todo page) so need to set up here and have a place to render in the to-do page
        this.props.storeTokenandEmail(user.body.token, user.body.email);//now it's being handled by app.js so it has been passed down via props
        this.props.history.push('/todo');
    }


    render() {
        return (//forms always need a handleSubmit and onChange
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:
                        <input
                            onChange={(e) => this.setState({ email: e.target.value })}
                            value={this.state.email} />
                    </label>
                    <label>Password:
                        <input
                            onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password} />
                    </label>
                    {
                        this.state.loading
                            ? 'spinning!'
                            : <button>
                                Sign Up!
                            </button>
                    }
                </form>
            </div>
        )
    }
}
