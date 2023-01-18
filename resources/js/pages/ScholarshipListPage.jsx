import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Search } from '@mui/icons-material';

const container = {
  bgcolor: 'orange',
  // height: '83vh',
  // width: '92vw',

  borderRadius: '10px'
}


const ScholarshipListPage = () => {
  return (
    <React.Fragment>
      <Box sx={{ p: '3rem 0' }}>
        <Search>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

      </Box>

      <Box sx={{ flexGrow: 1, p: '0 0 3rem 0' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card elevation={4}>
              <CardContent>
                <Grid
                  container
                  // backgroundColor="orange"
                  justifyContent="space-between"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    DepEd
                  </Typography>
                  <CardActions>
                    <Button variant="contained" endIcon={<AttachFileIcon />}>
                      Apply
                    </Button>
                  </CardActions>
                </Grid>
                <Grid container item sx={{ p: '1rem 0', mt: '0.5rem' }}>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card elevation={4}>
              <CardContent>
                <Grid
                  container
                  // backgroundColor="orange"
                  justifyContent="space-between"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    DepEd
                  </Typography>
                  <CardActions>
                    <Button variant="contained" endIcon={<AttachFileIcon />}>
                      Apply
                    </Button>
                  </CardActions>
                </Grid>
                <Grid container item sx={{ p: '1rem 0', mt: '0.5rem' }}>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card elevation={4}>
              <CardContent>
                <Grid
                  container
                  // backgroundColor="orange"
                  justifyContent="space-between"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    DepEd
                  </Typography>
                  <CardActions>
                    <Button variant="contained" endIcon={<AttachFileIcon />}>
                      Apply
                    </Button>
                  </CardActions>
                </Grid>
                <Grid container item sx={{ p: '1rem 0', mt: '0.5rem' }}>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card elevation={4}>
              <CardContent>
                <Grid
                  container
                  // backgroundColor="orange"
                  justifyContent="space-between"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    DepEd
                  </Typography>
                  <CardActions>
                    <Button variant="contained" endIcon={<AttachFileIcon />}>
                      Apply
                    </Button>
                  </CardActions>
                </Grid>
                <Grid container item sx={{ p: '1rem 0', mt: '0.5rem' }}>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card elevation={4}>
              <CardContent>
                <Grid
                  container
                  // backgroundColor="orange"
                  justifyContent="space-between"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    DepEd
                  </Typography>
                  <CardActions>
                    <Button variant="contained" endIcon={<AttachFileIcon />}>
                      Apply
                    </Button>
                  </CardActions>
                </Grid>
                <Grid container item sx={{ p: '1rem 0', mt: '0.5rem' }}>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card elevation={4}>
              <CardContent>
                <Grid
                  container
                  // backgroundColor="orange"
                  justifyContent="space-between"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    DepEd
                  </Typography>
                  <CardActions>
                    <Button variant="contained" endIcon={<AttachFileIcon />}>
                      Apply
                    </Button>
                  </CardActions>
                </Grid>
                <Grid container item sx={{ p: '1rem 0', mt: '0.5rem' }}>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card elevation={4}>
              <CardContent>
                <Grid
                  container
                  // backgroundColor="orange"
                  justifyContent="space-between"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    DepEd
                  </Typography>
                  <CardActions>
                    <Button variant="contained" endIcon={<AttachFileIcon />}>
                      Apply
                    </Button>
                  </CardActions>
                </Grid>
                <Grid container item sx={{ p: '1rem 0', mt: '0.5rem' }}>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card elevation={4}>
              <CardContent>
                <Grid
                  container
                  // backgroundColor="orange"
                  justifyContent="space-between"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    DepEd
                  </Typography>
                  <CardActions>
                    <Button variant="contained" endIcon={<AttachFileIcon />}>
                      Apply
                    </Button>
                  </CardActions>
                </Grid>
                <Grid container item sx={{ p: '1rem 0', mt: '0.5rem' }}>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>


        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default ScholarshipListPage;