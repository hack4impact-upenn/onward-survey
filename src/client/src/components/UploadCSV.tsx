import React, { useState } from 'react';
import styled from 'styled-components';
import secureAxios from '../utils/apiClient';
import auth from '../utils/auth';

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  justify-content: space-between;
`;

interface Props {}
const UploadCSV: React.FC<Props> = (props) => {
  const [file, setFile] = useState<any>({ name: 'No File Selected' });
  const handleChange = (event: any) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
   const data = new FormData()
   data.append('file[]', file)
   console.log(data)
    secureAxios({
      url: '/api/users/uploadCSV',
      method: 'POST',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      data,
    })
      .then((res) => alert('emails uploaded'))
      .catch((err: Error) => alert(err.message));
  };

  return (
    <>
      <p style={{ textAlign: 'start', marginBottom: '10px' }}>
        {' '}
        Upload a CSV file to read emails
      </p>
      <InputWrapper>
        <div className="file has-name is-fullwidth flex-Item">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="resume"
              onChange={handleChange}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
            <span className="file-name">{file.name}</span>
          </label>
        </div>
        <button className="button is-primary flex-Item" onClick={handleUpload}>
          Upload
        </button>
      </InputWrapper>
    </>
  );
};

export default UploadCSV;
