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
      v-if="curEditingSide > 0"
      style="margin-left: 20px; width: 50%"
      @on-save="console.log($event)"
      @on-cancel="curEditingSide = 0"
    />
  </div>
</template>

<script lang="ts">
import { Hero } from "@/models/Hero.model";
import { Options, Vue } from "vue-class-component";
import DiceEditPopup from "./DiceEditPopup.vue";
import { Sides } from "@/models/enums/Sides.enum";

@Options({
  components: {
    DiceEditPopup,
  },
})
export default class HeroDice extends Vue {
  public curEditingSide = 0;

  public sidesEnum: typeof Sides = Sides;

  private hero: Hero = new Hero();

  public setEditingSide(sideNum: number) {
    this.curEditingSide = sideNum;
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
