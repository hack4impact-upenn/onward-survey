import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchEmployees } from '../api/userApi';
import auth from '../utils/auth';
import secureAxios from '../utils/apiClient';

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

  td#delete {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #00aade;
    padding-right: 5px;
    cursor: pointer;
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
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #d3d3d3;
    padding-right: 5px;
    cursor: default;
  }
`;

const Placeholder = styled.div`
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function getResendElement(entry: IEmployee) {
  return (
    <td
      id={entry.completed ? 'resendfalse' : 'resendtrue'}
      onClick={() => handleResend(entry)}
    >
      Resend Email
    </td>
  );
}

const handleResend = (entry: IEmployee) => {
  if (!entry.completed) {
    secureAxios({
      url: '/api/users/sendIndividualUrl',
      method: 'POST',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(entry),
    })
      .then(() => alert('Survey Resent!'))
      .catch((err: Error) => alert(err.message));
  }
};

function getDeleteElement(entry: IEmployee, func: () => void) {
  return (
    <td id="delete" onClick={() => handleDelete(entry, func)}>
      Delete Email
    </td>
  );
}

const handleDelete = (entry: IEmployee, func: () => void) => {
  secureAxios({
    url: '/api/users/delete/employee',
    method: 'DELETE',
    timeout: 0,
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(entry),
  })
    .then(() => func())
    .catch((err: Error) => alert(err.message));
};

interface IEmployee {
  _id: string;
  email: string;
  completed: boolean;
}
interface IEmployeeS extends IAPIResponse {
  data: {
    employees: IEmployee[];
  };
}

const ManageSurveyTable: React.FC<any> = () => {
  const employeeQuery = useQuery(
    ['fetchEmployees', { accessToken: auth.getAccessToken() }],
    fetchEmployees
  );

  const TableBody = (res: IEmployeeS) => {
    const { data: employees } = res;
    const employeesList: any = employees;

    if (employeesList.length < 1) {
      return (
        <Placeholder>
          <p className="subtitle is-5">
            Oops... You haven't added any employees yet. Try entering a few
            emails or upload a CSV.
          </p>
        </Placeholder>
      );
    }

    return (
      <Table>
        <thead>
          <tr>
            <th id="status">Status</th>
            <th id="email">Email</th>
            <th id="delete">Delete Email</th>
            <th id="resend">Resend Email</th>
          </tr>
        </thead>
        <tbody>
          {employeesList.map((entry: any) => (
            <tr key={entry._id}>
              <td id="checkmark">
                {entry.completed ? (
                  <img src="/images/checkmark.png" alt="checkmark"></img>
                ) : (
                  <p></p>
                )}
              </td>
              <td id="email">{entry.email}</td>
              {getDeleteElement(entry, employeeQuery.refetch)}
              {getResendElement(entry)}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      {employeeQuery.isLoading ? (
        <div>Loading...</div>
      ) : (
        employeeQuery.data && TableBody(employeeQuery.data as any)
      )}
    </div>
  );
};

export default ManageSurveyTable;
