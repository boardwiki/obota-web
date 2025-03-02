<script setup lang="ts">
import { onMounted } from 'vue';
import { useCalendarStore } from '@/stores/calendar';

const props = defineProps<{
  type: string;
  dates : number[][];
}>();

const stoCalendar = useCalendarStore();

const days:string[] = ['일', '월', '화', '수', '목', '금', '토'];

async function changeWeek(arg: number) {
    await stoCalendar.changeWeek(arg);
}

async function changeMonth(arg: number) {
    stoCalendar.viewDay = -1;
    await stoCalendar.calendarData(arg,stoCalendar.setMonth,stoCalendar.setYaer);
}

function selectDate(day: number) {
    stoCalendar.viewDay = day;
    stoCalendar.set_week(day);
}

function getDayClass(day: number, idx: number, secondIdx: number) {
    return {
        'has-text-danger'    : stoCalendar.dates.length - 1 === idx && stoCalendar.nextMonthStart > day,
        'has-text-info-dark' : idx === 0 && day >= stoCalendar.lastMonthStart,
        'today'              : day === stoCalendar.today && stoCalendar.setMonth === stoCalendar.currentMonth && stoCalendar.setYaer === stoCalendar.currentYear,
        'pick'               : day === stoCalendar.viewDay,
        'has-text-primary'   : day === stoCalendar.today && stoCalendar.setMonth === stoCalendar.currentMonth && stoCalendar.setYaer === stoCalendar.currentYear,
    };
}

onMounted(async () => {
    await stoCalendar.calendarData(13,stoCalendar.setMonth,stoCalendar.setYaer);
});
</script>

<template>

    <div class="calendar_wrap">
        <div class="top">
            <button class="button" @click="type == 'week' ? changeWeek(-1) : changeMonth(-1)">
                <font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" />
            </button>
            <span> {{ stoCalendar.setYaer }}.{{stoCalendar.setMonth < 10?  0 : ''}}{{stoCalendar.setMonth}} </span>
            <button class="button" @click="type == 'week' ? changeWeek(1) : changeMonth(1)">
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" />
            </button>
        </div>

        <div class="info">
            <ul>
                <li class="cal_icon3"><span >Event</span></li>
                <li class="cal_icon2"><span >Crew</span></li>
                <li class="cal_icon1"><span >My</span></li>
            </ul>
        </div>

        <div class="dates_wrap">
            <ul class="name">
                <li v-for="day in days" :key="day">{{ day }}</li>
            </ul>

            
            <ul v-for="(week, idx) in dates" :key="idx" class="dates" >
                <li v-for="(day, secondIdx) in week" :key="secondIdx" :class="getDayClass(day, idx, secondIdx)">
                    <button @click="selectDate(day)" v-if="day > 0" class="day_btn">
                    <span>{{ day }}</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

  
  <style lang="scss" scoped>
  .content {
    padding: 20px;
  }

  .top{
    text-align: center;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;
    padding:10px 0;

    span{
        font-size:var(--f-theme-regular);
        padding: 0 20px;
        line-height: 24px;
    }
    button{
        height: 24px;
    }
  }

  .info ul{
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    padding-bottom:20px;
    padding-top:15px;

    li:before{
        content:"";
        display: inline-block;
        border-radius: 50%;
        width:16px;
        height:16px;
        margin-right:5px;
        vertical-align: top;
    }

    li.cal_icon1:before{
        background: var(--c-lnk-dark);
    }

    li.cal_icon2:before{
        background: var(--c-lnk-dark);
    }
    
    li.cal_icon3:before{
        background: var(--c-lnk-dark);
    }

    li{
        margin-left:20px;
        line-height: 16px;
    }

    li span{
        display: inline-block;
    }
  }


  .dates_wrap{
    
    .name, .dates{
        display: flex;
        > li{
            width: calc(100% / 7);
            text-align: center;
        }
    }
    .name{
        li{
            padding-bottom:10px;
        }
    }

    .dates{
        > li{
            border-top:1px solid var(--c-lnk-dark);
            border-right:1px solid var(--c-lnk-dark);
            min-height:75px;
            font-size:var(--f-theme-tiny);
        }

        > li:first-child{
            border-left:1px solid var(--c-lnk-dark)
        }
        
        button{
            width:100%;
            padding:10px;
        }

        .day_btn span{
            display: inline-block;
            width: 16px;
            height:16px;
            line-height:16px;            
        }

        .today .day_btn span{
            background: var(--c-theme-blue);
            color:var(--c-lnk-white);
            border-radius: 50%;
        }

        .pick .day_btn span{
            background: var(--c-lnk-dark);
            border-radius: 50%;
            color:var(--c-lnk-white);
        }
    }

    .dates:last-child > li {
        border-bottom: 1px solid var(--c-lnk-dark);
    }
  }
  </style>