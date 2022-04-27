import { Grid, InputLabel, Select, MenuItem, TextField, SelectChangeEvent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { IEquipmentElement } from "./TypeB";
import { EquipmentTypes } from "../core/data/demandFactor";

const Equipments : {[s:string]: {name: string, type: EquipmentTypes}}= {

  Chuveiro: {name: 'Chuveiro Elétrico', type:EquipmentTypes.B},
  Torneira: {name: 'Torneira' ,type:EquipmentTypes.B }, 
  Aquecedor: {name: 'Aquecedor de água', type:EquipmentTypes.B }, 
  Ferro: {name: 'Ferro Elétrico' , type:EquipmentTypes.B },

  AquecedorCentral: {name: 'Aquecedor Central' , type:EquipmentTypes.C },
  AquecedorAcumulacao: {name: 'Aquecedor de Acumulação' , type:EquipmentTypes.C },

  Secadora: {name: 'Secadora de Roupa' , type:EquipmentTypes.D },
  MaquinaLouca: {name: 'Máquina de Lavar Louça' , type:EquipmentTypes.D },
  Microondas: {name: 'Forno Microondas' , type:EquipmentTypes.D },

  Fogao: {name: 'Fogão Elétrico' , type:EquipmentTypes.E },

  Motor: {name: 'Motor' , type:EquipmentTypes.G },

  Hidromassagem: {name: 'Hidromassagem' , type:EquipmentTypes.I },

  VeiculoEletrico: {name: 'Veículo Eletrico' , type:EquipmentTypes.J },

}


export default function EquipmentElement(props:any){
    const [element,setElement] = useState<IEquipmentElement>({type:'',power:0, quantity:0 })
    const changeState = (elementData:IEquipmentElement,index: number) => {
          const elementCategory = elementData.type? Equipments[elementData.type].type : EquipmentTypes.B
          setElement({...elementData,category:elementCategory})
          props.setElementState({...elementData,category:elementCategory},index)
    }

    useEffect(() => {
       //console.log(element,"I CHANGED")
       setElement(props.initialState)
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