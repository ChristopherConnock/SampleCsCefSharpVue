<template>
  <div>
    <v-toolbar
        dark
      >
      <v-toolbar-title>AIRBUD</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-img contain height="48" src="../assets/logo.svg"></v-img>
      </v-toolbar-items>
      <template v-slot:extension>
        <v-tabs fixed-tabs>
          <v-tab to="/selection">Selection</v-tab>
          <v-tab to="/all">All</v-tab>
          <v-tab to="/schema">Schema</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>
