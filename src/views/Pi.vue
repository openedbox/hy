<template>
<div>
 

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="传感器列表">
      <a-list size="large">
        <a-list-item :key="index" v-for="(item, index) in sensorData">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions" style="width:100px;">
            <a>详细信息</a>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>唯一标识</span>
              <p>{{ item.id }}</p>
            </div>
            <div class="list-content-item">
              <span>当前值</span>
              <p>{{ item.value }}</p>
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
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions" style="width:100px;">
            <a-icon type="play-circle" theme='filled' style="font-size:20px"/>
          </div>
         
          <div class="list-content">
            <div class="list-content-item">
              <span>唯一标识</span>
              <p>{{ item.id }}</p>
            </div>
            <div class="list-content-item">
              <span>当前状态</span>
              <p>{{ item.state }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
    
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
const sensorData = []
sensorData.push({
  title: '温度传感器',
  avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549862632308&di=dc982d7f1581839bbdc84b1923b12313&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F60%2F38%2F59fbe76cb5915_610.jpg',
  description: 'DS18B20温度传感器，连接于GPIO-4',
  id: '3Ad13C',
  value: '60.2'
})

const consoleData = []
consoleData.push({
  title: '马达控制器',
  avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549862734931&di=294d24da6566bb08e65c11d157ea90cd&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F36%2F76%2F5811e4be92a43_610.jpg',
  description: '继电器控制马达，连接于GPIO-2',
  id: '57Da49',
  state: 'OPEN'
})
export default {
  components: {
    HeadInfo
  },
  data () {
    return {
      sensorData,
      consoleData
    }
  },
  mqtt: {
    'mqtt/sensor'  (data, topic) {
      console.info(this.Uint8ArrayToString(data))
    }
  },
  methods: {
    Uint8ArrayToString(fileData){
      var dataString = "";
      for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
      }
    
      return dataString
    }
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