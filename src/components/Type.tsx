import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EquipmentElement from './EquipmentElement';
import { DemandCalculator } from '../core/data/demandCalculator';
import { EquipmentTypes } from '../core/data/demandFactor';


export interface IEquipmentElement  {
 power?: number | 0,
 quantity?: number | 0,
 demand?: number,
 demandFactor?: number,
 type?: string
 category?: EquipmentTypes
}

export default function Type(props:any) {
  const [elements,setElements] = useState<IEquipmentElement[]>([])
  const [demandFactorPerType,setDemandFactorPerType] = useState<{[n: number]: {typeDemand: number,typeDemandFactor: number}}>({})
  const onAddClick = () => {
      setElements([...elements,{power: 0, quantity: 0}])    
  }

  


 useEffect(() => {
  const processElements = (category:EquipmentTypes, demandFactors: {[n: number]: {typeDemand: number,typeDemandFactor: number}} ) => {
    let typeElements = elements.filter(e => e.category && (e.category === category))
    const newDemandFactorPerType = {...demandFactors}
    if (category === EquipmentTypes.G){
      return newDemandFactorPerType
    }
    let totalPower = 0 
    let quantity = 0
    typeElements.forEach((element) => {
      totalPower += (element.power || 0)
      quantity += (element.quantity || 0)
    })
    const {demand: typeDemand,demandFactor: typeDemandFactor} = (totalPower > 0 && quantity > 0)? DemandCalculator[Number(category)](quantity,totalPower):
    {demand:0,demandFactor:0}
    console.log({typeDemand,typeDemandFactor,category,quantity,totalPower})
    
    newDemandFactorPerType[category] = {typeDemand,typeDemandFactor} 
    console.log({newDemandFactorPerType,demandFactorPerType})
    return newDemandFactorPerType
  }
    let demandFactorsObj = demandFactorPerType
    Object.entries(EquipmentTypes).forEach( o => {
       demandFactorsObj = processElements(o[1] as EquipmentTypes,demandFactorsObj);
    })
    setDemandFactorPerType({...demandFactorsObj})
    const updatedElemets = elements.map(element => ({...element,demandFactor: demandFactorPerType[element.category || 0].typeDemandFactor}))
    setElements(updatedElemets)
    props.setParent({demands:{...demandFactorsObj},elements:updatedElemets})
 },[elements])

  const setElementState = (state: IEquipmentElement,index: number) => {
    console.log(demandFactorPerType)
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
      console.log(elements,demandFactorPerType,"my elements rerender")
      return element && (
        <Grid container direction="row" key={index}>
        <Grid item sx={{ width: 1 }}>
        <EquipmentElement key={index} category={element.category}  demandFactor={demandFactorPerType[element.category || 0].typeDemandFactor} onRemoveClick={onRemoveClick} setElementState={setElementState} index={index} initialState={{...element,demandFactor: demandFactorPerType[element.category || 0].typeDemandFactor}} />
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