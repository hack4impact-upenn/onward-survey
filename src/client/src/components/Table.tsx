import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';
import checkmark from '../assets/checkmark.png';

const TableContainer = styled.div`
  margin: 10vh auto;
`;

const Table = styled.table`
    border: 1.2px solid #878787;
    border-radius: 1px;
    display: table;
    width: 896px;
    border-collapse: separate;
    border-spacing: 0px 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    
    th {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        padding-bottom: 20px;
        border-bottom: 1.2px solid #878787;

        align-items: center;
        text-align: center;
        color: #000000;
    }

    th#email {
        text-align: left; 
        align-items: left;
        padding-left: 80px;
    }

    td {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
    }
    
    td#checkmark {
        position: relative;
        top: 4px;
    }

    td#email {
        width: 70%;
        text-align: left;
        padding-left: 80px;
    }

    td#resendtrue{
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #00AADE;
    }
`;

const data =
    [
        {
            status: true,
            email: 'daniel.tian@hack4impact.org',
        },
        {
            status: false,
            email: 'grace.jiang@hack4impact.org',
        },
        {
            status: true,
            email: 'hello.world@gmail.com',
        },
        {
            status: true,
            email: 'abhishekanderic@hack4impact.org',
        }
    ]

function getResendElement(status : boolean) {
    if (status) {
        return <td>Resend Email</td>
    } else {
        return <td id="resendtrue">Resend Email</td>
    }
}

interface Props {}
const ManageSurveyTable: React.FC<Props> = (props) => {
    return(
        <Table>
            <thead>
                <tr>
                    <th>Status</th>
                    <th id="email">Email</th>
                    <th>Resend Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry) => 
                    <tr>
                        <td id="checkmark">{entry.status?<img src={checkmark} alt="checkmark"></img>:<p></p>}</td>
                        <td id="email">{entry.email}</td>
                        {getResendElement(entry.status)}
                    </tr>
                )}
            </tbody> 
        </Table>
    )
}

export default ManageSurveyTable;