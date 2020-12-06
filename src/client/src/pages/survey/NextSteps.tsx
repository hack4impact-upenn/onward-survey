import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  margin: 10vh auto;
  width: 80vw;
  text-align: center;
`;

const Button = styled.button`
  margin: 15% auto;
  min-width: 200px;
`;

const NextSteps = () => {
  return (
    <ContentContainer>
      <div className="columns is-mobile is-centered is-vcentered">
        <div className="column is-one-third">
          <h1 className="title is-3">Thank you for filling out our survey!</h1>
          <Button className="button is-info is-size-10-desktop is-fullwidth">
            Learn More About Onward
          </Button>
        </div>
        <div className="column is-one-third">
          <img src="/images/standing-5@2x.png" alt="Standing Man" />
        </div>
      </div>
    </ContentContainer>
  );
};

export default NextSteps;
