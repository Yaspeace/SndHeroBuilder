<template>
  <div>
    <table class="dice">
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
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class HeroDice extends Vue {}
</script>

<style scoped lang="scss">
table.dice {
  border-collapse: collapse;
  width: 100%;

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
