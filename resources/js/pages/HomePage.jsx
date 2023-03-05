import React from 'react';
import useAuthStore from '../utils/store';
import { ContainerWrapper } from './../components/ContainerWrapper';
import { FoundationComponent } from './../components/HomeComponents/FoundationComponent';

const HomePage = () => {
  const { loggedIn, role } = useAuthStore();

  return (
    <React.Fragment>
      <ContainerWrapper>
        {/* Admin */}

        {/* Foundation */}
        <FoundationComponent />

        {/* User */}

      </ContainerWrapper>
    </React.Fragment >
  )
}

export default HomePage;