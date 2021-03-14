export interface IDay {
    id: number,
    weekDay: string,
    bedTime: null,
    nextDayAlarm: string 
}

export interface IAlarm {
    id: number,
    monday: IDay,
    tuesday: IDay,
    wednesday: IDay,
    thursday: IDay,
    friday: IDay,
    saturday: IDay,
    sunday: IDay
}