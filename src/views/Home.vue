<template>
  <div class="home">
    <h1>Code names</h1>
    <template v-if="over">
      <template v-if="grid.length === 0">
        <h1>New game</h1>
      </template>
      <template v-else>
        <h1>Well played...</h1>
        <h2>The {{ playing }} team won!</h2>
      </template>
      <button v-on:click="generate">
        Generate
      </button>
    </template>
    <template v-else-if="defeat">
      <h1>The espion got you...</h1>
      <h2>The {{ playing }} team lost!</h2>
      <button v-on:click="generate" />
    </template>
    <template v-else>
      <Cards :words=grid />
      <div class="bottom">
        <div class="info">
          <p>playing: {{ playing }}</p>
          <p>red: {{ redLeft.size }}</p>
          <p>blue: {{ blueLeft.size }}</p>
          <p>seed: {{ seed }}</p>
        </div>
        <button v-on:click="switchTeam">
          Next Player
        </button>
        <button v-on:click="generate">
          Regenerate
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import Cards from '@/components/Cards.vue';
import Vuex from 'vuex';

export default {
  name: 'home',
  components: {
    Cards,
  },
  computed: {
    ...Vuex.mapGetters(['grid', 'over', 'defeat', 'playing', 'blueLeft', 'redLeft', 'seed']),
  },
  methods: {
    generate() {
      this.$store.commit('generateGame');
    },
    switchTeam() {
      this.$store.commit('changeTeam');
    }
  }
};
</script>

<style lang="scss">
.info {
  display: flex;
  justify-content: space-evenly;
}

.home {
  margin-left: 10%;
  margin-right: 10%;
}
</style>
