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
import { SideType } from "@/models/SideType.model";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import { SideEdit } from "@/models/SideEdit.model";
import { SideTypeService } from "@/services/SideTypeService";
import { KeywordService } from "@/services/KeywordService";

@Options({
  components: {
    AutoComplete,
    InputNumber,
    Button,
  },
  emits: ["onSave", "onCancel"],
  props: {
    side: SideEdit,
  },
})
export default class DiceEditPopup extends Vue {
  public side!: SideEdit;

  public pipCount = 1;
  public chosenType: SideType | null = null;
  public chosenKeywords: string[] = [];

  public filteredSideTypes: SideType[] = [];
  public filteredKeywords: string[] = [];

  private sideTypeService: SideTypeService = new SideTypeService();
  private keywordService: KeywordService = new KeywordService();

  public searchSideTypes(event: { query: string }): void {
    this.filteredSideTypes = this.sideTypeService.searchSideTypes(event.query);
  }

  public searchKeywords(event: { query: string }): void {
    this.filteredKeywords = this.keywordService.searchKeywords(event.query);
  }
}
</script>

<style lang="scss" scoped>
.popup-layout {
  border: 5px solid yellow;
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
