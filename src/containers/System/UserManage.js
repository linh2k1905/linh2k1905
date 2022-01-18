import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUser } from '../../services/userService'
class UserManage extends Component {
    constructor(profs) {
        super(profs)
        this.state = {
            arrUser: []
        }
    }
    state = {

    }

    async componentDidMount() {
        let response = await getAllUser('ALL');
        if (response && response.errorCode == 0) {
            this.setState(
                {
                    arrUser: response.users
                }, () => {

                    console.log('check state 1', this.state.arrUser);
                })
            console.log('check state 2', this.state.arrUser)
        }
        console.log("from node js:", response);
    }


    render() {
        console.log('linh check render', this.state)
        let arrUser = this.state.arrUser
        return (
            <div className="users-container">
                <div className='title text-center'> Quản lý người dùng</div>
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {arrUser && arrUser.map((item, index) => {
                            console.log("linh check map", index, item);
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fas fa-edit"></i> </button>
                                        <button className='btn-delete'><i className="fas fa-trash-alt"></i></button>
                                    </td>


                                </tr>
                            )

                        })}

                    </table>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
