import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';
import checkmark from '../assets/checkmark.png'
import '../styles/manage_survey.css';

const data =
    [
        {
            status: true,
            email: 'ericchen@h4i.com',
        },
        {
            status: false,
            email: 'abhishekp@h4i.com',
        },
        {
            status: true,
            email: 'mohamed@h4i.com',
        }
    ]

interface Props {}
const Table: React.FC<Props> = (props) => {
    return(
        <table>
            <thead>
                <tr>
                    <th id='status'>Status</th>
                    <th id='email'>Email</th>
                    <th id='resendemail'>Resend Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry) => 
                    <tr>
                        <td>{entry.status?<img src={checkmark} alt="checkmark"></img>:<p></p>}</td>
                        <td id='email'>{entry.email}</td>
                        <td>Resend email</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table;
   
