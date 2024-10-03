<template>
  <div style="display: flex; align-items: flex-start">
    <table class="dice" style="width: 50%">
      <tbody>
        <tr>
          <td></td>
          <td class="bordered">
            <img src="@/assets/dice.png" class="dice-img" />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="bordered">
            <img src="@/assets/dice.png" class="dice-img" />
          </td>
          <td class="bordered">
            <img src="@/assets/dice.png" class="dice-img" />
          </td>
          <td class="bordered">
            <img src="@/assets/dice.png" class="dice-img" />
          </td>
          <td class="bordered">
            <img src="@/assets/dice.png" class="dice-img" />
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="bordered">
            <img src="@/assets/dice.png" class="dice-img" />
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <DiceEditPopup style="margin-left: 20px; width: 50%" />
  </div>
</template>

<script lang="ts">
import { Hero } from "@/models/Hero.model";
import { Options, Vue } from "vue-class-component";
import DiceEditPopup from "./DiceEditPopup.vue";

@Options({
  components: {
    DiceEditPopup,
  },
})
export default class HeroDice extends Vue {
  public curEditingSide = 0;

  private hero: Hero = new Hero();
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
