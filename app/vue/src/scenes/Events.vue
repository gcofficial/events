<template>
  <div class="lf-events">
    <header>
      <h1>{{ header }}</h1>
      <div class="buttons">
        <el-button icon="el-icon-arrow-left" circle v-on:click="prev"></el-button>
        <el-button icon="el-icon-arrow-right" circle v-on:click="next"></el-button>
      </div>
    </header>
    <lf-event
      v-for="(event, index) in events"
      :class="{
        first: index === 0,
        last: index === events.length - 1,
        ['color-' + (index % 5)]: true
      }"
      :key="event.ID"
      :event="event"></lf-event>
    <div v-if="!events.length" class="no-events">No events</div>
  </div>
</template>

<script>
// import moment from 'moment'
import Event from '@/components/Event'
import { mapActions, mapState, mapGetters } from 'vuex'
import store from '../store'

export default {
  name: 'lf-events',
  store,
  components: {
    'lf-event': Event
  },
  computed: {
    ...mapState(['events']),
    ...mapGetters(['from', 'to', 'header'])
  },
  async mounted() {
    await this.loadGoogle()
    await this.loadEvents()
    await this.loadLatLng()
  },
  methods: {
    ...mapActions([
      'loadEvents',
      'loadLatLng',
      'loadGoogle',
      'nextMonth',
      'prevMonth',
    ]),
    async prev() {
      await this.prevMonth()
      await this.loadEvents()
      await this.loadLatLng()
    },
    async next() {
      await this.nextMonth()
      await this.loadEvents()
      await this.loadLatLng()
    }
  }
}
</script>

<style scoped>
  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
