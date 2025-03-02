<script setup lang="ts">
import CalendarHeader from '@/components/calendar/Header.vue'
import Calendar from '@/components/calendar/Calendar.vue'
import { useCalendarStore } from '@/stores/calendar';
import List from '@/components/calendar/List.vue'

const stoCalendar = useCalendarStore();
</script>

<template>
    <main>
        <CalendarHeader />
        <div class="content">
            <Calendar type="month" :dates="stoCalendar.dates"/>
            <List  />
        </div>
    </main>
</template>

  
<style lang="scss" scoped>
.content {
    padding: 20px;
}

.content {
    padding: 20px;
    padding-bottom:40px;
}

.btn_wrap{
    position: fixed;
    max-width: var(--device-max-width);
    width: 100%;
    bottom:70px;
    left:0;
    right:0;
    margin: 0 auto;
    padding:0 20px;
}

</style>