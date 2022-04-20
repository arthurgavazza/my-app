export enum EquipmentTypes {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
}
export type AEquipmentsData = {
    installedLoad: {
        min: number | null,
        max: number | null
    },
    demandFactor: number
}
const AData: AEquipmentsData[] = [
    {
        installedLoad: {
            min: null,
            max: 1
        },
        demandFactor: 0.86
    },
    {
        installedLoad: {
            min: 1,
            max: 2
        },
        demandFactor: 0.75
    },
    {
        installedLoad: {
            min: 2,
            max: 3
        },
        demandFactor: 0.66
    },
    {
        installedLoad: {
            min: 3,
            max: 4
        },
        demandFactor: 0.59
    },
    {
        installedLoad: {
            min: 4,
            max: 5
        },
        demandFactor: 0.52
    },
    {
        installedLoad: {
            min: 5,
            max: 6
        },
        demandFactor: 0.45
    },
    {
        installedLoad: {
            min: 6,
            max: 7
        },
        demandFactor: 0.40
    },
    {
        installedLoad: {
            min: 7,
            max: 8
        },
        demandFactor: 0.35
    },
    {
        installedLoad: {
            min: 8,
            max: 9
        },
        demandFactor: 0.31
    },
    {
        installedLoad: {
            min: 9,
            max: 10
        },
        demandFactor: 0.27
    },
    {
        installedLoad: {
            min: 10,
            max: null
        },
        demandFactor: 0.24
    }
]

export type BEquipmentsData = {
    numberOfDevices: number,
    demandFactor: number
}
const BData: BEquipmentsData[] = [
    {
        numberOfDevices: 1,
        demandFactor: 1
    },

    {
        numberOfDevices: 2,
        demandFactor: 1
    },
    {
        numberOfDevices: 3,
        demandFactor: 0.84
    },
    {
        numberOfDevices: 4,
        demandFactor: 0.76
    },
    {
        numberOfDevices: 5,
        demandFactor: 0.7
    },
    {
        numberOfDevices: 6,
        demandFactor: 0.65
    },
    {
        numberOfDevices: 7,
        demandFactor: 0.6
    },
    {
        numberOfDevices: 8,
        demandFactor: 0.57
    },
    {
        numberOfDevices: 9,
        demandFactor: 0.54
    },
    {
        numberOfDevices: 10,
        demandFactor: 0.52
    },
    {
        numberOfDevices: 11,
        demandFactor: 0.49
    },
    {
        numberOfDevices: 12,
        demandFactor: 0.48
    },
    {
        numberOfDevices: 13,
        demandFactor: 0.46
    },
    {
        numberOfDevices: 14,
        demandFactor: 0.45
    },
    {
        numberOfDevices: 15,
        demandFactor: 0.44
    },
    {
        numberOfDevices: 16,
        demandFactor: 0.43
    },
    {
        numberOfDevices: 17,
        demandFactor: 0.42
    },
    {
        numberOfDevices: 18,
        demandFactor: 0.41
    },
    {
        numberOfDevices: 19,
        demandFactor: 0.4
    },
    {
        numberOfDevices: 20,
        demandFactor: 0.4
    },
    {
        numberOfDevices: 21,
        demandFactor: 0.39
    },
    {
        numberOfDevices: 22,
        demandFactor: 0.39
    },
    {
        numberOfDevices: 23,
        demandFactor: 0.39
    },
    {
        numberOfDevices: 24,
        demandFactor: 0.38
    },
]

export type CEquipmentsData = {
    numberOfDevices: number,
    demandFactor: number
}
const CData: CEquipmentsData[] = [
    {
        numberOfDevices: 1,
        demandFactor: 1
    },

    {
        numberOfDevices: 2,
        demandFactor: 0.72
    },
    {
        numberOfDevices: 3,
        demandFactor: 0.62
    },
    
]

export type DEquipmentsData = {
    numberOfDevices: number,
    demandFactor: number
}
const DData: DEquipmentsData[] = [
    {
        numberOfDevices: 1,
        demandFactor: 1
    },

    {
        numberOfDevices: 2,
        demandFactor: 0.7
    },

    {
        numberOfDevices: 3,
        demandFactor: 0.7
    },

    {
        numberOfDevices: 4,
        demandFactor: 0.7
    },
    
    {
        numberOfDevices: 5,
        demandFactor: 0.6
    },
    
    {
        numberOfDevices: 6,
        demandFactor: 0.6
    },

    {
        numberOfDevices: 7,
        demandFactor: 0.5
    },

    {
        numberOfDevices: 8,
        demandFactor: 0.5
    },
]

export type EEquipmentsData = {
    numberOfDevices: number,
    demandFactor: number,
    max?:number,
    min?:number
}
const EData: EEquipmentsData[] = [
    {
        numberOfDevices: 1,
        demandFactor: 1
    },

    {
        numberOfDevices: 2,
        demandFactor: 0.6
    },
    {
        numberOfDevices: 3,
        demandFactor: 0.48
    },
    {
        numberOfDevices: 4,
        demandFactor: 0.40
    },
    {
        numberOfDevices: 5,
        demandFactor: 0.37
    },
    {
        numberOfDevices: 6,
        demandFactor: 0.35
    },
    {
        numberOfDevices: 7,
        demandFactor: 0.33
    },
    {
        numberOfDevices: 8,
        demandFactor: 0.32
    },
    {
        numberOfDevices: 9,
        demandFactor: 0.31
    },

    
]

export type IEquipmentsData = {
    numberOfDevices: number,
    demandFactor: number
}
const IData: IEquipmentsData[] = [
    {
        numberOfDevices: 1,
        demandFactor: 1
    },

    {
        numberOfDevices: 2,
        demandFactor: 0.56
    },
    {
        numberOfDevices: 3,
        demandFactor: 0.47
    },
    {
        numberOfDevices: 4,
        demandFactor: 0.39
    },
]

export const EquipmentTablesMap = new Map<EquipmentTypes, any>([
    [EquipmentTypes.A, AData],
    [EquipmentTypes.B, BData],
    [EquipmentTypes.C, CData],
    [EquipmentTypes.D, DData],
    [EquipmentTypes.E, EData],
    [EquipmentTypes.I, IData],
]);

