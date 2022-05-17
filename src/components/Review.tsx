import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { IElement } from './Dimensions';
import { EquipmentTypes, EquipmentTypesNameMap } from '../core/data/demandFactor';
import { DemandCalculator } from '../core/data/demandCalculator';



export default function Review(props:any) {
  const {type,typeG,dimensions}:{
  type:{demands:{[key:number]:{typeDemand:number,typeDemandFactor:number}},elements:any},
  typeG: {elements:any[]},
  dimensions: IElement[]
} = props

 const transformDimensions = () => {
   return dimensions.reduce((prev,current) => {
     console.log({current},'here')
     return prev + (Number(current.TUGPower) || 0) + (Number(current.light) || 0)
   },0)
 }

 const installedLoad = transformDimensions()

 const transformTypeG = () => {
   return typeG.elements.reduce((prev,current) => {
        return prev + (Number(current.demand) || 0)
   },0) as number
 }

 const transformType = () =>{
    const typesData = Object.keys(type.demands).map( (elementtype) =>{
      //console.log({elementtype})
      if(parseInt(elementtype) === EquipmentTypes.A as number){
        console.log({elementtype})
        return {type:elementtype,demand: 1000*DemandCalculator[0](installedLoad/1000)}
      }
      return {type:elementtype,demand: type.demands[elementtype as unknown as number].typeDemand}
    })
    return [...typesData,{type: Number(EquipmentTypes.G).toString() ,demand: transformTypeG()}]
 }
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Sumário Demandas
      </Typography>
      <List disablePadding>
      <ListItem key={0} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={'Carga instalada - TUG e Iluminação'}  />
            <Typography variant="body2">{installedLoad.toFixed(2)} W</Typography>
      </ListItem>
      </List>
      <List disablePadding>
        {transformType().map((type) => {

          return(
         
          <ListItem key={parseInt(type.type)} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={EquipmentTypesNameMap.get(parseInt(type.type))}  />
            <Typography variant="body2">{type.demand.toFixed(2)} W</Typography>
          </ListItem>
        )})}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {transformType().reduce((prev,current) => parseFloat((prev + current.demand).toFixed(2)),0)}W
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
      
        <Grid item container direction="column" xs={12} sm={6}>
    
        </Grid>
      </Grid>
    </React.Fragment>
  );
}