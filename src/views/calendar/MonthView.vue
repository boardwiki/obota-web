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
    padding-bottom:100px;
}

</style>