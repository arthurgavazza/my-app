import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Select, MenuItem, InputLabel, styled, FormControl, SelectChangeEvent, Icon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HouseElement from './HouseElement';
import CloseIcon from '@mui/icons-material/Close';
import { ElementTypes } from '../core/data/houseElementPower';

const IndexDiv = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
  alignSelf: 'center',
  justifySelf: 'center'
});



export interface IElement  {
  area?:number
  type?:ElementTypes
  height?:number
  width?:number
  TUG?:number
  light?:number
  perimeter?: number
  TUGPower?:number
}

export default function Dimensions(props:any) {
  const [elements,setElements] = useState<IElement[]>([])

  const onAddClick = () => {
      setElements([...elements,{}])    
  }

  useEffect(() => {
   
     props.setParent(elements)
  },[elements])

  const setElementState = (state: IElement,index: number) => {
        const currentElements = [...elements]
        currentElements[index] = state
        setElements(currentElements)
  }

  const onRemoveClick = (index:number) => {
    setElements([
      ...elements.slice(0, index),
      ...elements.slice(index + 1, elements.length)
    ]);
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dimensões Residência
      </Typography>
      
     <Grid container direction="column" spacing={1}>
    {elements.map((element,index) => {
      console.log(elements,"my elements rerender")
      return element && (
        <Grid container direction="row" key={index}>
        <Grid item sx={{ width: 1 }}>
        <HouseElement key={index} onRemoveClick={onRemoveClick} setElementState={setElementState} index={index} initialState={element} />
        </Grid>
      
      
        </Grid>
      )
    })}
      <Grid item container justifyContent="flex-start">
      <IconButton aria-label="adicionar" onClick={onAddClick}>
        <AddCircleIcon/>
        </IconButton>
      </Grid>
     
        </Grid>
        
    </>
  );
}