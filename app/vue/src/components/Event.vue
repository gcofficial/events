<template>
  <div class="lf-event" :class="style">
    <div class="lf-event-header" v-on:click="toggleOpen">
      <div class="left">
        <div class="from">
          <div class="day">{{ fromDay }}</div>
          <div class="month">{{ fromMonth }}</div>
        </div>
        <div class="delimiter">-</div>
        <div class="to">
          <div class="day">{{ toDay }}</div>
          <div class="month">{{ toMonth }}</div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          {{ event.post_title }}
        </div>
        <div class="location">
          <i class="el-icon-time"></i> {{ fromTime }} - {{ toTime }} <i class="el-icon-location-outline"></i>{{ event.meta.location }}
        </div>
      </div>
    </div>
    <div v-if="isOpen" class="lf-event-content">
      <div v-if="img" class="img" :style="{ backgroundImage: `url('${ img }')` }"></div>
      <div v-if="event.post_content" class="description">
        <div class="description-title">Event Details</div>
        {{ event.post_content }}
      </div>
      <div v-if="map" class="google-map" ref="googleMap"></div>
      <form v-if="map" action="https://maps.google.com/maps" method="get" target="_blank" _lpchecked="1">
        <input type="hidden" name="daddr" :value="event.meta.location">
        <el-input placeholder="Type your address to get directions" name="saddr" v-model="direction" class="input-with-select">
          <el-button slot="append" native-type="submit" icon="el-icon-map-location"></el-button>
        </el-input>
      </form>
      <div class="socials">
        <el-button circle v-on:click="shareFacebook" title="Share on Facebook">
          <svg width="16" height="14" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 12.054,32l 5.996,0 l 0.004-16l 5.446-0.002l 0.584-5.514L 18.050,10.484 l 0.008-2.76c0-1.438, 0.098-2.208, 2.162-2.208l 3.812,0 L 24.032,0 L 18.566,0 C 13.268,0, 12.048,2.738, 12.048,7.236l 0.006,3.248L 8.032,10.486L 8.032,16 l 4.022,0 L 12.054,32 z"></path></g></svg>
        </el-button>
        <el-button circle v-on:click="shareTwitter" title="Share on Twitter">
          <svg width="16" height="14" viewBox="0 0 32.003997802734375 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 31.118,3.48c-1.268,0.752-2.674,1.298-4.17,1.594C 25.75,3.796, 24.044,3, 22.156,3 c-3.626,0-6.566,2.94-6.566,6.564c0,0.514, 0.058,1.016, 0.17,1.496c-5.456-0.274-10.294-2.888-13.532-6.86 C 1.662,5.168, 1.34,6.296, 1.34,7.5c0,2.278, 1.16,4.288, 2.92,5.464C 3.184,12.928, 2.172,12.632, 1.286,12.14c0,0.028,0,0.054,0,0.082 c0,3.18, 2.264,5.834, 5.266,6.438C 6.002,18.81, 5.422,18.89, 4.822,18.89c-0.424,0-0.834-0.042-1.236-0.118 c 0.836,2.608, 3.26,4.506, 6.132,4.56c-2.246,1.76-5.078,2.81-8.154,2.81c-0.53,0-1.052-0.032-1.566-0.092 C 2.904,27.912, 6.354,29, 10.062,29c 12.076,0, 18.68-10.004, 18.68-18.68c0-0.284-0.006-0.568-0.020-0.85 c 1.286-0.922, 2.4-2.078, 3.28-3.394c-1.178,0.522-2.442,0.876-3.77,1.034C 29.588,6.298, 30.628,5.010, 31.118,3.48z"></path></g></svg>
        </el-button>
        <el-button circle v-on:click="shareLinkedin" title="Share on Linkedin">
          <svg width="16" height="14" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 2.064,10L 8,10L 8,32L 2.064,32zM 20.174,10.002C 18,10.002, 16.916,11.038, 16,11.74L 16,10 L 10.032,10 l0,22 L 16,32 L 16,18.15 c0,0-0.218-2.758, 3.088-2.758 C 21.080,15.392, 22,16.526, 22,18.15L 22,32 l 6.288,0 L 28.288,18.344 C 28.288,10.844, 22.25,10.002, 20.174,10.002zM 2,5A3,3 1080 1 0 8,5A3,3 1080 1 0 2,5z"></path></g></svg>
        </el-button>
        <el-button circle v-on:click="shareMail" title="Share on Mail">
          <svg width="16" height="14" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 30,8L 2,8 C 0.896,8,0,8.896,0,10l0,20 c0,1.104, 0.896,2, 2,2l 28,0 c 1.104,0, 2-0.896, 2-2L 32,10 C 32,8.896, 31.104,8, 30,8z M 11.36,22.054l 4.644,3.156l 4.616-3.178L 28.586,30L 3.414,30 L 11.36,22.054z M 2,28.586L 2,15.69 l 7.676,5.218L 2,28.586z M 22.294,20.88 L 30,15.576l0,13.010 L 22.294,20.88z M 30,10l0,3.236 l-0.042-0.060l-13.962,9.614L 2,13.274L 2,10 L 30,10 z"></path></g></svg>
        </el-button>
      </div>
      <div v-on:click="toggleOpen" class="back-to-top">
        <i class="el-icon-arrow-up"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { get } from 'lodash'

