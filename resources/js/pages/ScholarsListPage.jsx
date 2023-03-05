import React, { useState, Fragment } from 'react';
import { Grid, IconButton, Tooltip, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Typography } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { downloadFile, scholarsList, approveScholar, canceleScholar } from './../utils/apisauce';
import DeleteIcon from '@mui/icons-material/Delete';
import { Cancel, CheckCircle, Download, FileDownload, FileDownloadDone, FileDownloadDoneOutlined, FileDownloadOutlined } from '@mui/icons-material';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import { useSnackbar } from 'notistack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { jsPDF } from "jspdf";
import { Document, Page } from 'react-pdf';
import { useLocation } from 'react-router-dom';
import { ContainerWrapper } from './../components/ContainerWrapper';
const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ScholarsListPage = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [file, setFile] = useState();
  const [type, setType] = useState();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const doc = new jsPDF();

  const handleClose = () => {
    setOpen(false);
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const handleList = async () => {
    const res = await scholarsList();
    if (res.ok) {
      setRows(res.data.data);
    }
  }

  const handleView = async (id) => {
    setOpen(true);
    const res = await downloadFile({ id });

    if (res.ok) {
      // const { type, file } = res.data.data
      setFile(res.data.data);
      // setType(type);
    }
  }

  const handleDownload = async (id) => {
    const res = await downloadFile({ id });
    console.log(res);
    if (res.ok) {
      const link = document.createElement("a");
      link.href = res.data.data;
      link.setAttribute('download', 'FHE.pdf');
      document.body.appendChild(link);
      link.click();
    }
  }

  const handleApprove = async (id) => {
    const res = await approveScholar({ id });

    if (res.ok) {
      enqueueSnackbar(res.data.data, { variant: 'success' })
    } else {
      enqueueSnackbar(res.data.message, { variant: 'warning' })
    }
  }

  const handleCancel = async (id) => {
    const res = await canceleScholar({ id });

    if (res.ok) {
      enqueueSnackbar(res.data.data, { variant: 'success' })
    } else {
      enqueueSnackbar(res.data.message, { variant: 'warning' })
    }
  }

  // doc.text("Hello world!", 10, 10);
  // doc.save("a4.pdf");

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    { field: 'id_no', headerName: 'ID No', width: 150, hide: true },
    {
      field: 'firstname',
      headerName: 'First Name',
      flex: 1,
    },

    {
      field: 'lastname',
      headerName: 'Last Name',
      flex: 0.5,
    },
    {
      field: 'contact_no',
      headerName: 'Contact No',
      type: 'number',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>
            {row.status == 'pending' ? <Chip label='Pending' color="success" /> : row.statuss == 'rejected' ? <Chip label='Rejected' color="success" /> : row.status == 'approved' ? <Chip label='Approved' color="success" /> : <></>}

          </React.Fragment >
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <React.Fragment>

            <Tooltip title="View">
              <IconButton color="success" onClick={() => handleView(row.id)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="File">
              <IconButton color="success" onClick={() => handleDownload(row.id)}>
                <FileDownloadOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Approve">
              <IconButton color="primary" variant='success' onClick={() => handleApprove(row.user_id)}>
                <CheckCircle />
              </IconButton>
            </Tooltip>

            <Tooltip title="Cancel">
              <IconButton color="error" onClick={() => handleCancel(row.user_id)}>
                <Cancel />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(row.user_id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>

          </React.Fragment >
        )
      }

    },
  ];

  React.useEffect(() => {
    handleList();
  }, []);

  console.log(file);
  return (
    <React.Fragment>
      <ContainerWrapper>
        <DataGrid
          autoHeight
          pageSize={7}
          rows={rows ?? []}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}

        />

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >

          <DialogContent>
            <Box height="550px" width="550px" sx={{ background: `url(${file})`, backgroundRepeat: "no-repeat" }} />
            {/* <Box height="550px" width="550px" sx={{ backgroundImage: 'ur(http://scholar.hunterv1.local/storage/forms/5620230302-181715.pdf)', backgroundRepeat: "no-repeat" }} /> */}
            {/* {
                  type == 'image' ? <Box sx={{ background: { file }, height: '150px', width: '150px' }} ></Box> : <Document file='./5620230302-181715.pdf'>
                    <Page pageNumber={1} />
                  </Document>
                } */}
            {/* <Document height="550px" width="550px" file='./storage/forms/5620230302-181715.pdf)' onLoadSuccess={onDocumentLoadSuccess}>
                  <Page size="A4" height="600" pageNumber={1} />
                </Document> */}

          </DialogContent>

        </Dialog>

      </ContainerWrapper>
    </React.Fragment >
  );
}

export default ScholarsListPage;