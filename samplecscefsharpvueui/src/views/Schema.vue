<template>
  <v-container>
    <v-subheader>NEW FIELD</v-subheader>
    <v-spacer ></v-spacer>
    <CreateField/>
    <v-subheader>EXISTING FIELDS</v-subheader>
    <v-spacer ></v-spacer>
    <v-divider></v-divider>
    {{this.$store.state.desc}}
    {{this.$store.state.fields[0].name}}
    <!-- <v-list>
      <v-list-item
        v-for="field in this.$store.state.fields"
        :key="field.name"
      >
      1
      </v-list-item>
    </v-list> -->
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
