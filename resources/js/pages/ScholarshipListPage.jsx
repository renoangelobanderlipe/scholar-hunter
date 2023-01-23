import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CardActions, Button, Autocomplete, DialogContent, DialogTitle, Input } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Search } from '@mui/icons-material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { DialogWrapper } from './../components/GenericComponents/DialogBox/DialogWrapper';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import SerachbarComponent from './../components/SerachbarComponent';

const container = {
  bgcolor: 'orange',
  // height: '83vh',
  // width: '92vw',
  borderRadius: '10px'
}


function FileUplaodButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Button variant="contained" endIcon={<AttachFileIcon />} onClick={handleClickOpen}>
        Apply
      </Button>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Upload FHE Form
      </Button> */}
      <DialogWrapper
        open={open}
        close={handleClose}>
        <DialogTitle>Upload FHE Form</DialogTitle>
        <DialogContent>
          {/* <input type="file" name="file" id="file" /> */}
          <FilePond allowMultiple={true} maxFiles={1} server="/upload" />
        </ DialogContent>
      </DialogWrapper>
    </React.Fragment>
  )
}

const ScholarshipListPage = () => {
  const handleOnChange = () => {

  }

  return (
    <React.Fragment>
      <Box sx={{ p: '3rem 0' }}>

        <SerachbarComponent placeholder={'Search'} onChange={(e) => handleOnChange()} />

        {/* <Search>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search> */}

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
                    {/* <Button variant="contained" endIcon={<AttachFileIcon />}>
                      Apply
                    </Button> */}
                    <FileUplaodButton />
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