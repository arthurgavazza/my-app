import { Grid, InputLabel, Select, MenuItem, TextField, SelectChangeEvent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { IEquipmentElement } from "./Type";
import { EquipmentTypes } from "../core/data/demandFactor";
import { Equipments } from "../core/types/Equipments";



export default function EquipmentElement(props:any){
    const [element,setElement] = useState<IEquipmentElement>({type:'',power:0, quantity:0 })
    
    const changeState = (elementData:IEquipmentElement,index: number) => {
          const elementCategory = elementData.type? Equipments[elementData.type].type : EquipmentTypes.B
          setElement({...elementData,category:elementCategory})
          props.setElementState({...elementData,category:elementCategory},index)
    }

    const onPowerFactorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = parseFloat(event.target.value)
      // if (value > 1) value = 1
      // if (value < -1 )value =-1
      changeState({...element,powerFactor:value },props.index)
    }

    useEffect(() => {
       //console.log(element,"I CHANGED")
       setElement(props.initialState)
       //props.setElementState(element,props.index)
       console.log(props)
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
            {Object.entries(Equipments).map((o,index) => {
              return (
                
                <MenuItem key={index} value={o[0]}>{o[1].name}</MenuItem>
              )
            })}
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
            value = {element.power?.toString() || "0"}
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
            value = {element.powerFactor}
            onChange = {onPowerFactorChange}
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