<template>
  <div class="home">
    <HeroDice style="width: 30%"></HeroDice>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import HeroDice from "@/components/HeroDice.vue";

@Options({
  components: {
    HelloWorld,
    HeroDice,
  },
})
export default class HomeView extends Vue {}
</script>
