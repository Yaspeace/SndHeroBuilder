<template>
  <div class="popup-layout">
    <div>Pips: <InputNumber v-model="pipCount" :use-grouping="false" /></div>
    <div>
      Type:
      <AutoComplete
        v-model="chosenType"
        dropdown
        force-selection
        option-label="type"
        :suggestions="filteredSideTypes"
        @complete="searchSideTypes"
      />
    </div>
    <div>
      Keywords:
      <AutoComplete
        v-model="chosenKeywords"
        multiple
        dropdown
        :suggestions="filteredKeywords"
        @complete="searchKeywords"
      />
    </div>
    <div class="buttons">
      <Button label="Сохранить" />
      <Button label="Отмена" severity="secondary" />
    </div>
  </div>
</template>

<script lang="ts">
import AutoComplete from "primevue/autocomplete";
import { Options, Vue } from "vue-class-component";
import SIDE_TYPES from "@/assets/side_types.json";
import KEYWORDS from "@/assets/keywords.json";
import { SideType } from "@/models/SideType.model";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

@Options({
  components: {
    AutoComplete,
    InputNumber,
    Button,
  },
})
export default class DiceEditPopup extends Vue {
  public pipCount = 1;
  public chosenType: SideType | null = null;
  public chosenKeywords: string[] = [];

  public sideTypes: SideType[] = [];
  public filteredSideTypes: SideType[] = [];

  public allKeywords: string[] = [];
  public filteredKeywords: string[] = [];

  public mounted(): void {
    this.sideTypes = SIDE_TYPES;
    this.allKeywords = KEYWORDS;
  }

  public searchSideTypes(event: { query: string }): void {
    this.filteredSideTypes = this.sideTypes.filter((x) =>
      x.type.includes(event.query)
    );
  }

  public searchKeywords(event: { query: string }): void {
    this.filteredKeywords = this.allKeywords.filter((x) =>
      x.includes(event.query)
    );
  }
}
</script>

<style lang="scss" scoped>
.popup-layout {
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: rgba(200, 200, 200, 0.97);
  padding: 15px;
}

.buttons {
  display: flex;
  gap: 15px;
  align-items: baseline;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
