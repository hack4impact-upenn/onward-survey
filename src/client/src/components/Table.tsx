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

const StatusHeader = styled.div`
position: absolute;
width: 53px;
height: 20px;
left: 316px;
top: 538px;

font-family: Montserrat;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 20px;
/* identical to box height */

display: flex;
align-items: center;
text-align: center;

color: #000000;
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
                        <StatusHeader>Status</StatusHeader>
                        <th>Email</th>
                        <th>Resend Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => 
                        <tr>
                            <td>{entry.status.toString()}</td>
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
   
