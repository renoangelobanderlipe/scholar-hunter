import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CardActions, Button, Autocomplete, DialogContent, DialogTitle, Input, Chip, } from '@mui/material';
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
import { scholarshipList, scholarshipListPage } from '../config/apisauce';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { escapeRegExp } from 'lodash';

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
  const [scholarship, setScholarship] = React.useState([]);

  const handleOnChange = async (event, page) => {
    const res = await scholarshipListPage({ page });

    if (res.data.code == 200) {
      setScholarship(res.data.data.data);
    }
  }

  const handleScholarshipList = async () => {
    const res = await scholarshipList();

    if (res.data.code == 200) {
      setScholarship(res.data.data.data);
    }
  }

  const handleSearch = (value) => {
    let filteredRows = [...scholarship];
    if (value) {
      const searchRegex = new RegExp(escapeRegExp(scholarship), 'i');
      filteredRows = filteredRows.filter((row) => {
        // console.log('ats', { ...row });

        setScholarship(prev => [[...prev], { ...row }])
        console.log('test', row)
        // return Object.keys(row).some((value) => {
        //   return searchRegex.test(row[value]?.toString());
        // });
      });
    }
  }
  React.useEffect(() => {
    handleScholarshipList();
  }, [])


  return (
    <React.Fragment>
      <Box sx={{ p: '3rem 0' }}>

        <SerachbarComponent placeholder={'Search'} onChange={(value) => handleSearch(value)} />

        {/* <Search>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search> */}

      </Box>

      <Box sx={{ flexGrow: 1, p: '0 0 3rem 0' }}>
        <Grid container spacing={2}>

          {
            scholarship.map((element, index) => (
              <React.Fragment>
                <Grid item xs={6} key={index}>
                  <Card>
                    <CardContent>

                      <Grid
                        container item
                      // justifyContent="space-between"
                      >
                        <Grid container justifyContent={'space-between'}>
                          <Box display={'flex'}>
                            <Grid textAlign={'center'} justifyItems={'center'} justifyContent={'center'}>
                              <Typography>
                                {element.name}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Chip label={element.type} size="small" />
                            </Grid>
                          </Box>
                          <FileUplaodButton />
                        </Grid>

                        <CardActions>
                          {/* <Button variant="contained" endIcon={<AttachFileIcon />}>
                      Apply
                    </Button> */}
                        </CardActions>
                      </Grid>
                      <Grid container item sx={{ p: '1rem 0', mt: '0.5rem' }}>
                        <Typography variant="body2" color="text.primary">
                          {element.description}
                        </Typography>
                        <Typography color="text.secondary">
                          {element.address}
                        </Typography>

                        <Chip label={element.email} size="small" />

                        <Chip label={element.contact_no} size="small" />
                      </Grid>
                    </CardContent>

                  </Card>
                </Grid>
              </React.Fragment>
            ))
          }

        </Grid>


        <Stack spacing={2}>
          <Pagination
            count={scholarship.length}
            onChange={(event, value) => handleOnChange(event, value)}
            renderItem={(item) => (
              // console.log('test', item),
              < PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </Box>
    </React.Fragment>
  )
}

export default ScholarshipListPage;