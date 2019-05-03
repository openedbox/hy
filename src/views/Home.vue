<template>
<div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="已经注册设备" content="2个" :bordered="this.device!=='mobile'"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="传感器数量" content="1个" :bordered="this.device!=='mobile'"/>
        </a-col>

        <a-col :sm="8" :xs="24">
          <head-info title="控制器数量" content="1个"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="传感器列表">
      <a-list size="large">
        <a-list-item :key="index" v-for="(item, index) in sensorData">
          <a-list-item-meta :description="device!=='mobile'?item.description:''">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions" style="width:100px;">
            <a @click="showSensorHistory">历史数据</a>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>唯一标识</span>
              <p>{{ item.id }}</p>
            </div>
            <div class="list-content-item">
              <span>当前值</span>
              <p class="sensor" :style="getSensorColor(sensor)">{{ sensor }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="控制器列表">
      <a-list size="large">
        <a-list-item :key="index" v-for="(item, index) in consoleData">
          <a-list-item-meta :description="device!=='mobile'?item.description:''">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions" style="width:100px;">
            <a-icon v-if="item.state==='CLOSE' && !item.mode" type="play-circle" theme='filled' style="font-size:20px;color:green" @click="start()"/>
             <a-icon v-if="item.state==='OPEN' && !item.mode" type="stop" theme='filled' style="font-size:20px;color:red" @click="stop()"/>
              <a-switch checkedChildren="自动" unCheckedChildren="手动" :checked="item.mode" @change="autochange()"/>
              <a-input v-if="item.mode" size="small" placeholder="温度阈值" v-model="limit" />
          </div>
         
          <div class="list-content">
            <div class="list-content-item">
              <span>唯一标识</span>
              <p>{{ item.id }}</p>
            </div>
            <div class="list-content-item">
              <span>当前状态</span>
              <p class="sensor" :style="getStateColor(item.state)">{{ item.state }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
    <a-modal
      title="传感器历史数据"
      :closable="false"
      v-model="visible"
    >
        <template slot="footer">
          <a-button key="back" @click="handleCancel">关闭</a-button>
      </template>
      <ve-line :data="chartData"></ve-line>
    </a-modal>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import { mixinDevice } from '@/utils/mixin.js'
import { mapState, mapActions } from 'vuex'

const sensorData = []
sensorData.push({
  title: '温度传感器',
  avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549862632308&di=dc982d7f1581839bbdc84b1923b12313&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F60%2F38%2F59fbe76cb5915_610.jpg',
  description: 'DS18B20温度传感器，连接于GPIO-4',
  id: '3Ad13C',
  value: '--'
})

const consoleData = []
consoleData.push({
  title: '马达控制器',
  avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549862734931&di=294d24da6566bb08e65c11d157ea90cd&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F36%2F76%2F5811e4be92a43_610.jpg',
  description: '继电器控制马达，连接于GPIO-24',
  id: '57Da49',
  state: 'CLOSE',
  mode:false
})
const chartData = {
            columns: ['时间', '度量'],
            rows: [
            ]
          }
export default {
  components: {
    HeadInfo,
    
  },
  mixins: [mixinDevice],
  data () { 
    return {
      sensorData,
      consoleData,
      chartData,
      visible:false,
      limit:50,
      idx:0
    }
  },
  mqtt: {
    'mqtt/sensor'  (data, topic) {
      let currentData = this.Uint8ArrayToFloat(data)
      this.setSensor(currentData)

      if(this.consoleData[0].mode && currentData > this.limit) {
          this.start()
      }

      if(this.consoleData[0].mode && currentData < this.limit) {
          this.stop()
      }

      if(this.visible) {
        chartData.rows.push({'时间':this.idx++,'度量':currentData})
      }
      
    }
  },
  methods: {
    ...mapActions(['setSensor']),
    getStateColor(state) {
      if(state==='OPEN') {
        return {
          color:'green'
        }
      } else {
        return {
          color:'red'
        }
      }
    },
    showSensorHistory(){
      this.visible=true
      this.idx=1
    },
    handleCancel(e) {
      this.visible = false;
      chartData.rows=[]
    },
     getSensorColor(sensor) {
      if(sensor<3) {
        return {
          color:'blue'
        }
      } else {
        return {
          color:'red'
        }
      }
    },
    start() {
      this.$mqtt.publish('pi-pan', 'start');
      this.consoleData[0].state='OPEN'
    },
    stop(){
      this.$mqtt.publish('pi-pan', 'stop');
      this.consoleData[0].state='CLOSE'
    },
    autochange(){
      this.consoleData[0].mode = !this.consoleData[0].mode;
      if(this.consoleData[0].mode) {
        this.stop();
      }
    },
    Uint8ArrayToFloat(fileData){
      var dataString = "";
      for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
      }
      return parseFloat(dataString)
    }
  },
  computed: {
      ...mapState({
        sensor: state => state.sensor,
      }),
  },
  mounted () {
    this.$mqtt.subscribe('mqtt/#')
  }
}
</script>

<style lang="less" scoped>
    .ant-avatar-lg {
        width: 48px;
        height: 48px;
        line-height: 48px;
    }
    .sensor {
      font-weight: bold;
    }
    .list-content-item {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            line-height: 20px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
</style>