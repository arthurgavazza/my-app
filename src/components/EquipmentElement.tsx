import { Grid, InputLabel, Select, MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { ElementTypes, IElement } from "./Dimensions";


export default function EquipmentElement(props:any){
    const [element,setElement] = useState<IElement>({})
    const changeState = (elementData:IElement,index: number) => {
          setElement(elementData)
          props.setElementState(elementData,index)
    }

    useEffect(() => {
       console.log(element,"I CHANGED")
       setElement(props.initialState)
    },[props])
    return (
        <Grid container  direction="row" spacing={3}>

        <Grid item xs={3} sm={3} > 
          <InputLabel id="TipoComodo">Tipo Cômodo</InputLabel>
          <Select
            required
            onChange={ (event:SelectChangeEvent) => changeState({type:event.target.value as ElementTypes},props.index)}
            labelId="TipoComodo"
            name="TipoComodo"
            fullWidth
            value={element.type || ""}
            
          >
          <MenuItem value={ElementTypes.Sala}>Sala</MenuItem>
          <MenuItem value={ElementTypes.Varanda}>Varanda</MenuItem>
          <MenuItem value={ElementTypes.Quarto}>Quarto</MenuItem>
          <MenuItem value={ElementTypes.Corredor}>Corredor</MenuItem>
          <MenuItem value={ElementTypes.Cozinha}>Cozinha</MenuItem>
          <MenuItem value={ElementTypes.Copa}>Copa</MenuItem>
          <MenuItem value={ElementTypes.Banheiro}>Banheiro</MenuItem>
          <MenuItem value={ElementTypes.AreaServico}>Area de Serviço</MenuItem>
          
          </Select>

        </Grid>
        
        <Grid item xs={1}>
          <InputLabel id="Comprimento)" shrink={true} >Comprimento (m)</InputLabel> 
            <TextField
            type = "numeric"
            required
            id="Comprimento"
            name="Comprimento"
            fullWidth
            autoComplete="given-name"
            value = {element.width || 0}
            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => changeState({...element,width:parseFloat(event.target.value)},props.index)}
            />
        </Grid>

        <Grid item xs={1}>
          <InputLabel id="Largura" shrink={true}>Largura (m)</InputLabel> 
            <TextField
            required
            id="Largura"
            name="Largura"
            fullWidth
            autoComplete="given-name"
            value = {element.height || 0}
            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => changeState({...element,height:parseFloat(event.target.value)},props.index)}
            />
        </Grid>

        <Grid item xs={1}>
          <InputLabel id="Area" shrink={true}>Área (m²)</InputLabel>
            <TextField
            disabled 
            defaultValue="Disabled"
            required
            id="Area"
            name="Area"
            fullWidth
            autoComplete="given-name"
            value={element.height && element.width ? element.height*element.width : 0}
            />
        </Grid> 

        <Grid item xs={1}>
          <InputLabel id="TUG (" shrink={true}>TUG (U)</InputLabel>
            <TextField
            required
            id="TUG"
            name="TUG"
            fullWidth
            autoComplete="given-name"
            />
        </Grid>

        <Grid item xs={1}>
          <InputLabel id="Ilumin" shrink={true}>Iluminação (W)</InputLabel>
            <TextField
            required
            id="Ilumin"
            name="Ilumin"
            fullWidth
            autoComplete="given-name"
            />
        </Grid>
        <Grid item xs={1}>
      </Grid> 

      </Grid>
    )
}