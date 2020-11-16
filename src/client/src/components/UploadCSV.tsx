import React from 'react';
import styled from 'styled-components';

const SurveyButtonGroup = styled.form`

`;

const InputWrapper = styled.div`
display: flex;
align-items: center;
margin-bottom: 25px;
justify-content: space-between;
`;

interface Props {};
const UploadCSV: React.FC<Props> = (props) => {
    return (
        <InputWrapper >
               
         
            <div className="file has-name is-fullwidth flex-Item">
  <label className="file-label">
    <input className="file-input" type="file" name="resume" />
    <span className="file-cta">
      <span className="file-icon">
        <i className="fas fa-upload"></i>
      </span>
      <span className="file-label">
        Choose a file…
      </span>
    </span>
    <span className="file-name">
      Screen Shot 2017-07-29 at 15.54.25.png
    </span>
  </label>
</div>
                <button className="button is-primary flex-Item ">Upload</button>
           
        </InputWrapper>
    ); 
}

export default UploadCSV;