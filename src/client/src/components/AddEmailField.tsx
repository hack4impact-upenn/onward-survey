import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';

const AddEmailGroup = styled.div`
    padding-bottom: 34px;
    font-family: 'Montserrat';
    font-weight: 700;
`;

interface Props {}
const AddEmailField: React.FC<Props> = (props) => {
    return(
        <AddEmailGroup className="field is-grouped">
            <p className="control is-expanded">
            <input className="input" type="text" placeholder="Enter In Email"/>
            </p>
            <p className="control">
                <a className="button is-info">
                    Add Email
                </a>
            </p>
        </AddEmailGroup>
    )
}

export default AddEmailField;
   
