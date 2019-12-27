<template>
  <div class="spy">
    <template v-if="seed">
      <div class="lists">
        <div class="list">
          <p>Red</p>
          <ul class="words">
            <li @click="found(word)" v-for="word in redLeft" :key="word">
              {{ word }}
            </li>
          </ul>
        </div>
        <div class="list">
          <p>Blue</p>
          <ul class="words">
            <li @click="found(word)" v-for="word in blueLeft" :key="word">
              {{ word }}
            </li>
          </ul>
        </div>
      </div>
      <p>Black</p>
      <p>{{ black }}</p>
    </template>
    <form>
      <p>
        <label for="seed">Seed</label>
        <input
          id="seed"
          v-model="seed"
          type="text"
          name="seed"
          >
      </p>
    </form>
  </div>
</template>

<script>
import Vuex from 'vuex';

export default {
  name: 'spy',
  data() {
    return {
      seed_: 0
    }
  },
  computed: {
    ...Vuex.mapGetters(['redLeft', 'blueLeft', 'black']),
    seed: {
      get() {
        return this.seed_;
      },
      set(value) {
        this.seed_ = Number(value);
        this.$store.commit('generateGame', this.seed_);
      }
    }
  },
  methods: {
    found(word) {
      this.$store.commit('found', word);
    }
  },
};
</script>

<style lang="scss">
.spy {
    display: flex;
    flex-direction: column;

    .lists {
        display: flex;
        justify-content: space-evenly;

        .list {
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;

                li {
                    border: 1px solid;
                    margin: 10px;
                    padding: 10px;
                }
            }
        }
    }
}
</style>