export default {
  name: 'lf-event',
  props: [
    'event',
  ],
  data() {
    return {
      isOpen: false,
      map: undefined,
      direction: ''
    }
  },
  computed: {
    fromDay() {
      return moment(this.event.meta.from).date()
    },
    fromMonth() {
      return moment(this.event.meta.from).format('MMM')
    },
    fromTime() {
      return moment(this.event.meta.from).format('h:mm:ss a')
    },
    toDay() {
      return moment(this.event.meta.to).date()
    },
    toMonth() {
      return moment(this.event.meta.to).format('MMM')
    },
    toTime() {
      return moment(this.event.meta.to).format('h:mm:ss a')
    },
    img() {
      return this.event.image.src
    },
    style() {
      return {
        opened: this.isOpen,
      }
    }
  },
  watch: {
    isOpen(newVal) {
      Vue.nextTick(() => {
        if (true === newVal && this.map) {
          this.$refs.googleMap.append(get(this.map, '__gm.$', ''))
        }
      })
    },
    event(newVal) {
      if (newVal.location && newVal.location.lat) {
        let div = document.createElement('div')
        div.style.height = '100%'
        this.map = new google.maps.Map(
          div,
          {
            center: { lat: newVal.location.lat, lng: newVal.location.lng },
            zoom: 8
          }
        )
      }
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    windowOpen(url) {
      window.open(url, '', 'left=50,top=50,width=600,height=350,toolbar=0')
    },
    shareFacebook() {
      this.windowOpen(`http://www.facebook.com/sharer.php?u=${ window.location.href }`)
    },
    shareTwitter() {
      this.windowOpen(`https://twitter.com/intent/tweet?text=${ window.location.href }`)
    },
    shareLinkedin() {
      this.windowOpen(`https://www.linkedin.com/sharing/share-offsite/?url=${ window.location.href }`)
    },
    shareMail() {
      let subject = this.event.post_title
      let body = [
        `From: ${ this.event.meta.from }`,
        `To: ${ this.event.meta.to }`,
        `Location: ${ this.event.meta.location }`,
        this.event.post_content,
      ].join("%0A")
      window.open(`mailto:?subject=${ subject }&body=${ body }`)
    }
  }
}
</script>

<style>
.lf-event {
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', sans-serif;
}

.lf-event-header {
  display: flex;
  padding: 16px 16px 32px 16px;
  align-items: center;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.01);
  color: #fff;
}

.lf-event-header:hover{
  background: rgba(0, 0, 0, 0.01);
}

.lf-event.first .lf-event-header{
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}

.lf-event.last:not(.opened) .lf-event-header{
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

.lf-event-header .left{
  display: flex;
  padding-right: 16px;
}

.lf-event-header .left .from,
.lf-event-header .left .to{
  display: flex;
  flex-direction: column;
}

.delimiter{
  margin: 0 8px;
}

.delimiter,
.lf-event-header .left .day{
  font-size: 30px;
  line-height: 75%;
  font-weight: 600;
}

.lf-event-header .left .month{
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
}

.lf-event-header .title{
  font-size: 30px;
  font-weight: 600;
}

.lf-event-header .location{
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.lf-event .description{
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.lf-event .description .description-title{
  font-weight: 600;
  font-size: 24px;
}

.lf-event .time-location{
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.lf-event .google-map{
  height: 200px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.lf-event .socials{
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  padding: 16px;
}

.lf-event .back-to-top{
  display: flex;
  padding: 16px;
  background: rgba(0, 0, 0, 0.01);
  justify-content: center;
  color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.lf-event .back-to-top:hover{
  background: rgba(0, 0, 0, 0.05);
}

.lf-event .img{
  height: 300px;
  background-size: cover;
}

.color-0 .lf-event-header{
  background: #F20F38;
}

.color-1 .lf-event-header{
  background: #4F698C;
}

.color-2 .lf-event-header{
  background: #89ABD9;
}

.color-3 .lf-event-header{
  background: #ACD1F2;
}

.color-4 .lf-event-header{
  background: #F2BE7E;
}
</style>
