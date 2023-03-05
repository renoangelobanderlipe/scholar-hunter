import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { totalApplicants } from '../../utils/apisauce';
import { totalScholarship } from './../../utils/apisauce';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
];


export const FoundationComponent = () => {
  const [status, setStatus] = useState(0);
  const [count, setCount] = useState(0);

  const handleTotalApplicants = async () => {
    const res = await totalApplicants({ type: 'foundation' });

    if (res.ok) {
      console.log(res.data.data);
      setStatus(res.data.data);
    }
  }

  const handleTotalScholarship = async () => {
    const res = await totalScholarship({ type: 'foundation' });

    if (res.ok) {
      setCount(res.data.data);
    }
  }

  useEffect(() => {
    handleTotalApplicants();
    handleTotalScholarship();
  }, []);

  return (
    <Fragment>
      <Grid container>

        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6} >
            <Box sx={{ py: '1rem' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: "20px", color: '#424242' }}>Applicants Status</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center", border: '1px solid grey', borderRadius: '10px' }}>
              <PieChart width={250} height={250}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={status}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </Box>
          </Grid>
          <Grid item xs={6} >
          <Box sx={{ py: '1rem' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: "20px", color: '#424242' }}>Total Scholarship Created</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center", border: '1px solid grey', borderRadius: '10px' }}>
              <PieChart width={250} height={250}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={count}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </Box>
          </Grid>
        </Grid>

      </Grid>
    </Fragment>
  );
}