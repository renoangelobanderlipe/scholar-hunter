import React from 'react';
import { foundationCount, scholarsCount, userStatus } from './../utils/apisauce';
import { Grid, Card, Box } from '@mui/material';
import useAuthStore from '../utils/store';

const HomePage = () => {
  const [foundationPrivate, setPrivate] = React.useState(0);
  const [foundationPublic, setPublic] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [inactive, setInActive] = React.useState(0);
  const [applied, setApplied] = React.useState(0);
  const [pending, setPending] = React.useState(0);
  const [approved, setApproved] = React.useState(0);

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
    } else {
      handleApplied();
      handlePending();
      handleApproved();
    }
  }, []);
  return (
    <React.Fragment>
      <Grid container p={4} backgroundColor="#c8e6c9">
        <Grid container item backgroundColor="#fff" sx={{ minHeight: '80vh', borderRadius: '10px' }}>
          
          <Grid container spacing={2} p={2}>
            {role != 'user' ? (<React.Fragment>
              <Grid item xs={4} >
                Foundation Public {foundationPublic}
              </Grid>
              <Grid item xs={4} >
                Foundation Private {foundationPrivate}
              </Grid>
              <Grid item xs={4} >
                Scholars ACtive {active}
              </Grid>
              <Grid item xs={4} >
                Scholars Inactive {inactive}
              </Grid>
            </React.Fragment>)
              :
              (<React.Fragment>

                <Grid item xs={4} >
                  <Card
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                      width: 320,
                      gap: 2,
                      '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                      height: "30vh"
                    }}
                  >
                    <Grid item backgroundColor="orange" height={'100%'}>
                      <Grid item sx={{ dispaly: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        Applied Scholarships {applied}
                      </Grid>
                    </Grid>
                  </Card>

                </Grid>
                <Grid item xs={4} >
                  Pending Scholarships {pending}
                </Grid>
                <Grid item xs={4} >
                  Approved Scholarships {approved}
                </Grid>
              </React.Fragment>)}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default HomePage;