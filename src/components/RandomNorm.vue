
<template>
  <div>
    <center>
      <button v-on:click="{{newrand}}">
        Your Current Random Number is
        <span id="random">{{randno}}</span>
      </button>
    </center>
  </div>
</template>

<script>
import chance from "chance";
export default {
  components: { RandomNorm },
  data: function() {
    return {
      randno: 50
    };
  },

  computed: {
    newrand: {function()
    Math.round(
        chance.normal({
          mean: 50,
          dev: 20
        })
      );
    }
  }
};
</script>

<style scoped>
#random {
  font-size: larger;
}
</style>
