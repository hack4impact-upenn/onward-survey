import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchEmployees } from '../api/userApi';
import auth from '../utils/auth';
import secureAxios from '../utils/apiClient';
import { useState } from 'react';

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
    padding-right: 5px;
    cursor: pointer;
  }
`;

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

function getDeleteElement(entry: IEmployee) {
  return (
    <td
    id = "delete"  
    onClick = {() => handleDelete(entry)}
    >
      Delete Email
    </td>
  );
}

const handleDelete = (entry: IEmployee) => {
  secureAxios({
    url: '/api/employees/delete/employee',
    method: 'DELETE',
    timeout: 0,
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
      'Content-Type': 'application/json',
      
    },
    data: JSON.stringify(entry),
  })
    .then((res) => alert('Email deleted!'))
    .catch((err: Error) => alert(err.message));

}

interface IEmployee {
  _id: string;
  email: string;
  status: boolean;
}
interface IEmployeeS extends IAPIResponse {
  data: {
    employees: IEmployee[];
  };
}

const ManageSurveyTable: React.FC<any> = () => {
  const employeeQuery = useQuery(
    ['fetchEmployees', { accessToken: auth.getAccessToken() }],
    fetchEmployees,
    {
      refetchOnWindowFocus: false,
    }
  );
  const TableBody = (res: IEmployeeS) => {
    const { data: employees } = res;
    const employeesList: any = employees;
    // const [employeesList, setEmployeesList] = useState(employees.employees);
    // const handleEmployeesListChange = (newList: any) => {
    //   setEmployeesList(newList)
    // }
    // handleEmployeesListChange(employees);
    return (
      <>
        {employeesList.map((entry: any) => (
          <tr key={entry._id}>
            <td id="checkmark">
              {entry.status ? (
                <img src="/images/checkmark.png" alt="checkmark"></img>
              ) : (
                <p></p>
              )}
            </td>
            <td id="email">{entry.email}</td>  
            {getDeleteElement(entry._id)}
            {getResendElement(entry.status)}
          </tr>
        ))}
      </>
    );
  };

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
        {employeeQuery.isLoading && <div>Loading...</div>}
        {employeeQuery.data && TableBody(employeeQuery.data as any)}
      </tbody>
    </Table>
  );
};

export default ManageSurveyTable;

// class ManageSurveyTable extends React.Component<{}, { employees: IEmployee[] }> {
//   constructor(props: any) {
//     super(props);
//     this.state = { employees: [] };
//   }

//    handleDelete = (entry: IEmployee) => {
//     // secureAxios({
//     //   url: '/api/users/delete/employee',
//     //   method: 'DELETE',
//     //   timeout: 0,
//     //   headers: {
//     //     Authorization: `Bearer ${auth.getAccessToken()}`,
//     //     'Content-Type': 'application/json',
//     //   },
//     //   data: JSON.stringify(entry),
//     // })
//     //   .then((res) => alert('Email deleted!'))
//     //   .catch((err: Error) => alert(err.message));
//     this.setState({employees: this.state.employees.filter(employee => employee != entry)});
//   }

//   TableBody = ( 
//       (
//           <>
//             {this.state.employees.map((entry: any) => (
//               <tr key={entry._id}>
//                 <td id="checkmark">
//                   {entry.status ? (
//                     <img src="/images/checkmark.png" alt="checkmark"></img>
//                   ) : (
//                     <p></p>
//                   )}
//                 </td>
//                 <td id="email">{entry.email}</td>  
//                 <td
//                   id = "delete"  
//                   onClick = {() => this.handleDelete(entry)}
//                 >
//                   Delete Email
//                 </td>
//                 {getResendElement(entry.status)}
//               </tr>
//             ))}
//           </>
//              ))

//   render() {
//   return (
//     <Table>
//       <thead>
//         <tr>
//           <th id="status">Status</th>
//           <th id="email">Email</th>
//           <th id="delete">Delete Email</th>
//           <th id="resend">Resend Email</th>
//         </tr>
//       </thead>
//       <tbody>
//         TableBody
//       </tbody>
//     </Table>
//   );
// };
//   }


// export default ManageSurveyTable;