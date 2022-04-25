import { Grid, InputLabel, Select, MenuItem, TextField, SelectChangeEvent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { IEquipmentElement } from "./TypeB";
const Equipments = {
  Chuveiro: 'Chuveiro',
  Torneira: 'Torneira', 
  Aquecedor: 'Aquecedor',
  Ferro: 'Ferro'
}

export default function EquipmentElement(props:any){
    const [element,setElement] = useState<IEquipmentElement>({type:Equipments.Chuveiro,power:0, quantity:0 })
    const changeState = (elementData:IEquipmentElement,index: number) => {
          setElement(elementData)
          props.setElementState(elementData,index)
    }

    useEffect(() => {
       //console.log(element,"I CHANGED")
       setElement(props.initialState)
    },[props])
    return (
        <Grid container  direction="row" spacing={3}>

        <Grid item xs={3} sm={3} > 
          <InputLabel id="Equipamento">Equipamento</InputLabel>
          <Select
            required
            onChange={ (event:SelectChangeEvent) => changeState({type:event.target.value},props.index)}
            labelId="Equipamento"
            name="Equipamento"
            fullWidth
            value={element.type || ""}
            
          >
          <MenuItem value={Equipments.Chuveiro}>Chuveiro</MenuItem>
          <MenuItem value={Equipments.Torneira}>Torneira</MenuItem>
          <MenuItem value={Equipments.Aquecedor}>Aquecedor de água</MenuItem>
          <MenuItem value={Equipments.Ferro}>Ferro elétrico</MenuItem>
          
          </Select>

        </Grid>
        
        <Grid item xs={true}>
          <InputLabel id="Potencia" shrink={true} >Potência (W)</InputLabel> 
            <TextField
            type='text'
            required
            id="Potencia"
            name="Potencia"
            fullWidth
            autoComplete="given-name"
            value = {element.power?.toFixed(2).toString() || "0"}
            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => changeState({...element,power:parseFloat(event.target.value)},props.index)}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="quantidade" shrink={true} >quantidade (U)</InputLabel> 
            <TextField
            type='text'
            required
            id="quantidade"
            name="quantidade"
            fullWidth
            autoComplete="given-name"
            value = {element.quantity?.toFixed(0).toString() || "0"}
            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => changeState({...element,quantity:parseFloat(event.target.value)},props.index)}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="Fpotencia" shrink={true}>Fator de potência</InputLabel> 
            <TextField
            required
            id="Fpotencia"
            name="Fpotencia"
            fullWidth
            autoComplete="given-name"
            value = {1}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="Fdemanda" shrink={true}>Fator de demanda</InputLabel>
            <TextField
            disabled 
            defaultValue="Disabled"
            required
            id="Fdemanda"
            name="Fdemanda"
            fullWidth
            autoComplete="given-name"
            value={element.demandFactor || 0}
            />
        </Grid> 

        <Grid item xs={true}>
          <InputLabel id="demanda" shrink={true}>Demanda</InputLabel>
            <TextField
            disabled 
            defaultValue="Disabled"
            required
            id="demanda"
            name="demanda"
            fullWidth
            autoComplete="given-name"
            value={(element.demandFactor && element.power && element.quantity) ? (element.demandFactor * element.power * element.quantity).toFixed(2) :0}
            />
        </Grid>


      <Grid item xs={1} container justifyContent="center" alignItems="center" >
        <Grid item>
        <IconButton aria-label="remover" onClick={() => props.onRemoveClick(props.index)}>
        <CloseIcon/>
        </IconButton>
        </Grid>
      </Grid> 

      </Grid>
    )
}