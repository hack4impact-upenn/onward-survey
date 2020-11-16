import React from 'react';
import styled from 'styled-components';

const SurveyButtonGroup = styled.form`

`;

const InputWrapper = styled.div`

`;

interface Props {};
const UploadCSV: React.FC<Props> = (props) => {
    return (
        <InputWrapper className="columns">
            <p className="control is-expanded">
                <input
                className="input"
                />
            </p>
            
            <SurveyButtonGroup className="column is-two-fifths">
                <button className="button is-primary ">Choose File</button>
                <button className="button is-primary ">Upload</button>
            </SurveyButtonGroup>
        </InputWrapper>
    ); 
}

export default UploadCSV;