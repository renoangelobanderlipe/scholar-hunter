import React from 'react';
import { Grid, Box, Dialog, Pagination, PaginationItem, CardContent, Chip, CardActions, Button, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { scholarshipList } from '../utils/apisauce';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { useFormik } from 'formik';
import { submitScholarship } from './../utils/apisauce';
import { useSnackbar } from 'notistack';

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

  const scholarshipFormik = useFormik({
    initialValues: {
      scholarshipFile: null
    }
  })


  const handleList = async () => {
    const res = await scholarshipList();

    if (res.data.code == 200) {
      setScholarship(res.data?.data);
    }
  }

  React.useEffect(() => {
    handleList();
  }, []);

  return (
    <React.Fragment>
      <Grid container>
        <Box width={"100%"} sx={{ mb: '2.5rem ' }}>
          {/* <SerachbarComponent placeholder={'Search'} onChange={(value) => handleSearch(value)} /> */}
          SEARCH
        </Box>

        <Grid container spacing={4} p={6}>
          {
            scholarship.map((element, index) =>
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
                    <FileUplaodButton handleId={element.id} foundationId={element.foundation_id} />
                  </CardActions>
                </CardContent>
              </Grid>
            )
          }
        </Grid>

        <Grid container item p="4rem 0" justifyContent={'end'} >
          <Pagination
            // count={scholarship.length}
            count={10}
            // onChange={(event, value) => handleOnChange(event, value)}
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