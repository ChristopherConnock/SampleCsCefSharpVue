<template>
  <v-container>
    <v-text-field v-model="fieldName" label="Field Name" single-line></v-text-field>
    <v-select
      v-model="fieldType"
      :items="fieldTypes"
      :hint="`${fieldType.name}, ${fieldType.component}`"
      label="Field Type"
      item-text="name"
      return-object
    ></v-select>
    <component v-bind:is="fieldType.component"></component>
    <v-container>
      <v-btn block color="primary">Add to Schema</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import {
  VColorPicker,
  VDatePicker,
  VTimePicker,
  VRating,
  VSlider,
  VTextarea,
  VSelect } from 'vuetify/lib'
export default {
  components: {
    VColorPicker,
    VDatePicker,
    VTimePicker,
    VRating,
    VSlider,
    VTextarea,
    VSelect
  },
  data: () => ({
    fieldName: '',
    fieldTypes: [
      { name: 'color', component: 'v-color-picker' },
      { name: 'date', component: 'v-date-picker' },
      { name: 'time', component: 'v-time-picker' },
      { name: 'rating', component: 'v-rating' },
      { name: 'slider', component: 'v-slider', options: [] },
      { name: 'textarea', component: 'v-textarea' },
      { name: 'select', component: 'v-select' }
    ],
    fieldType: { name: 'slider', component: 'v-slider' }
  }),

  methods: {
    addField () {
      console.log(this.$store.state)
      this.$store.commit('addField', { name: this.fieldName, type: this.fieldType })
    }
  }
}
</script>
