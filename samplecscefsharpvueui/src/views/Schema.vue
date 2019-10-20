<template>
  <v-container>
    <v-subheader>NEW FIELD</v-subheader>
    <v-spacer ></v-spacer>
    <CreateField/>
    <v-subheader>EXISTING FIELDS</v-subheader>
    <v-spacer ></v-spacer>
    <v-divider></v-divider>
    <v-list>
      <v-list-item two-line v-for="field in this.$store.state.fields"
        :key="field.name">
      <v-list-item-content>
        <v-list-item-title>{{field.name}}</v-list-item-title>
        <v-list-item-subtitle>{{field.type.name}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import CreateField from '@/components/CreateField'

export default {
  components: {
    CreateField
  },
  data: () => ({
    schema: [
      {
        fieldType: 'color'

      }
    ]
  })
}
</script>
