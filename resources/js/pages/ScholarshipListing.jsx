import React from 'react';
import { Grid, Box, Pagination, PaginationItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ScholarshipListing = () => {
  return (
    <React.Fragment>
      <Grid container>
        <Box width={"100%"} sx={{ mb: '2.5rem ' }}>
          {/* <SerachbarComponent placeholder={'Search'} onChange={(value) => handleSearch(value)} /> */}
          SEARCH
        </Box>

        <Grid container spacing={4}>
          {/* {
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
          } */}
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