import React from 'react';
import { checkRoleUpdate } from '../utils/apisauce';

export const UnauthorizedPage = () => {
  const validateRole = async () => {
    const res = await checkRoleUpdate();
  }

  React.useEffect(() => {
    validateRole();
  }, []);

  return (
    <React.Fragment>
      Please wait for SAS approval....
    </React.Fragment>
  );
}