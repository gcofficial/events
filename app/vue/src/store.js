import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'
import { get } from 'lodash'
import objectToFormData from '../pure/objectToFormData'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    events: [],
    dataPoint: moment()
  },
  getters: {
    from: state => {
      return state.dataPoint.startOf('month').format().substr(0, 10)
    },
    to: state => {
      return state.dataPoint.endOf('month').format().substr(0, 10)
    },
    header: state => {
      return state.dataPoint.format('MMMM, YYYY')
    }
  },
  mutations: {
    setEvents(state, payload) {
      state.events = payload
    },
    setDataPoint(state, payload) {
      state.dataPoint = payload.clone()
    }
  },
  actions: {
    async nextMonth({ state, commit }) {
      commit('setDataPoint', state.dataPoint.add('1', 'M'))
    },
    async prevMonth({ state, commit }) {
      commit('setDataPoint', state.dataPoint.subtract('1', 'M'))
    },
    async saveSettings(context, data) {
      return axios({
        method: 'post',
        url: eventsSettings.ajax_url,
        data: objectToFormData({
          action: 'lf-events-save-settings',
          ...data,
        }),
        headers: {
          'content-type': `multipart/form-data;`,
        },
      })
    },
    async loadEvents({ commit, getters }) {
      const {
        from,
        to,
      } = getters
      const res = await axios({
        method: 'post',
        url: eventsSettings.ajax_url,
        data: objectToFormData({
          action: 'lf-events-get',
          from,
          to,
        }),
        headers: {
          'content-type': `multipart/form-data;`,
        },
      })
      commit('setEvents', res.data.data)
    },
    async loadLatLng({ commit, state, dispatch }) {
      let events = [ ...state.events ]
      events = events.map(
        async el => {
          if (el.meta.location) {
            let res = await dispatch('getLatLng', {
              address: el.meta.location,
              key: eventsSettings.google_api,
            })
            el = {
              ...el,
              location: get(res, 'data.results.0.geometry.location', { lat: 0, lng: 0 })
            }
          }
          return el
        }
      )
      commit('setEvents', await Promise.all(events))
    },
    async getLatLng(context, { address, key }) {
      return await axios({
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${ address }&key=${ key }`,
      })
    },
    async loadGoogle() {
      return new Promise(
        resolve => {
          const id = 'google-map-script'
          if (null == document.getElementById(id)) {
            let google = document.createElement('script')
            google.setAttribute(
              'src',
              `https://maps.googleapis.com/maps/api/js?key=${ eventsSettings.google_api }&libraries=places`
            )
            google.setAttribute('id', id)
            google.onload = () => {
              resolve('loaded')
            }
            document.head.appendChild(google)
          } else {
            resolve('Already loaded')
          }
        }
      )
    }
  }
})