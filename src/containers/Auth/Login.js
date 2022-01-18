import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handelLoginAPI } from '../../services/userService';
import './Login.scss';
import { userLoginSuccess } from '../../store/actions';
//oimport { FormattedMessage } from 'react-intl';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errorMessage: ''
        }

    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })


    }
    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })


    }
    handleLogin = async () => {

        this.setState({
            errorMessage: ''
        })
        try {
            let data = await handelLoginAPI(this.state.username, this.state.password)
            console.log(data)
            if (data && data.errorCode !== 0) {
                this.setState({
                    errorMessage: data.messageCode
                })
            }
            if (data && data.errorCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login successfully')
            }





        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.messageCode
                    })
                }
            }
            //  this.setState({ errorMessage: e.messageCode })
        }

    }
    ShowHidePassword = () => {
        this.setState(
            { isShowPassword: !this.state.isShowPassword })
    }


    render() {


        return (
            <div>
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12  text-login '>Login</div>
                            <div className='col-12 form-group login-input'>

                                <label>Username</label>
                                <input type='text' className='form-control'
                                    value={this.state.username}
                                    onChange={(event) => this.onChangeUsername(event)}
                                    placeholder='Enter username' />
                            </div>
                            <div className='col-12 form-group login-input'>

                                <label>Password</label>
                                <div className='custom-input-password'>
                                    <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control'
                                        onChange={(event) => this.onChangePassword(event)}
                                        value={this.state.password} placeholder='Enter password' />
                                    <span
                                        onClick={() => this.ShowHidePassword()}
                                    >
                                        <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} ></i>
                                    </span>
                                </div>
                            </div>
                            <div className='col-12' style={{ color: 'red' }}>{this.state.errorMessage}</div>
                            <div className='col-12'>
                                <button className='btn-login' onClick={() => this.handleLogin()}>Sign in</button>
                            </div>
                            <div className='col-12'>
                                <span className='forgot-password'> Forgot your password?</span>
                            </div>
                            <div className='col-12 text-center mt-3'>
                                <span className='text-orther-login'>Or login with</span>
                            </div>

                            <div className='col-12 social-login'>
                                <i className='fab fa-google-plus-g gg'></i>
                                <i className='fab fa-facebook-square face'></i>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
