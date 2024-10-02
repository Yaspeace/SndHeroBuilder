<template>
  <select v-model="selectedVal" @select="console.log($event)">
    <option
      v-for="opt in source"
      :value="typeof opt === 'object' ? opt[fieldValue] : opt"
      :key="typeof opt === 'object' ? opt[fieldValue] : opt"
    >
      {{ typeof opt === "object" ? opt[fieldView] : opt }}
    </option>
  </select>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    source: Array,
    fieldView: {
      type: String,
      default() {
        return "name";
      },
    },
    fieldValue: {
      type: String,
      default() {
        return "value";
      },
    },
  },
  emits: ["valueChange"],
})
export default class Autocomplete extends Vue {
  source!: any[];
  fieldView!: string;
  fieldValue!: string;

  selectedVal: any;
}
</script>
