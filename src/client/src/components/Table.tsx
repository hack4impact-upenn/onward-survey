import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';
import checkmark from '../assets/checkmark.png';
//import '../styles/manage_survey.css';

const TableContainer = styled.div`
  margin: 10vh auto;
`;

const Table = styled.table`
    border: 1.2px solid #878787;
    border-radius: 10px;
    margin: 1em;
    display: table;
    width: 896px;
    height: 357px;
    left: 272px;
    top: 518px;

    th {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1.2px solid #878787;

        align-items: center;
        text-align: center;
        color: #000000;
    }

    th#email {
        text-align: left; 
        align-items: left;
        padding-left: 10%;
    }

    td#email {
        width: 70%;
        text-align: left;
        padding-left: 10%;
    }
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
                            <td>{entry.status?<img src={checkmark} alt="checkmark"></img>:<p></p>}</td>
                            <td id="email">{entry.email}</td>
                            <td>Resend Email</td>
                        </tr>
                    )}
                </tbody> 
            </Table>
    )
}

/*
<div className="table-container">
            <table className="table is-hoverable is-fullwidth is-rounded">
                <thead>
                    <tr>
                        <th className="is-bordered">Status</th>
                        <th id='email'>Email</th>
                        <th id='resendemail'>Resend Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => 
                        <tr>
                            <td>{entry.status?<img src={checkmark} alt="checkmark"></img>:<p></p>}</td>
                            <td>{entry.email}</td>
                            <td>Resend email</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
*/

export default ManageSurveyTable;