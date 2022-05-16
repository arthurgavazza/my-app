import { EquipmentTypes } from "../data/demandFactor";

export const Equipments : {[s:string]: {name: string, type: EquipmentTypes}}= {

    Chuveiro: {name: 'Chuveiro Elétrico', type:EquipmentTypes.B},
    Torneira: {name: 'Torneira' ,type:EquipmentTypes.B }, 
    Aquecedor: {name: 'Aquecedor de água', type:EquipmentTypes.B }, 
    Ferro: {name: 'Ferro Elétrico' , type:EquipmentTypes.B },
  
    AquecedorCentral: {name: 'Aquecedor Central' , type:EquipmentTypes.C },
    AquecedorAcumulacao: {name: 'Aquecedor de Acumulação' , type:EquipmentTypes.C },
  
    Secadora: {name: 'Secadora de Roupa' , type:EquipmentTypes.D },
    MaquinaLouca: {name: 'Máquina de Lavar Louça' , type:EquipmentTypes.D },
    Microondas: {name: 'Forno Microondas' , type:EquipmentTypes.D },
  
    Fogao: {name: 'Fogão Elétrico' , type:EquipmentTypes.E },
  
    Arcondicionado: {name: 'Ar-condicionado' , type:EquipmentTypes.F },
  
    Hidromassagem: {name: 'Hidromassagem' , type:EquipmentTypes.I },
  
    VeiculoEletrico: {name: 'Veículo Eletrico' , type:EquipmentTypes.J },
  
    Motor: {name:'Motor', type: EquipmentTypes.G}
  
  }
  