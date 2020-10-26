import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';

const TableContainer = styled.div`
    position: absolute;
    width: 896px;
    height: 357px;
    left: 272px;
    top: 518px;

    background: #FFFFFF;
    border: 1.2px solid #878787;
    box-sizing: border-box;
    border-radius: 10px;
`;

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
        <TableContainer>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Email</th>
                        <th>Resend Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => 
                        <tr>
                            <td>{entry.status?'<img src="checkmark.png" alt="checkmark">':'<p></p>'}</td>
                            <td>{entry.email}</td>
                            <td>Resend email</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </TableContainer>
    )
}

export default Table;
   
