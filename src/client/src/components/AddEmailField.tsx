import React from 'react';
import styled from 'styled-components';
import secureAxios from '../utils/apiClient';
import auth from '../utils/auth';

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
    const emails = this.state.emailInput.split(',').map((e) => e.trim());

    secureAxios({
      url: '/api/users/create/employee',
      method: 'POST',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ emails }),
    })
      .then(() => window.location.reload(true))
      .catch((err: Error) => alert(err.message));
  }

  render() {
    return (
      <AddEmailGroup className="field is-grouped">
        <p className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Enter in Emails, separated by commas (eg: john@doe.com, jane@doe.com)"
            onChange={(e) => this.handleChange(e)}
          />
        </p>
        <p className="control">
          <a className="button is-info" onClick={() => this.handleClick()}>
            Add Email(s)
          </a>
        </p>
      </AddEmailGroup>
    );
  }
}

export default AddEmail;
