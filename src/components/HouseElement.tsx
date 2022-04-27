import { Grid, InputLabel, Select, MenuItem, TextField, SelectChangeEvent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { calculateHouseElementLightPower, calculateHouseElementTUGNumber, ElementTypes } from "../core/data/houseElementPower";
import { IElement } from "./Dimensions";
import CloseIcon from '@mui/icons-material/Close';

export default function HouseElement(props:any){
    const [element,setElement] = useState<IElement>({type:ElementTypes.Sala,light:0,TUG:0,area:0,width:0,height:0})
    const changeState = (elementData:IElement,index: number) => {
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
        
        <Grid item xs={true}>
          <InputLabel id="Comprimento)" shrink={true} >Comprimento (m)</InputLabel> 
            <TextField
            type='text'
            required
            id="Comprimento"
            name="Comprimento"
            fullWidth
            autoComplete="given-name"
            value = {element.width?.toFixed(2).toString() || "0"}
            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => changeState({...element,width:parseFloat(event.target.value)},props.index)}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="Largura" shrink={true}>Largura (m)</InputLabel> 
            <TextField
            required
            id="Largura"
            name="Largura"
            fullWidth
            autoComplete="given-name"
            value = {element.height?.toFixed(2).toString() || "0"}
            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => changeState({...element,height:parseFloat(event.target.value)},props.index)}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="Perimetro" shrink={true}>Perímetro(m)</InputLabel>
            <TextField
            disabled 
            defaultValue="Disabled"
            required
            id="Perimetro"
            name="Perimetro"
            fullWidth
            autoComplete="given-name"
            value={element.height && element.width ? 2*(element.height + element.width) : 0}
            onChange= {(event: React.ChangeEvent<HTMLInputElement>) => element.width && element.height && changeState({...element,perimeter:parseFloat(event.target.value)},props.index)}
            />
        </Grid> 

        <Grid item xs={true}>
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
            onChange= {(event: React.ChangeEvent<HTMLInputElement>) => element.width && element.height && changeState({...element,area:parseFloat(event.target.value)},props.index)}
            />
        </Grid> 

        <Grid item xs={true}>
          <InputLabel id="TUG (" shrink={true}>TUG (U)</InputLabel>
            <TextField
            required
            id="TUG"
            name="TUG"
            fullWidth
            autoComplete="given-name"
            value={(element.height && element.width && element.type)? calculateHouseElementTUGNumber(element).TUG : 0}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => element.width && element.height && changeState({...element,TUG:parseFloat(event.target.value)},props.index)}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="POTTUG (" shrink={true}>Pot. TUG (VA)</InputLabel>
            <TextField
            required
            id="POTTUG"
            name="POTTUG"
            fullWidth
            autoComplete="given-name"
            value={(element.height && element.width && element.type)? calculateHouseElementTUGNumber(element).TUG : 0}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => element.width && element.height && changeState({...element,TUG:parseFloat(event.target.value)},props.index)}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="Ilumin" shrink={true}>Iluminação (VA)</InputLabel>
            <TextField
            required
            id="Ilumin"
            name="Ilumin"
            fullWidth
            autoComplete="given-name"
            value= {(element.height && element.width && element.type)? calculateHouseElementLightPower(element).light : 0}
            onChange = {(event: React.ChangeEvent<HTMLInputElement>) => element.width && element.height && changeState({...element,light:parseFloat(event.target.value)},props.index)}
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