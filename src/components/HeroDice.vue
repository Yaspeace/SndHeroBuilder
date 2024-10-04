<template>
  <div style="display: flex; align-items: flex-start">
    <table class="dice" style="width: 50%">
      <tbody>
        <tr>
          <td></td>
          <td class="bordered">
            <img
              src="@/assets/dice.png"
              class="dice-img"
              @click="setEditingSide(sidesEnum.Top)"
            />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="bordered">
            <img
              src="@/assets/dice.png"
              class="dice-img"
              @click="setEditingSide(sidesEnum.Left)"
            />
          </td>
          <td class="bordered">
            <img
              src="@/assets/dice.png"
              class="dice-img"
              @click="setEditingSide(sidesEnum.Mid)"
            />
          </td>
          <td class="bordered">
            <img
              src="@/assets/dice.png"
              class="dice-img"
              @click="setEditingSide(sidesEnum.Right)"
            />
          </td>
          <td class="bordered">
            <img
              src="@/assets/dice.png"
              class="dice-img"
              @click="setEditingSide(sidesEnum.Rightmost)"
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="bordered">
            <img
              src="@/assets/dice.png"
              class="dice-img"
              @click="setEditingSide(sidesEnum.Bot)"
            />
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <DiceEditPopup
      v-if="curEditingSide >= 0"
      style="margin-left: 20px; width: 50%"
      :side="initialSide"
      @on-save="onSaveSide($event)"
      @on-cancel="curEditingSide = -1"
    />

    {{ hero.generate() }}
  </div>
</template>

<script lang="ts">
import { Hero } from "@/models/Hero.model";
import { Options, Vue } from "vue-class-component";
import DiceEditPopup from "./DiceEditPopup.vue";
import { Sides } from "@/models/enums/Sides.enum";
import { HeroSide } from "@/models/HeroSide.model";
import { SideEdit } from "@/models/SideEdit.model";
import { SideTypeService } from "@/services/SideTypeService";
import { SideService } from "@/services/SideService";

@Options({
  components: {
    DiceEditPopup,
  },
})
export default class HeroDice extends Vue {
  public curEditingSide = -1;
  public initialSide: SideEdit = new SideEdit();

  public sidesEnum: typeof Sides = Sides;

  private hero: Hero = new Hero();
  private sideTypeService: SideTypeService = new SideTypeService();
  private sideService: SideService = new SideService();

  public setEditingSide(sideNum: number) {
    this.curEditingSide = sideNum;

    const heroSide: HeroSide = this.hero.sides[sideNum];
    this.initialSide.pipCount = heroSide.pips;
    const side = this.sideService.getSide(heroSide.sideNum);
    this.initialSide.keywords = [];
    if (!heroSide.needClear) {
      this.initialSide.keywords.push(...side.keywords);
    }
    this.initialSide.keywords.push(...heroSide.keywords);
    this.initialSide.type = this.sideTypeService.getSideType(side.type);
  }

  public onSaveSide(side: SideEdit): void {
    const fittestSide = this.sideService.fitSide(side);
    this.hero.sides[this.curEditingSide].pips = fittestSide.pips;
    this.hero.sides[this.curEditingSide].needClear = fittestSide.needClear;
    this.hero.sides[this.curEditingSide].sideNum = fittestSide.sideNum;
    this.hero.sides[this.curEditingSide].keywords = fittestSide.keywords;
  }
}
</script>

<style scoped lang="scss">
table.dice {
  border-collapse: collapse;

  .dice-img {
    width: 100%;
    aspect-ratio: 1;
  }

  tbody {
    tr {
      td {
        width: 25%;
      }
    }
  }
}

.bordered {
  border: 1px solid black;
}
</style>
