<template>
  <v-app-bar app color="primary" dark>
    <v-row align="center" no-gutters>
      <v-col cols="2">
        <span class="headline">Perf.io</span>
      </v-col>
      <v-col cols="8">
        <v-row align="center">
          <v-col cols="1">
            <p>Hello</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <p>Hello</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <v-img :src="logo" alt="logo" height="60px" />
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <p>Hello</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <p>Hello</p>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2" align="right">
        <v-avatar>
          <v-img :src="avatar" alt="Avatar" height="40px" />
        </v-avatar
      ></v-col>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts" setup>
import logo from '@/assets/dumbbell.png'
import avatar from '@/assets/test.jpeg'
</script>

<style scoped>
.v-app-bar {
  padding: 0 15px;
}

.mb-1 {
  margin-bottom: 0.5rem;
}
.mt-0 {
  margin-top: 0;
}

.router-link {
  text-decoration: none;
}

.headline {
  font-size: 30px;
  font-weight: bold;
}

.v-avatar {
  margin-right: 40px;
}
</style>
