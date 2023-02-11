import React from 'react';
import { foundationCount, scholarsCount } from './../utils/apisauce';
import { Grid } from '@mui/material';

const HomePage = () => {
  const [foundationPrivate, setPrivate] = React.useState(0);
  const [foundationPublic, setPublic] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [inactive, setInActive] = React.useState(0);

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

  React.useEffect(() => {
    handleFoundationPublic();
    handleFoundationPrivate();
    handleActiveScholars();
    handleInActiveScholars();
  }, []);
  return (
    <React.Fragment>
      <Grid container spacing={2}>
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
      </Grid>
    </React.Fragment>
  )
}

export default HomePage;