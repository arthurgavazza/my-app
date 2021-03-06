import { Grid, InputLabel, Select, MenuItem, TextField, SelectChangeEvent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { calculateHouseElementLightPower, calculateHouseElementTUGNumber, calculateHouseElementTUGPower, ElementTypes } from "../core/data/houseElementPower";
import { IElement } from "./Dimensions";
import CloseIcon from '@mui/icons-material/Close';

export default function HouseElement(props:any){
    const [element,setElement] = useState<IElement>({type:ElementTypes.Sala,light:0,TUG:0,area:0,width:0,height:0,TUGPower:0})
    const [width,setWidth] = useState(0)
    const [height,setHeight] = useState(0)
    const [area,setArea] = useState(0)
    const [light,setLight] = useState(0)
    const [TUGPower,setTUGPower]= useState(0)
    const [TUG,setTUG] = useState(0)
    const changeState = (elementData:IElement,index: number) => {
           console.log({elementData})
          setElement(elementData)
          console.log('changingxxx',{...elementData,TUGPower,light,TUG})
          props.setElementState({...elementData,TUGPower,light,TUG},index)
    }

    const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value)
      const tug = (element.TUG) || ((element.height && element.width && element.type)? calculateHouseElementTUGNumber(element).TUG : 0)
      setTUG(tug)
      setWidth(parseFloat(event.target.value))
     const elementData =  {...element,
      width:parseFloat(event.target.value),
      area: ( element.height && parseFloat(event.target.value)*element.height) || element.area,
      perimeter: ( element.height && 2*(parseFloat(event.target.value)+element.height)) || element.perimeter,
      TUG: tug,
      light: (element.height && element.width && element.type)? calculateHouseElementLightPower(element).light : 0,
      TUGPower: (element.height && element.width && element.type && element.TUG)? calculateHouseElementTUGPower(element).power : 0
    }

    changeState(elementData,props.index)
    
    }

    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value)
      const tug = event.target.value as unknown as number || ((element.height && element.width && element.type)? calculateHouseElementTUGNumber(element).TUG : 0)
      const elementData =  {...element,
        height:parseFloat(event.target.value),
        area: ( element.width && parseFloat(event.target.value)*element.width) || element.area,
        perimeter: ( element.width && 2*(parseFloat(event.target.value)+element.width)) || element.perimeter,
        TUG: tug,
        light: (element.height && element.width && element.type)? calculateHouseElementLightPower(element).light : 0,
        TUGPower: (element.height && element.width && element.type && element.TUG)? calculateHouseElementTUGPower(element).power : 0
      }
      setTUG(tug)
      setHeight(parseFloat(event.target.value))
      changeState(elementData,props.index)
    }

    const handleTUGChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const min = calculateHouseElementTUGNumber(element).TUG 
      let value =  parseFloat(event.target.value)
      value = value > min ? value : min
      changeState({...element,
        TUG: value,
        light: (element.height && element.width && element.type)? calculateHouseElementLightPower({...element,TUG: value}).light : 0,
        TUGPower: (element.height && element.width && element.type && element.TUG)? calculateHouseElementTUGPower({...element,TUG:value}).power : 0
      }

     
      ,props.index)
      setTUG(value)
    }



    useEffect(() => {
       console.log(element,"I CHANGED")
       setElement(props.initialState)
      const newTUGPower = (element.height && element.width && element.type && TUG)? calculateHouseElementTUGPower({...element,TUG}).power : 0
      const newLight = (element.height && element.width && element.type)? calculateHouseElementLightPower({...element,TUG}).light : 0
      setTUGPower(newTUGPower)
      setLight(newLight)
      console.log({newLight,newTUGPower})
      setElement({...element,TUGPower:newTUGPower,light:newLight})
      props.setElementState({...element,TUGPower:newTUGPower,light:newLight},props.index)
    },[TUG,area,width,height])
    return (
        <Grid container  direction="row" spacing={3}>

        <Grid item xs={3} sm={2.7} > 
          <InputLabel id="TipoComodo">Tipo C??modo</InputLabel>
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
          <MenuItem value={ElementTypes.AreaServico}>Area de Servi??o</MenuItem>
          
          </Select>

        </Grid>
        
        <Grid item xs={true}>
          <InputLabel id="Altura" shrink={true} >Altura(m)</InputLabel> 
            <TextField
            type='text'
            required
            id="Altura"
            name="Altura"
            fullWidth
            autoComplete="given-name"
            value = {element.height?.toString() || "0"}
            onChange={ handleHeightChange}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="Largura" shrink={true}>Largura(m)</InputLabel> 
            <TextField
            required
            id="Largura"
            name="Largura"
            fullWidth
            autoComplete="given-name"
            value = {element.width?.toString() || "0"}
            onChange={ handleWidthChange}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="Perimetro" shrink={true}>Per??metro(m)</InputLabel>
            <TextField
            defaultValue="Disabled"
            required
            id="Perimetro"
            name="Perimetro"
            fullWidth
            autoComplete="given-name"
            value={element.perimeter || (element.height && element.width ? 2*(element.height + element.width) : 0)}
            onChange= {(event: React.ChangeEvent<HTMLInputElement>) => changeState({...element,perimeter:parseFloat(event.target.value)},props.index)}
            />
        </Grid> 

        <Grid item xs={true}>
          <InputLabel id="Area" shrink={true}>??rea(m??)</InputLabel>
            <TextField
            defaultValue="Disabled"
            required
            id="Area"
            name="Area"
            fullWidth
            autoComplete="given-name"
            value={element.area || ((element.height && element.width) ? element.height*element.width:0) }
            onChange= {(event: React.ChangeEvent<HTMLInputElement>) =>  changeState({...element,area:parseFloat(event.target.value)||13},props.index)}
            />
        </Grid> 

        <Grid item xs={true}>
          <InputLabel id="TUG (" shrink={true}>TUG(U)</InputLabel>
            <TextField
            required
            id="TUG"
            name="TUG"
            fullWidth
            autoComplete="given-name"
            value={(element.TUG) || ((element.height && element.width && element.type)? calculateHouseElementTUGNumber(element).TUG : 0)}
            onChange={handleTUGChange}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="POTTUG (" shrink={true}>Pot. TUG(VA)</InputLabel>
            <TextField
            required
            id="POTTUG"
            name="POTTUG"
            fullWidth
            autoComplete="given-name"
            value={(element.height && element.width && element.type && element.TUG)? calculateHouseElementTUGPower(element).power : 0}
            // onChange={(event: React.ChangeEvent<HTMLInputElement>) => element.width && element.height && element.TUG && changeState({...element,TUGPower:parseFloat(event.target.value)},props.index)}
            />
        </Grid>

        <Grid item xs={true}>
          <InputLabel id="Ilumin" shrink={true}>Pot. Ilumin(VA)</InputLabel>
            <TextField
            required
            id="Ilumin"
            name="Ilumin"
            fullWidth
            autoComplete="given-name"
            value= {(element.height && element.width && element.type)? calculateHouseElementLightPower(element).light : 0}
            // onChange = {(event: React.ChangeEvent<HTMLInputElement>) => element.width && element.height && changeState({...element,light:parseFloat(event.target.value)},props.index)}
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