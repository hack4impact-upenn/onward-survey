import React from 'react';
import styled from 'styled-components';
import secureAxios from '../api/core/apiClient';
import auth from '../api/core/auth';

const AddEmailGroup = styled.div`
  padding-bottom: 34px;
  font-family: 'Montserrat';
  font-weight: 700;
`;

class AddEmail extends React.Component<{}, { emailInput: string }> {
  constructor(props: any) {
    super(props);
    this.state = { emailInput: '' };
  }

  handleChange(e: any) {
    this.setState({ emailInput: e.target.value });
  }

  handleClick() {
    secureAxios({
      url: '/api/users/create/employee',
      method: 'POST',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        firstName: 'firstName',
        lastName: 'lastName',
        email: this.state.emailInput,
      }),
    })
      .then((res) => alert('email added!'))
      .catch((err: Error) => console.log(err));
  }

  render() {
    return (
      <AddEmailGroup className="field is-grouped">
        <p className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Enter In Email"
            onChange={(e) => this.handleChange(e)}
          />
        </p>
        <p className="control">
          <a className="button is-info" onClick={() => this.handleClick()}>
            Add Email
          </a>
        </p>
      </AddEmailGroup>
    );
  }
}

export default AddEmail;
