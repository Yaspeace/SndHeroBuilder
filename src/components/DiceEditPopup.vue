<template>
  <div class="popup-layout">
    <div>
      Pips: <InputNumber v-model="side.pipCount" :use-grouping="false" />
    </div>
    <div>
      Type:
      <AutoComplete
        v-model="side.type"
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
        v-model="side.keywords"
        multiple
        dropdown
        :suggestions="filteredKeywords"
        @complete="searchKeywords"
      />
    </div>
    <div class="buttons">
      <Button label="Сохранить" @click="$emit('onSave', side)" />
      <Button label="Отмена" severity="secondary" @click="$emit('onCancel')" />
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
import { SideEdit } from "@/models/SideEdit.model";

@Options({
  components: {
    AutoComplete,
    InputNumber,
    Button,
  },
  emits: ["onSave", "onCancel"],
  props: {
    initialSide: SideEdit,
  },
})
export default class DiceEditPopup extends Vue {
  public side: SideEdit = new SideEdit();

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
