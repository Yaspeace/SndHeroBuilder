<template>
  <div style="display: flex; align-items: flex-start">
    <div style="width: 30%; text-align: left">
      <table class="dice">
        <tbody>
          <tr>
            <td></td>
            <td
              class="bordered"
              :class="{ active: curEditingSide === sidesEnum.Top }"
            >
              <img
                :src="getSideImg(sidesEnum.Top)"
                class="dice-img"
                @click="setEditingSide(sidesEnum.Top)"
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td
              class="bordered"
              :class="{ active: curEditingSide === sidesEnum.Left }"
            >
              <img
                :src="getSideImg(sidesEnum.Left)"
                class="dice-img"
                @click="setEditingSide(sidesEnum.Left)"
              />
            </td>
            <td
              class="bordered"
              :class="{ active: curEditingSide === sidesEnum.Mid }"
            >
              <img
                :src="getSideImg(sidesEnum.Mid)"
                class="dice-img"
                @click="setEditingSide(sidesEnum.Mid)"
              />
            </td>
            <td
              class="bordered"
              :class="{ active: curEditingSide === sidesEnum.Right }"
            >
              <img
                :src="getSideImg(sidesEnum.Right)"
                class="dice-img"
                @click="setEditingSide(sidesEnum.Right)"
              />
            </td>
            <td
              class="bordered"
              :class="{ active: curEditingSide === sidesEnum.Rightmost }"
            >
              <img
                :src="getSideImg(sidesEnum.Rightmost)"
                class="dice-img"
                @click="setEditingSide(sidesEnum.Rightmost)"
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td
              class="bordered"
              :class="{ active: curEditingSide === sidesEnum.Bot }"
            >
              <img
                :src="getSideImg(sidesEnum.Bot)"
                class="dice-img"
                @click="setEditingSide(sidesEnum.Bot)"
              />
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {{ hero.generate() }}
    </div>

    <DiceEditPopup
      v-if="curEditingSide >= 0"
      style="margin-left: 20px; width: 30%"
      :side="initialSide"
      @on-save="onSaveSide($event)"
      @on-cancel="curEditingSide = -1"
    />
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
    this.initialSide.keywords = [];
    if (!heroSide.needClear) {
      this.initialSide.keywords.push(...heroSide.side.keywords);
    }
    this.initialSide.keywords.push(...heroSide.keywords);
    this.initialSide.type = this.sideTypeService.getSideType(
      heroSide.side.type
    );
  }

  public onSaveSide(side: SideEdit): void {
    const fittestSide = this.sideService.fitSide(side);
    this.hero.sides[this.curEditingSide].pips = fittestSide.pips;
    this.hero.sides[this.curEditingSide].needClear = fittestSide.needClear;
    this.hero.sides[this.curEditingSide].side = fittestSide.side;
    this.hero.sides[this.curEditingSide].keywords = fittestSide.keywords;
  }

  public getSideImg(sideLocation: number): any {
    const sideType: number = this.hero.sides[sideLocation].side.type;
    try {
      return require(`@/assets/side_imgs/side_${sideType}.png`);
    } catch {
      return require(`@/assets/side_imgs/side_1.png`);
    }
  }
}
</script>

<style scoped lang="scss">
table.dice {
  width: 100%;
  border-spacing: 0;
  user-select: none;

  .dice-img {
    width: 100%;
    aspect-ratio: 1;
  }

  tbody {
    tr {
      td {
        width: 25%;
        padding: 0;
        margin: 0;
      }
    }
  }
}

.bordered {
  border: 7px solid #696969;
  vertical-align: middle;
  background-color: #120f17;
}

.active {
  border: 7px solid #a9a9a9;
}
</style>
