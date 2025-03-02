import { defineStore } from 'pinia';

export type RootState = {
  dates             : any[];
  lastMonthStart    : number;
  nextMonthStart    : number;
  currentYear       : number;
  currentMonth      : number;
  setYaer           : number;
  setMonth          : number;
  today             : number;
  viewDay           : number;
  weekIndex         : number;
};

export const useCalendarStore = defineStore({
  id: 'calendar',
  state: () => ({
    dates: [],
    lastMonthStart  : -1,
    nextMonthStart  : -1,
    setYaer         : -1,
    setMonth        : -1,
    currentYear     : -1,
    currentMonth    : -1,
    today           : -1,
    viewDay         : -1,
    weekIndex       : 0,
  }) as RootState,
  actions: {
        async calendarData(arg: number,month?:number,year?:number) {
            const getArg        = await this.getMoveMonth(arg, month ? month :this.currentMonth, year? year:this.currentYear);
            this.setYaer        = getArg.year;
            this.setMonth       = getArg.month;

            const [monthFirstDay, monthLastDate, lastMonthLastDate] = await this.getFirstDayLastDate(this.setYaer,this.setMonth);

            const getDate       = await this.getMonthOfDays(monthFirstDay, monthLastDate, lastMonthLastDate);

            this.dates          = getDate.dates;

            this.nextMonthStart = getDate.nextMonthStart;
            this.lastMonthStart = getDate.lastMonthStart;

            if(!this.weekIndex)
                await this.set_week(this.today);
        },
        
        async getMoveMonth(
            arg     : number,
            month   : number,
            year    : number
        ) {
            if (arg < 0) {
                month -= 1;
            } else if (arg === 1) {
                month += 1;
            }

            if (month === 0) {
                year -= 1;
                month = 12;
            } else if (month > 12) {
                year += 1;
                month = 1;
            }

            if(month==-1 || year==-1 ){
                const date              = new Date();
                year                    = date.getFullYear();
                month                   = date.getMonth() + 1
                this.currentMonth       = month;
                this.currentYear        = year
                this.today              = date.getDate() 
            }

            return {
                year: year,
                month: month,
            };
        },

        async getMonthOfDays(
            monthFirstDay: number,
            monthLastDate: number,
            prevMonthLastDate: number,
        ) {
            let day = 1;
            let prevDay = (prevMonthLastDate - monthFirstDay) + 1;
            const date = [];
            let weekOfDays = [];
            let lastMonthStart = 0;

            while (day <= monthLastDate) {
                if (day === 1) {
                    for (let j = 0; j < monthFirstDay; j += 1) {
                        if (j === 0) lastMonthStart = prevDay;
                        weekOfDays.push(0);
                        prevDay += 1;
                    }
                }
                weekOfDays.push(day);
                if (weekOfDays.length === 7) {
                    date.push(weekOfDays);
                    weekOfDays = [];
                }
                day += 1;
            }

            const len = weekOfDays.length;

            if (len > 0 && len < 7) {
                for (let k = 1; k <= 7 - len; k += 1) {
                    weekOfDays.push(0);
                }
            }

            if (weekOfDays.length > 0) date.push(weekOfDays);

            return {
                dates: date,
                nextMonthStart: weekOfDays[0],
                lastMonthStart: lastMonthStart,
            };
        },

        async set_week(day:number|null){
            if(!day){
                this.weekIndex = 0;
            }else{
                for (let i = 0; i < this.dates.length; i++) {
                    const subArray = this.dates[i];
                    if (subArray.includes(day))
                      this.weekIndex = i;
                }
            }
        },

        async changeWeek(arg:number){
            this.viewDay = -1;
            if (arg < 0) {
                this.weekIndex -=1;
                if(this.weekIndex < 0){
                    await this.calendarData(arg,this.setMonth,this.setYaer);
                    this.weekIndex = this.dates.length-1;
                }
            } else if (arg === 1) {
                this.weekIndex +=1;
                if(this.weekIndex == this.dates.length){
                    await this.calendarData(arg,this.setMonth,this.setYaer);
                    this.weekIndex = 0;
                }

            }
        },
        
        async getFirstDayLastDate(
            year: number,
            month: number
        ) {
            const firstDay = new Date(year, month - 1, 1).getDay();
            const lastDate = new Date(year, month, 0).getDate();
            let lastYear = year;
            let lastMonth = month - 1;
            if (month === 1) {
                lastMonth = 12;
                lastYear -= 1;
            }
            const prevLastDate = new Date(lastYear, lastMonth, 0).getDate();
            return [firstDay, lastDate, prevLastDate];
        },
    },
});
