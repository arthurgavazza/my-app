import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dimensions from './Dimensions';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Type from './Type';
import { EquipmentTypes } from '../core/data/demandFactor';
import TypeG from './TypeG';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Dimensões Residência - Ilumninação e TUG', 'Equipamentos - Tipo B-F e J','Equipamentos - Tipo G','Sumário Demandas'];

function getStepContent(step: number,cb?:any,dimensions?:any,typeG?:any,type?:any) {
  switch (step) {
    case 0:
      return <Dimensions setParent={cb} />;
    case 1:
      return <Type setParent={cb}/>;
    case 2:
      return <TypeG setParent={cb}/>;
    case 3:
      return <Review dimensions={dimensions} typeG={typeG} type={type} />;

    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [dimensionsData,setDimensionsData] = React.useState([])
  const [typeGData,setTypeGData] = React.useState([])
  const [typeData,setTypeData] = React.useState([])

  const callbacks = new Map([
    [0, (data:any) => setDimensionsData(data)],
    [1,(data:any) => setTypeData(data)],
    [2,(data:any) => setTypeGData(data)]
  ])
   
  


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
          Projetos elétricos residênciais
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Calculo de Demanda
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,callbacks.get(activeStep),dimensionsData,typeGData,typeData)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  
                  { activeStep < steps.length - 1 && 
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    { 'Next'}
                  </Button>
                  }
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}