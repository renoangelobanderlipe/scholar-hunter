import React from 'react';
import { roleListener } from '../utils/apisauce';
import useAuthStore from './../config/store';

export const UnauthorizedPage = () => {
  // const [status, setRoleStatus] = React.useState('pending');
  // const { setStatus } = useAuthStore();

  // const validateRole = async () => {
  //   const res = await roleListener();

  //   if (res.data.code == 200) {
  //     setRoleStatus(res.data.data);
  //     console.log(res.data.data);
  //     // setStatus(res.data.data);
  //   }
  // }

  // React.useEffect(() => {
  //   validateRole();
  // }, []);

  return (
    <React.Fragment>
      Please wait for SAS approval....
    </React.Fragment>
  );
}