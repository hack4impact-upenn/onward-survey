import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../api/core/auth';

const TableContainer = styled.div`
  margin: 10vh auto;
`;

const Table = styled.table`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  border: 1.2px solid #878787;
  display: table;
  width: 896px;
  border-collapse: separate;
  border-spacing: 0px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-family: 'Montserrat';

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

  th#status {
    padding-left: 20px;
  }

  th#email {
    text-align: left;
    align-items: left;
    padding-left: 60px;
  }

  th#resend {
    padding-right: 5px;
  }

  td {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
  }

  td#checkmark {
    position: relative;
    top: 4px;
    padding-left: 20px;
  }

  td#email {
    width: 70%;
    text-align: left;
    padding-left: 60px;
  }

  td#resendtrue {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #00aade;
    padding-right: 5px;
    cursor: pointer;
  }

  td#resendfalse {
    padding-right: 5px;
    cursor: pointer;
  }
`;

const data = [
  {
    _id: 1,
    status: true,
    email: 'daniel.tian@hack4impact.org',
  },
  {
    _id: 2,
    status: false,
    email: 'grace.jiang@hack4impact.org',
  },
  {
    _id: 3,
    status: true,
    email: 'hello.world@gmail.com',
  },
  {
    _id: 4,
    status: true,
    email: 'abhishekanderic@hack4impact.org',
  },
  {
    _id: 5,
    status: true,
    email: 'daniel.tian@hack4impact.org',
  },
  {
    _id: 6,
    status: false,
    email: 'grace.jiang@hack4impact.org',
  },
];

function getResendElement(status: boolean) {
  return (
    <td
      id={status ? 'resendfalse' : 'resendtrue'}
      onClick={() => alert('Email resent!')}
    >
      Resend Email
    </td>
  );
}

interface Props {}
const ManageSurveyTable: React.FC<Props> = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th id="status">Status</th>
          <th id="email">Email</th>
          <th id="resend">Resend Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr key={entry._id}>
            <td id="checkmark">
              {entry.status ? (
                <img src="/images/checkmark.png" alt="checkmark"></img>
              ) : (
                <p></p>
              )}
            </td>
            <td id="email">{entry.email}</td>
            {getResendElement(entry.status)}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ManageSurveyTable;
