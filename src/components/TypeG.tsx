import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HouseElement from './HouseElement';
import { ElementTypes } from '../core/data/houseElementPower';


export interface IElement  {
  area?:number
  type?:ElementTypes
  height?:number
  width?:number
  TUG?:number
  light?:number
  perimeter?: number
}

export default function TypeG() {
  const [elements,setElements] = useState<IElement[]>([])

  const onAddClick = () => {
      setElements([...elements,{}])    
  }

  useEffect(() => {
   

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
        Demanda Motores
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