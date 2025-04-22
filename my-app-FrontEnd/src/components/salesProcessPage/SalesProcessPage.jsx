// import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import React from "react";
import image from "./5.jpg";
import Header from "../Header";

const SalesProcessDiagram = () => {
  const [customerInfo, setCustomerInfo] = React.useState({
    customerName: "",
    painPoints: "",
    desiredGains: "",
    valueSearch: "",
    contributors: "",
    painKiller: "",
    objectionHandling: "",
    followUpStrategy: "",
    followUpResponse: "",
  });

  return (
    <Box m="20px">
      <Header
        title="Sales Process"
        subtitle="Manage the sales process efficiently"
      />
      <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
        <Card sx={{ width: "100%", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              First Call
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  know real pains
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  know gain that customer want to aim
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  what value claint search for
                </Typography>
              </Grid>
            </Grid>

            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 2, marginTop: 4 }}
            >
              Second Touch
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  gain contributors
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  Pain Killer
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  --- by story telling --- Objection Handling Strategy
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  Follow Up Strategy
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  Follow Up Response: {customerInfo.followUpResponse}
                </Typography>
              </Grid>
            </Grid>

            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 2, marginTop: 4 }}
            >
              follow Up Strategy
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  after six no tell to them ققوله فيه فرصه نشتغل مع بعض ولا فكك
                  مني واكلمك السنه الجيه
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  first client tell to me keep follow me
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  second client tell me call me after month or year
                </Typography>
              </Grid>
            </Grid>

            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ marginTop: 3 }}
            ></Box>
          </CardContent>
        </Card>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
        <img src={image} alt="Sales Process" />
      </Box>
    </Box>
  );
};

export default SalesProcessDiagram;
