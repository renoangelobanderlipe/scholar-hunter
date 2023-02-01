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
import { minHeight } from '@mui/system';
import { validateUser } from './../config/apisauce';
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
      <Button variant="contained" size="small" endIcon={<AttachFileIcon />} onClick={handleClickOpen}>
        Apply
      </Button>
      <DialogWrapper
        open={open}
        close={handleClose}>
        <DialogTitle>Upload FHE Form</DialogTitle>
        <DialogContent>
          <FilePond allowMultiple={true} maxFiles={1} server="/upload" />
        </ DialogContent>
      </DialogWrapper>
    </React.Fragment>
  )
}

const ScholarshipListPage = () => {
  const [scholarship, setScholarship] = React.useState([]);
  const [role, setRole] = React.useState();

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

  const fetchUserRole = async () => {
    const res = await validateUser();

    if (res.data.code == 200) {
      setRole(res.data.data);
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
    fetchUserRole();
    handleScholarshipList();
  }, [])

  return (
    <React.Fragment>
      <Grid container>
        <Box width={"100%"} sx={{ mb: '2.5rem ' }}>
          <SerachbarComponent placeholder={'Search'} onChange={(value) => handleSearch(value)} />
        </Box>

        <Grid container spacing={4}>
          {
            scholarship.map((element, index) => (
              <React.Fragment>
                <Grid item xs={4} key={index}>
                  <CardContent
                    sx={{
                      bgcolor: '#fafafa',
                      boxShadow: 1,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      p: 2,
                      minWidth: 300,
                      minHeight: 200
                    }}>
                    <Grid container item >
                      <Grid container justifyContent={'space-between'} sx={{ mb: '0.5rem' }}>
                        <Box sx={{ color: 'text.primary', fontSize: 14, fontWeight: 'bold' }}>
                          {element.name}
                        </Box>
                        <Chip label={element.type} size={'small'} />
                      </Grid>
                      <Box sx={{ color: 'text.secondary', fontSize: 12, mb: '1rem' }}>{element.address}</Box>
                    </Grid>
                    <Box sx={{ color: 'text.secondary', fontSize: 12, mb: '0.5rem' }}>{element.description}</Box>

                    <Grid container mb="0.5rem">
                      <Grid mr="0.5rem">
                        <Chip label={element.contact_no} sx={{ fontWeight: 'medium' }} size={'small'} />
                      </Grid>
                      <Grid>
                        <Chip label={element.email} sx={{ fontWeight: 'medium' }} size={'small'} />
                      </Grid>
                    </Grid>
                    <CardActions sx={{ justifyContent: "end" }}>
                      {role != 'admin' || role != 'foundation' ? <FileUplaodButton /> : ''}
                    </CardActions>
                  </CardContent>
                </Grid>
              </React.Fragment>
            ))
          }


        </Grid>

        <Grid container item p="4rem 0" justifyContent={'end'} >
          <Pagination
            count={scholarship.length}
            onChange={(event, value) => handleOnChange(event, value)}
            renderItem={(item) => (
              < PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Grid>

      </Grid>


    </React.Fragment >
  )
}

export default ScholarshipListPage;