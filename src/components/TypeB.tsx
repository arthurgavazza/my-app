import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Select, MenuItem, InputLabel, styled, FormControl, SelectChangeEvent, Icon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { ElementTypes } from '../core/data/houseElementPower';
import EquipmentElement from './EquipmentElement';
import { DemandCalculator } from '../core/data/demandCalculator';
import { EquipmentTypes } from '../core/data/demandFactor';

const IndexDiv = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
  alignSelf: 'center',
  justifySelf: 'center'
});



export interface IEquipmentElement  {
 power?: number | 0,
 quantity?: number | 0,
 demand?: number,
 demandFactor?: number,
 type?: string
}

export default function Dimensions() {
  const [elements,setElements] = useState<IEquipmentElement[]>([])
  const [demandFactor,setDemandFactor] = useState<number>(0)
  const [demand,setDemand] = useState<number>(0)

  const onAddClick = () => {
      setElements([...elements,{power: 0, quantity: 0}])    
  }

  useEffect(() => {
    console.log('recalc')
   let totalPower = 0
   let quantity = 0
   elements.forEach(e => {
        quantity += (e.quantity || 0)
        totalPower += (e.power || 0)
   })
   const {demand,demandFactor} = (totalPower > 0 && quantity > 0)? DemandCalculator[EquipmentTypes.B](quantity,totalPower):
   {demand:0,demandFactor:0}
   setDemandFactor(demandFactor)
   setDemand(demand)
   

  },[elements])

  const setElementState = (state: IEquipmentElement,index: number) => {
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
        <EquipmentElement key={index}  demandFactor={demandFactor} onRemoveClick={onRemoveClick} setElementState={setElementState} index={index} initialState={{...element,demandFactor}} />
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