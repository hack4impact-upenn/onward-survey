import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

const ContentContainer = styled.div`
  margin: 10vh auto;
  width: 80vw;
`;
const ButtonGroup = styled.div`
  margin: 40px auto 0px;
`;

const Button = styled.button`
  width: 40%;
  min-width: 90px;
  margin: 0px 20px 10px auto;
`;

interface ParamTypes {
  employerId: string;
  employeeId: string;
}

const Expired = () => {
  document.title = 'Onward | Expired Survey';
  const history = useHistory();

  return (
    <ContentContainer>
      <div className="columns is-mobile is-centered is-vcentered">
        <div className="column is-one-third">
          <img src="../../images/standing-3@2x.png" alt="Standing Person" />
        </div>
        <div className="column has-text-left is-one-third">
          <h1 className="title is-3"> Onward Financial Survey </h1>
          <p>You've already completed the survey!</p>
          <br />
          <ButtonGroup>
            <Button
              className="button is-secondary is-light"
              onClick={() => history.push('/')}
            >
              Home Page
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </ContentContainer>
  );
};

export default Expired;
