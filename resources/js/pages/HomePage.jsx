import React, { Fragment } from 'react';
import useAuthStore from '../utils/store';
import { ContainerWrapper } from './../components/ContainerWrapper';
import { FoundationComponent } from './../components/HomeComponents/FoundationComponent';
import { AdminComponent } from './../components/HomeComponents/AdminComponent';
import { UserComponent } from './../components/HomeComponents/UserComponent';

const HomePage = () => {
  const { loggedIn, role } = useAuthStore();


  return (
    <React.Fragment>
      <ContainerWrapper>
        {/* Admin */}
        {
          role == 'admin' ? <AdminComponent /> : <Fragment />
        }

        {/* Foundation */}
        {
          role == 'foundation' ? <FoundationComponent /> : <Fragment />
        }


      </ContainerWrapper>
    </React.Fragment >
  )
}

export default HomePage;