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

const IndexDiv = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
  alignSelf: 'center',
  justifySelf: 'center'
});

export enum ElementTypes {
  Sala = 'Sala',
  Varanda= 'Varanda',
  Quarto = 'Quarto',
  Corredor= 'Corredor',
  Cozinha = 'Cozinha',
  Copa = 'Copa',
  Banheiro = 'banheiro',
  AreaServico ='Área de serviço'
}

export interface IElement  {
  area?:number
  type?:ElementTypes
  height?:number
  width?:number
  TUG?:number
  light?:number
}

export default function TypeB() {
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
        Equipamentos Tipo B
      </Typography>
      
     <Grid container direction="column" spacing={1}>
    {elements.map((element,index) => {
      console.log(elements,"my elements rerender")
      return element && (
        <Grid container direction="row" key={index}>
        <HouseElement key={index} setElementState={setElementState} index={index} initialState={element} />
        <Grid item>
        <IconButton aria-label="remover" onClick={() => onRemoveClick(index)}>
        <CloseIcon/>
        </IconButton>
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