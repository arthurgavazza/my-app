import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HouseElement from './HouseElement';
import { ElementTypes } from '../core/data/houseElementPower';
import { EquipmentTypes } from '../core/data/demandFactor';
import MotorElement from './MotorElement';
import { DemandCalculator } from '../core/data/demandCalculator';


export interface IMotorElement  {
  power?: number | 0,
  quantity?: number | 0,
  demand?: number,
  demandFactor?: number,
  type?: string
  category?: EquipmentTypes
 }

export default function TypeG(props:any) {
  const [elements,setElements] = useState<IMotorElement[]>([])

  const onAddClick = () => {
      setElements([...elements,{}])    
  }

  useEffect(() => {
   const elementsPowers = elements.map(e => Number(e.power)*Number(e.quantity)) as number[]
   const demand = DemandCalculator[EquipmentTypes.G](elementsPowers) as number 
   const maxPowerElement = Math.max(...elementsPowers)
   const updatedElements = elements.map(el => {
     return {...el,
      demand:el.power && el.quantity &&(el.power === maxPowerElement ? 0.5*el.power*el.quantity:el.power*el.quantity),
      demandFactor:(el.power === maxPowerElement ? 0.5:1)
    }
   })

   setElements(updatedElements)
   props.setParent({elements})
  },[elements])

  const setElementState = (state: IMotorElement,index: number) => {
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
        <MotorElement key={index} onRemoveClick={onRemoveClick} setElementState={setElementState} index={index} initialState={element} />
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