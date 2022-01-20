
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }


    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleParent()
    }
    handleOnChangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'lastName', 'firstName', 'address'];

        for (let i = 0; i < arrInput.length; i++) {
            console.log(this.state[arrInput[i]]);
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Không nên để trống ' + arrInput[i]);
                break;
            }
        }
        console.log(isValid);
        return isValid;
    }
    handleAddNewUser = () => {
        //console.log("modal state", this.state);
        //console.log(" props child: ", this.props);
        let isValid = this.checkValidateInput();
        if (isValid === true) {

            this.props.createNewUser(this.state);


            // console.log(" Call api")
            // console.log('modal state', this.state)

        }

    }


    render() {
        // console.log('check props', this.props);
        //console.log('check props open', this.props.isOpen)
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'

            >
                <ModalHeader toggle={() => { this.toggle() }}>Tạo người dùng mới</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>
                                Email
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "email")}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Password
                            </label>
                            <input type='password'
                                onChange={(event) => this.handleOnChangeInput(event, "password")}
                                value={this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Họ
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Tên
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>
                                Địa chỉ
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "address")}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"

                        className='px-3'
                        onClick={() => { this.handleAddNewUser() }}>
                        Lưu
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Đóng</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
