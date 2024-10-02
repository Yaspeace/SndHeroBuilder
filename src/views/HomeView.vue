<template>
  <div class="home">
    <HeroDice style="width: 30%"></HeroDice>
    <Autocomplete :source="opts" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import HeroDice from "@/components/HeroDice.vue";
import Autocomplete from "@/components/base/Autocomplete.vue";

@Options({
  components: {
    HelloWorld,
    HeroDice,
    Autocomplete,
  },
})
export default class HomeView extends Vue {
  public opts: any[] = [
    { name: "aboba", value: "1" },
    { name: "biba", value: "2" },
    { name: "boba", value: "3" },
  ];
}
</script>
