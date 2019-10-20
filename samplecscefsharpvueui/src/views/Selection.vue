<template>
  <v-container>
    <v-text-field v-model="guid" label="GUID" placeholder="..." disabled></v-text-field>
    <v-text-field v-model="name" label="Name" placeholder="..." disabled></v-text-field>
    <v-text-field v-for="(item, index) in userdata" v-model="item.value" v-bind:key="index" v-bind:label="item.key" placeholder="..." disabled></v-text-field>
  </v-container>
</template>

<script>
import { EventBus } from '../eventbus'
export default {
  data: () => ({
    guid: '',
    name: '',
    layer: '',
    userdata: ''

  }),
  methods: {
    doSomethingRhino () {
      let args = { location: [0, 0, 0], radius: 20 }
      // eslint-disable-next-line
        Interop.doSomething(args)
    }
  },
  mounted () {
    EventBus.$on('SET_TEXT', (data) => {
      console.log('HelloWorld: ' + data)
      let jsonData = JSON.parse(data)
      console.log(jsonData)
      this.guid = jsonData.guid
      this.name = jsonData.name
      this.userdata = jsonData.userdata
    })
  }
}
</script>
