<template>
  <div class="event-options">
    <el-row>
      <el-col :span="8">
        <label class="el-form-item__label">Time & date:</label>
      </el-col>
      <el-col :span="16">
        <el-date-picker
          v-model="ft"
          type="datetimerange"
          :picker-options="pickerOptions"
          start-placeholder="Start date"
          end-placeholder="End date"
          align="right">
        </el-date-picker>
        <input type="hidden" name="from" ref="from" :value="fromValue">
        <input type="hidden" name="to" ref="to" :value="toValue">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label class="el-form-item__label">Location:</label>
      </el-col>
      <el-col :span="16">
        <el-input
          name="location"
          placeholder="Enter a location"
          v-model="loc"
          ref="location"
          clearable>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '../store'

export default {
  name: 'app',
  store,
  props: ['location', 'from', 'to'],
  computed: {
    fromValue() {
      return this.getDateFromArray(this.ft, 0)
    },
    toValue() {
      return this.getDateFromArray(this.ft, 1)
    }
  },
  data() {
    return {
      loc: '',
      ft: '',
      googleAutocomplete: null,
      pickerOptions: {
        shortcuts: [
          {
            text: 'Next day',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Next week',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Next month',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
        ]
      },
    }
  },
  async mounted() {
    this.loc = this.location
    this.ft = [this.from, this.to]
    await this.loadGoogle()
    let inputEl = this.$refs.location.$el.getElementsByTagName('input')[0]
    let input = new google.maps.places.Autocomplete(inputEl)

    google.maps.event.addDomListener(
      inputEl,
      'keydown',
      function(e) {
        if (e.keyCode == 13) {
          e.preventDefault()
        }
      }
    )

    this.googleAutocomplete = input
  },
  methods: {
    ...mapActions([
      'loadGoogle',
    ]),
    getDateFromArray(arr, index) {
      if (arr instanceof Array) {
        if ('object' === typeof(arr[index])) {
          return arr[index].toISOString().slice(0, 19).replace('T', ' ')
        }
        return arr[index]
      }
      return ''
    }
  }
}
</script>

<style>
  .el-input .el-input__inner{
    box-shadow: none;
  }
  div.el-date-editor .el-range-input,
  div.el-date-editor .el-range-separator{
    text-align: left;
  }
</style>

<style scoped>
  .el-row{
    margin-top: 10px;
  }
  .el-date-editor.el-input__inner{
    width: 100%;
  }

  label{
    font-weight: bold;
  }
  .selected-address{
    margin-top: 10px;
    display: block;
  }
</style>
