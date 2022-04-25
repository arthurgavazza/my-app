
import { EquipmentTypes,EquipmentTablesMap,AEquipmentsData,BEquipmentsData,CEquipmentsData,DEquipmentsData,EEquipmentsData,IEquipmentsData } from "./demandFactor";


function defaultDemand(numberOfDevices:number,installedLoad: number,Table:{numberOfDevices: number, demandFactor: number}[]){
    const maxValue = Math.max(...Table.map(table => table.numberOfDevices))
    const maxValueIndex = Table.map(table => table.numberOfDevices).indexOf(maxValue)
    if(numberOfDevices > maxValue){
        return {demand: Table[maxValueIndex].demandFactor* installedLoad,demandFactor:Table[maxValueIndex].demandFactor }
    }
    else{
       const tableElement =  Table.filter(table => {
            return table.numberOfDevices === numberOfDevices
        })

        if(tableElement.length > 0){
            return {demand: tableElement[0].demandFactor*installedLoad, demandFactor:tableElement[0].demandFactor }
        }else{
            throw new Error("Numero de dispositivos não incluso na tabela")
        }
    }
}

export const DemandCalculator = {

    // Fatores de Demanda Referentes a Tomadas e Iluminação Residencial
    [EquipmentTypes.A]: function(installedLoad:number) {
        const ATable:AEquipmentsData[] = EquipmentTablesMap.get(EquipmentTypes.A)
        const tableElement = ATable.filter( table => {
            let greaterThanMin = true
            let lessThanMax = true
            if(table.installedLoad.min){
               greaterThanMin = installedLoad > table.installedLoad.min
            }
            if(table.installedLoad.max){
                lessThanMax = installedLoad <= table.installedLoad.max
            }
            return greaterThanMin && lessThanMax
        })
        if(tableElement.length > 0){
            return tableElement[0].demandFactor* installedLoad
        }else{
            throw new Error("Carga não corresponde a nenhum valor da tabela")
        }
        

    },

    /*- Fatores de Demanda de Chuveiros, Torneiras, Aquecedores de Água de 
    Passagem e Ferros Elétricos*/
    [EquipmentTypes.B]: function (numberOfDevices:number,installedLoad:number) {
        const BTable:BEquipmentsData[] = EquipmentTablesMap.get(EquipmentTypes.B)
        return defaultDemand(numberOfDevices,installedLoad,BTable)
    
    },

    //- Fatores de Demanda de Aquecedor Central ou de Acumulação (Boiler)
    [EquipmentTypes.C]: function (numberOfDevices:number,installedLoad:number) {
        const CTable:CEquipmentsData[] = EquipmentTablesMap.get(EquipmentTypes.C)
        return defaultDemand(numberOfDevices,installedLoad,CTable)
    },

    /*Fatores de Demanda de Secadora de Roupa, Forno Elétrico, Máquina de Lavar
    Louça e Forno Microondas*/
    [EquipmentTypes.D]: function (numberOfDevices:number,installedLoad:number) {
        const DTable:DEquipmentsData[] = EquipmentTablesMap.get(EquipmentTypes.D)
        return defaultDemand(numberOfDevices,installedLoad,DTable)
    },

    // Fatores de Demanda de Fogões Elétricos
    [EquipmentTypes.E]: function (numberOfDevices:number,installedLoad:number) {
        const ETable:EEquipmentsData[] = EquipmentTablesMap.get(EquipmentTypes.E)
        return defaultDemand(numberOfDevices,installedLoad,ETable)
    },

    // Fatores de Demanda de Hidromassagem
    [EquipmentTypes.I]: function (numberOfDevices:number,installedLoad:number) {
        const ITable:IEquipmentsData[] = EquipmentTablesMap.get(EquipmentTypes.I)
        return defaultDemand(numberOfDevices,installedLoad,ITable)
    },

    // Demanda referente a condicionador de ar tipo janela (f) 
    [EquipmentTypes.F]: function (installedLoad:number){
           return installedLoad
    },

    //Demanda referente a motores e máquinas de solda a motor (g)
    [EquipmentTypes.G]: function (installedLoadList: number[]) {
         const maxinstalledLoad = Math.max(...installedLoadList)
         let demand = 0;
         for (let i =0; i < installedLoadList.length; i++){
             demand += installedLoadList[i] === maxinstalledLoad ? maxinstalledLoad : 0.5* installedLoadList[i]
         }
         return demand
    },

    /*Demanda referente a equipamentos especiais (h)
    [EquipmentTypes.H]: function (numberOfDevices:number,installedLoad:number) {

    },*/

    //Estação de recarga para veículos elétricos (j) 
    [EquipmentTypes.J]: function (installedLoad:number) {
         return installedLoad
    },
    
}