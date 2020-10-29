import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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

const Welcome = () => {
    const history = useHistory();

    return (
      <ContentContainer>
        <div className="columns is-mobile is-centered is-vcentered">
          <div className="column is-one-third">
            <img src="../../images/standing-3@2x.png" alt="Standing Person"/>
            </div>
            <div className="column has-text-left is-one-third">
              <h1 className="title is-3"> Onward Financial Survey </h1>
              <p>
                Your employer, <b>Employer Name</b>, has requested that you fill out this anonymous survey to learn
                more about the company's financial status.
              </p>
              <br />
              <p>
                Your responses to this survey will be kept anonymous, and your employer will not be able to view any
                individual data - only the company statistics as a whole.
              </p>
              <ButtonGroup>
                <Button
                  className="button is-secondary is-light"
                  onClick={() => history.back()}
                >
                  Learn More
                </Button>
                <Button
                  className="button is-primary"
                  onClick={() => history.push("/survey/questions")}
                >
                  Get Started
                </Button>
              </ButtonGroup>
          </div>
        </div>
      </ContentContainer>

    )
}

export default Welcome;