import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';
import {useTable} from 'react-table';

const columns = React.useMemo {
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
    ]
}


