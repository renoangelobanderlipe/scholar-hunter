import React, { useState, useEffect, Fragment } from 'react';
import { foundationCount, scholarsCount, userStatus } from './../utils/apisauce';
import { Grid, Card, Box, CardContent, Typography, IconButton } from '@mui/material';
import useAuthStore from '../utils/store';
import { CardComponent } from './../components/CardComponent';

const HomePage = () => {
  const [foundationPrivate, setPrivate] = useState(0);
  const [foundationPublic, setPublic] = useState(0);
  const [active, setActive] = useState(0);
  const [inactive, setInActive] = useState(0);
  const [applied, setApplied] = useState(0);
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);

  const { loggedIn, role } = useAuthStore();


  const handleFoundationPublic = async () => {
    const res = await foundationCount({ type: 'public' });

    if (res.data.code == 200) {
      setPublic(res.data?.data);
    }
  }
  const handleFoundationPrivate = async () => {
    const res = await foundationCount({ type: 'private' });

    if (res.data.code == 200) {
      setPrivate(res.data?.data);
    }
  }

  const handleActiveScholars = async () => {
    const res = await scholarsCount({ type: 'active' });
    if (res.data.code == 200) {
      setActive(res.data?.data);
    }
  }

  const handleInActiveScholars = async () => {
    const res = await scholarsCount({ type: 'inactive' });
    if (res.data.code == 200) {
      setInActive(res.data?.data);
    }
  }

  const handleApplied = async () => {
    const res = await userStatus({ type: 'applied' });

    if (re.data.code == 200) {
      setApplied(res.data?.data);
    }
  }
  const handlePending = async () => {
    const res = await userStatus({ type: 'pending' });

    if (re.data.code == 200) {
      setPending(res.data?.data);
    }
  }
  const handleApproved = async () => {
    const res = await userStatus({ type: 'approved' });

    if (re.data.code == 200) {
      setApproved(res.data?.data);
    }
  }

  React.useEffect(() => {
    if (role != 'user') {
      handleFoundationPublic();
      handleFoundationPrivate();
      handleActiveScholars();
      handleInActiveScholars();
    } else if (role == 'foundation') {
      handleApplied();
      handlePending();
      handleApproved();
    } else {
      console.log('User')
    }
  }, []);
  return (
    <React.Fragment>
      <Grid container p={4} backgroundColor="#ECEFF1">
        <Grid container item backgroundColor="#263238" sx={{ minHeight: '80vh', borderRadius: '10px', p: '2rem' }}>
          {
            role == 'admin' ? (
              <Fragment>
                <CardComponent
                  title={'Private Foundation'}
                  content={foundationPrivate}
                />

                <CardComponent
                  title={'Public Foundation'}
                  content={foundationPublic}
                />

                <CardComponent
                  title={'Approved Users'}
                  content={pending}
                />

                <CardComponent
                  title={'Pending Users'}
                  content={approved}
                />
              </Fragment>
            ) : role == 'foundation' ? (
              <Fragment>
                Foundation
              </Fragment>
            ) : role == 'user' ?
              <Fragment>
                <CardComponent
                  title={'Pending Applications'}
                  content={approved}
                />
                <CardComponent
                  title={'Rejected Applications'}
                  content={approved}
                />

                <CardComponent
                  title={'Application Status'}
                  content={approved}
                />

                <CardComponent
                  title={'Applied Scholarships'}
                  content={approved}
                />
              </Fragment> : <Fragment />
          }
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default HomePage;