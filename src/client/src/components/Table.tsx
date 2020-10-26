import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';
import {useTable} from 'react-table';

const columns = React.useMemo (
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
            resend: true
        },
        {
            status: false,
            email: 'abhishekp@h4i.com',
            resend: false
        },
        {
            status: true,
            email: 'mohamed@h4i.com',
            resend: false
        }
    ],
    []
)

const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
   } = useTable({ columns, data })

const Table: React.FC<Props> = (props) => {
    return(
        <table>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column =>(
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table;


