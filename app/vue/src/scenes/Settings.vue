<template>
  <div class="events-settings">
    <h1>Events</h1>
    <form v-on:submit.prevent="onSubmit">
      <el-row>
         <el-col :span="8">
           <label class="el-form-item__label">Google Maps API key:</label>
         </el-col>
         <el-col :span="16">
           <el-input
             name="api"
             placeholder="API key"
             v-model="api"
             clearable>
           </el-input>
           <el-row>
             <b>You are using The Events built-in Google Maps API key.</b>
           </el-row>
           <small>If you do not add your own API key, the built-in API key will always populate this field and some map-related functionality will be limited.</small>
           <el-row>
             <small><el-link href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank">Click here &nbsp;</el-link> to create your own free Google Maps API key.</small>
           </el-row>
         </el-col>
       </el-row>
       <el-button type="primary" native-type="submit" :loading="loading">Save changes</el-button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '../store'

export default {
  name: 'lfEventsSettings',
  store,
  methods: {
    ...mapActions([
      'saveSettings',
    ]),
    async onSubmit() {
      this.loading = true
      this.saveSettings({
        api: this.api,
        nonce: eventsSettings.nonce,
      })
      this.loading = false
    }
  },
  data() {
    return {
      api: eventsSettings.google_api,
      loading: false
    }
  }
}
</script>

<style>
.event_page_events-settings div#wpwrap{
  background: #fff;
}

.event_page_events-settings div#wpwrap #wpcontent{
  padding-right: 20px;
}
</style>

<style scoped>
.events-settings{
  margin-top: 50px;
}
h1{
  margin-bottom: 50px;
}
.el-button{
  margin-top: 20px;
}
.el-col-16{
  padding-right: 10px;
}
small .el-link{
  font-size: 10px;
}

small{
  display: flex;
}

.el-input{
  margin-bottom: 10px;
}
</style>
