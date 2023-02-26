import React from 'react';
import { Grid, Box, Dialog, Pagination, PaginationItem, CardContent, Chip, CardActions, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { handleSearch, scholarshipList } from '../utils/apisauce';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { useFormik } from 'formik';
import { submitScholarship } from './../utils/apisauce';
import { useSnackbar } from 'notistack';
import { SearchOutlined } from '@mui/icons-material';
import useAuthStore from './../utils/store';

const SerachbarComponent = ({ scholarship, lastPage }) => {

  const searchFormik = useFormik({
    initialValues: {
      keyword: ''
    }
  })

  const handleOnChange = (val) => {
    searchFormik.setFieldValue('keyword', val)
  }

  const handleOnSubmit = async () => {
    const keyword = searchFormik.values.keyword;
    const res = await handleSearch({ keyword });

    if (res.data.code == 200) {
      scholarship(res.data?.data?.data)
      // lastPage(res.data.data.last_page)
    }
  }

  return (
    <React.Fragment>
      <Grid container backgroundColor="#fff" sx={{ borderRadius: '10px', border: 'none' }}>
        <TextField
          size='medium'
          sx={{ width: '100%' }}
          label={'Foundation Name'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleOnSubmit}
                  edge="end"
                >
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            )
          }}
          onChange={(event) => handleOnChange(event.currentTarget.value)}
        />
      </Grid>
    </React.Fragment>
  );
}

const FileUplaodButton = ({ handleId, foundationId }) => {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('id', handleId);
    formData.append('foundation_id', foundationId);

    const res = await submitScholarship(formData);

    if (res.data.code == 200) {
      enqueueSnackbar(res.data.data.message, { variant: 'success' })
      handleClose();
    } else {
      enqueueSnackbar(res.data.errors.file[0], { variant: 'warning' })
    }
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="small"
        endIcon={<AttachFileIcon />}
        onClick={handleClickOpen}
      >Apply</Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}>

        <DialogTitle>Upload FHE Form</DialogTitle>
        <DialogContent>
          <FilePond allowMultiple={true} maxFiles={1} onupdatefiles={(files) => {
            files.map((element, index) => setFile(element.file));
          }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}


const ScholarshipListing = () => {
  const [scholarship, setScholarship] = React.useState([]);
  const [lastPage, setLastPage] = React.useState(0);

  const handleList = async () => {
    const res = await scholarshipList();

    if (res.data.code == 200) {
      setScholarship(res.data?.data?.data);
      setLastPage(res.data.data.last_page);
    }
  }

  const handleOnChange = async (value) => {
    const res = await scholarshipList({ page: value });

    setScholarship(res.data.data.data);
  }


  React.useEffect(() => {
    handleList();
    handleOnChange()
  }, []);

  const { role } = useAuthStore();

  return (
    <React.Fragment>
      <Grid container px={4} backgroundColor="#c8e6c9">
        <Grid container item py={4} >
          <Grid container item sx={{ borderRadius: '10px' }}>
            <SerachbarComponent scholarship={setScholarship} lastPage={setLastPage} />
          </Grid>
        </Grid>
        <Grid container item backgroundColor="#fff" sx={{ height: '65vh', borderRadius: '10px' }}>

          <Grid container sx={{ maxHeight: "100%", overflow: 'auto' }} spacing={4} px={6} py={4}>

            {
              scholarship.length > 0 ? (scholarship.map((element, index) =>
                <Grid item xs={4} key={index}>
                  <CardContent
                    sx={{
                      bgcolor: '#fafafa',
                      boxShadow: 1,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      p: 2,
                      minWidth: 300,
                      minHeight: 200,
                      alignItems: 'center'
                    }}>
                    <Grid container item >
                      <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{ mb: '1.5rem' }}>
                        <Box sx={{ color: 'text.primary', fontSize: 16, fontWeight: 'bold' }}>
                          {element.name}
                        </Box>
                        {role != 'admin' && role != 'foundation' ? (
                          <CardActions sx={{ justifyContent: "end" }}>
                            <FileUplaodButton handleId={element.id} foundationId={element.foundation_id} />
                          </CardActions>
                        ) : (<></>)}
                      </Grid>
                    </Grid>

                    <Box sx={{ color: 'text.secondary', fontSize: 14, mb: '0.5rem' }}>{element.description}</Box>


                  </CardContent>
                </Grid>
              ))
                :
                (
                  <React.Fragment>
                    <Grid height="100%" textAlign={'center'} justifyContent={'center'} alignContent={'center'}>
                      <Typography>Empty List</Typography>
                    </Grid>
                  </React.Fragment>
                )
            }
          </Grid>

        </Grid>
        <Grid container py={2} justifyContent={'end'}>
          <Pagination
            count={lastPage}
            onChange={(event, value) => handleOnChange(value)}
            renderItem={(item) => (
              <PaginationItem

                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ScholarshipListing;