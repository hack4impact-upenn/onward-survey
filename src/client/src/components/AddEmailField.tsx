import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';

interface Props {}
const AddEmailField: React.FC<Props> = (props) => {
    return(
        <form>
            <label>
                <input type="text" name="email" />
            </label>
            <input type="add_email" value="Add Email" />
        </form>
    )
}

export default AddEmailField;
   
