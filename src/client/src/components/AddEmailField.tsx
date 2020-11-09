import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';
import { TextInput } from 'react-native';
import secureAxios from '../api/core/apiClient';

const AddEmailGroup = styled.div`
    padding-bottom: 34px;
    font-family: 'Montserrat';
    font-weight: 700;
`;

interface Props {}
class AddEmail extends React.Component<{}, {emailInput: string}> {
    constructor(props:any) {
        super(props);
        this.state = {emailInput : ''};
    }

    handleChange(e : any) {
        this.setState({emailInput: e.target.value})
    }

    handleClick() {
        return new Promise((resolve, reject) => {
            secureAxios({
            url: '/api/employees/create/employee',
            method: 'POST',
            timeout: 0,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                firstName: 'firstName',
                lastName: 'lastName',
                email: this.state.emailInput,
            }),
            })
                .then(() => resolve())
                .catch((err: Error) => reject(err));
        }); 
    }

    render() {
        return(
            <AddEmailGroup className="field is-grouped">
                <p className="control is-expanded">
                <input 
                    className="input" 
                    type="text" 
                    placeholder="Enter In Email"
                    onChange={(e) => this.handleChange(e)}
                />
                </p>
                <p className="control">
                    <a 
                        className="button is-info"
                        onClick={() => this.handleClick()}
                    >
                        Add Email
                    </a>
                </p>
            </AddEmailGroup>
        );
    }
}

export default AddEmail;
   
