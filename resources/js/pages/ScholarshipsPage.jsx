import React, { useState, useEffect, Fragment } from 'react';
import { Grid, IconButton, Dialog, DialogContent, Button, Tooltip, Popover } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { HeaderComponent } from './../components/HeaderComponent';
import { TextFieldComponent } from './../components/TextFieldComponents/TextFieldComponent';
import { ButtonComponent } from './../components/ButtonComponent';
import { createScholarship, destroyScholarship, foundationScholarships } from '../utils/apisauce';
import { ContainerWrapper } from '../components/ContainerWrapper';
import { editScholarship } from '../utils/apisauce';

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
    const res = await createScholarship({ values });

    if (res.ok) {
      enqueueSnackbar('Success', { variant: 'success' })
      handleClose();
    }
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
                    title={'Create Scholarship'}
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

                  <Grid container item mb="1.5rem">
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

                  <Grid container item mb="3rem">
                    <TextFieldComponent
                      fieldname={'note'}
                      fieldlabel={'Note'}
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchScholarships = async () => {
    const res = await foundationScholarships();

    if (res.ok) {
      setRows(res.data.data);
    }
  }

  const handleDelete = async (id) => {
    // setAnchorEl(event.currentTarget);
    const res = await destroyScholarship({ id });

    if (res.ok) {
      setRows(prev => {
        return prev.filter(rows => rows.foundation_id !== id);
      });
    }
  }

  const handleEdit = async (id) => {
    const res = await editScholarship({ id });

    if (res.oks) {

    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    { field: 'foundation_id', headerName: 'Foundation ID', width: 90, hide: true },
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
    {
      field: 'note',
      headerName: 'Note',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 0,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(row.foundation_id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            {/* <Tooltip title="Edit">
              <IconButton color="success" onClick={() => handleEdit(row.foundation_id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip> */}

          </React.Fragment >
        )
      }

    },
  ];

  useEffect(() => {
    fetchScholarships();
  }, [])

  return (
    <Fragment>
      <ContainerWrapper>
        <DataGrid
          // autoHeight
          pageSize={7}
          // rowsPerPageOptions={[5, 15, 50, 100]}
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

        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          The content of the Popover.
        </Popover>

      </ContainerWrapper>

    </Fragment>
  );

}

export default ScholarshipsPage;