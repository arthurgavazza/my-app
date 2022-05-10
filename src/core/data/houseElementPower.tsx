import {  IElement } from "../../components/Dimensions";

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

type TUGData = {
    perimeter: number,
    min: number
}

type MinTUGPower = {
    powerPerPlug: number,
    plugsToApply: number,
    powerPerSurplusPlug: number
}

export const perimeterTUGMap = new Map<ElementTypes,TUGData>([
    [ElementTypes.AreaServico, {perimeter: 3.5, min:0}],
    [ElementTypes.Banheiro, {perimeter:-1,min: 1}],
    [ElementTypes.Copa, {perimeter: 3.5, min:0}],
    [ElementTypes.Cozinha,{perimeter: 3.5, min:0} ],
    [ElementTypes.Sala,{perimeter: 5, min: 0}],
    [ElementTypes.Quarto,{perimeter: 5, min: 0} ],
    [ElementTypes.Varanda,{perimeter: -1,min: 1}],
    [ElementTypes.Corredor,{perimeter: -1,min: 1}]
]);

export const minTUGPowerMap = new Map<ElementTypes,MinTUGPower>([
       [ElementTypes.Cozinha,{powerPerPlug:600,plugsToApply:3,powerPerSurplusPlug:100}],
       [ElementTypes.Copa,{powerPerPlug:600,plugsToApply:3,powerPerSurplusPlug:100}],
       [ElementTypes.AreaServico,{powerPerPlug:600,plugsToApply:3,powerPerSurplusPlug:100}],

])




export function calculateHouseElementTUGPower(element:IElement): {power:number}{
    console.log(element,"hereeeee")
    const specialTypes = [ElementTypes.Cozinha,ElementTypes.Copa,ElementTypes.AreaServico]
    if(!element.TUG) {
        return {power:0}
    };
    if(element.type && specialTypes.includes(element.type)){
        let tugPower = 0
         if(element.TUG <= 6){
             const surplus = element.TUG - 3;
              tugPower = surplus >= 0 ? (surplus*100 + 1800) : (element.TUG*600)
         }
         else{
             tugPower = 1200 + (element.TUG - 2)*100
         }
    return {
       power:tugPower
      }
    }else{
        return {
            power: 100*element.TUG
        }
    }
}

export function calculateHouseElementLightPower(element:IElement): {light: number} {
     
    if(!element.type || !element.width || !element.height){
        throw new Error("Necessário fornecer os dados do cômodo")
    }
    const area = element.height * element.width;
    if (area <= 6 ){
       return { light: 100}
    }else{
        const times = Math.floor((area - 6)/4)
        return {light: 100 + times*60}
    }
}

export function calculateHouseElementTUGNumber(element: IElement): {TUG: number} {

    if(!element.type || !element.width || !element.height){
        throw new Error("Necessário fornecer os dados do cômodo")
    }
    
    const perimeterTUGData = perimeterTUGMap.get(element.type);
    if(!perimeterTUGData){
        throw new Error("Tipo de cômodo invalido")
    }
    const perimeter = 2*(element.width + element.height)
    console.log(perimeter)
    const times = perimeterTUGData.perimeter > 0 ? Math.ceil(perimeter / perimeterTUGData.perimeter) : 0
    console.log(times)
    return {
        TUG: perimeterTUGData.min + times
    }
}

