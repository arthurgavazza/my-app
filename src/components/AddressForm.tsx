import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Select, MenuItem, InputLabel } from '@mui/material';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dimensões Residência
      </Typography>
      <Grid container  direction="row" spacing={3}>
        
        <Grid item xs={3} sm={3}>
          <TextField
            required
            id="NomeComodo"
            name="NomeComodo"
            label="Nome do Cômodo"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={3} sm={3}> 
        <InputLabel id="TipoComodo">Tipo Cômodo</InputLabel>
            <Select
            required
            labelId="TipoComodo"
            name="TipoComodo"
            //label="Tipo Cômodo"
            fullWidth
          >
          <MenuItem value={10}>Sala</MenuItem>
          <MenuItem value={20}>Varanda</MenuItem>
          <MenuItem value={30}>Quarto</MenuItem>
          <MenuItem value={40}>Corredor</MenuItem>
          <MenuItem value={50}>Cozinha</MenuItem>
          <MenuItem value={60}>Copa</MenuItem>
          <MenuItem value={70}>Banheiro</MenuItem>
          <MenuItem value={80}>Area de Serviço</MenuItem>
          
          </Select>

        </Grid>
        <Grid item xs={1}> 
            <TextField
            required
            id="Comprimento"
            name="Comprimento"
            label="Comprimento (m)"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>

        <Grid item xs={1}> 
            <TextField
            required
            id="Largura"
            name="Largura"
            label="Largura (m)"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>

        <Grid item xs={1}>
          <TextField
            required
            id="Area"
            name="Area"
            label="Área (m²)"
            fullWidth
            autoComplete="given-name"
          />
        </Grid> 

        <Grid item xs={1}>
          <TextField
            required
            id="TUG"
            name="TUG"
            label="TUG (U)"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>

        <Grid item xs={1}>
          <TextField
            required
            id="Ilumin"
            name="Ilumin"
            label="Iluminação (W)"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}