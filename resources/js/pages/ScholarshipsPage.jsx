import React, { useState, Fragment } from 'react';
import { Grid, IconButton, Dialog, DialogContent, Button } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { DeleteIcon } from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { HeaderComponent } from './../components/HeaderComponent';
import { TextFieldComponent } from './../components/TextFieldComponents/TextFieldComponent';
import { ButtonComponent } from './../components/ButtonComponent';
import { createScholarship } from '../utils/apisauce';


const CustomButton = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const createUserFormik = useFormik({
    initialValues: {
      name: '',
      description: '',

    },
  })

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (field, newValue) => {
    createUserFormik.setFieldValue(field, newValue);
  }

  const handleOnSubmit = async (values) => {
    console.log('Create Scholarship');

    const res = await createScholarship({ values });

  console.log(res);

  }

  return (
  <React.Fragment>
      <GridToolbarContainer>
        <Button variant="outlined" onClick={handleClickOpen}>
          Create
        </Button>
        <form >
          <Dialog
            fullWidth open={open} onClose={handleClose}>
            <DialogContent>
              <form>
                <Grid >
                  <HeaderComponent
                    title={'Create an Account'}
                    variant={{
                      variant: 'h5',
                      color: 'black',
                      fontWeight: 'bold',
                      mb: '2.5rem'
                    }}
                  />

                  <Grid container item mb="1.5rem"  >
                    <TextFieldComponent
                      fieldname={'name'}
                      fieldlabel={'Name'}
                      variant={{
                        fullWidth: true,
                        variant: "outlined",
                        size: "small",
                      }}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />
                  </Grid>

                  <Grid container item mb="3rem">
                    <TextFieldComponent
                      fieldname={'description'}
                      fieldlabel={'Description'}
                      variant={{
                        fullWidth: true,
                        variant: "outlined",
                        size: "small",
                      }}
                      handleOnChange={(field, value) => handleOnChange(field, value)}
                    />
                  </Grid>

                  <ButtonComponent
                    // disable={createUserFormik.values.password != createUserFormik.values.confirm_password ? false : true}
                    title={'Create Scholarship'}
                    variant={{
                      variant: 'contained'
                    }}
                    onClick={() => handleOnSubmit(createUserFormik.values)}
                  />
                </Grid>


              </form>
            </DialogContent>
          </Dialog>
        </form>
      </GridToolbarContainer>
    </React.Fragment>
  )
}

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <Grid container justifyContent='space-between' p='0.5rem'>

        <Grid item>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Grid>
        <Grid item>
          <CustomButton />
        </Grid>


      </Grid>

    </GridToolbarContainer>
  );
}
const ScholarshipsPage = () => {
  const [rows, setRows] = React.useState([]);




  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },

    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   flex: 1,
    //   renderCell: ({ row }) => {
    //     return (
    //       <React.Fragment>
    //         {row.status == 1 ? <Chip label='Approved' color="success" /> : <Chip label='Pending' color="primary" />}
    //       </React.Fragment >
    //     )
    //   }
    // },
    {
      field: 'action',
      headerName: 'Action',
      flex: 0,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </React.Fragment >
        )
      }

    },
  ];


  return (
    <Fragment>
      <Grid container p={4} backgroundColor="#c8e6c9">
        <Grid container item backgroundColor="#fff" sx={{ minHeight: '80vh', borderRadius: '10px' }}>
          <Grid container p={'2rem'}>
            <DataGrid
              autoHeight
              pageSize={10}
              rowsPerPageOptions={[5, 15, 50, 100]}
              rows={rows}
              columns={columns}
              components={{
                // NoRowsOverlay: CustomNoRowsOverlay,
                Toolbar: CustomToolbar,

              }}
              componentsProps={{
                toolbar: CustomButton
              }}
            />
          </Grid>
        </Grid>

      </Grid>
    </Fragment>
  );

}

export default ScholarshipsPage;