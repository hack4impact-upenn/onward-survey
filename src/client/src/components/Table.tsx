import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';

const columns = React.useMemo(
    () => [
        {
            Header: 'Status',
            accessor: 'status'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Resend Email',
            accessor: 'resend'
        }
    ],
    []
)

const data = React.useMemo(() =>
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
    ],
    []
)
interface Props {}
const Table: React.FC<Props> = (props) => {
    return(
        <table>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Email</th>
                    <th>Resend Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map(entry => {
                    <tr>
                        <td>{entry.status}</td>
                        <td>{entry.email}</td>
                        <td>Resend email</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default Table;
   
