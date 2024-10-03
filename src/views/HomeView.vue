<template>
  <div class="home">
    <HeroDice style="width: 30%"></HeroDice>
    <DiceEditPopup />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import HeroDice from "@/components/HeroDice.vue";
import AutoComplete from "primevue/autocomplete";
import { TestOption } from "@/models/TestOption.model";
import DiceEditPopup from "@/components/DiceEditPopup.vue";

@Options({
  components: {
    HelloWorld,
    HeroDice,
    AutoComplete,
    DiceEditPopup,
  },
})
export default class HomeView extends Vue {
  public opts: TestOption[] = [
    { name: "aboba", value: "1" },
    { name: "biba", value: "2" },
    { name: "boba", value: "3" },
  ];

  public filteredOpts: TestOption[] = [];
  public chosenValue = new TestOption();

  public search(event: { query: string }): void {
    this.filteredOpts = this.opts.filter((x) => x.name.includes(event.query));
  }
}
</script>
