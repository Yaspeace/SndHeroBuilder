<template>
  <div class="home">
    <HeroDice></HeroDice>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HeroDice from "@/components/HeroDice.vue";

@Options({
  components: {
    HeroDice,
  },
})
export default class HomeView extends Vue {}
</script>
