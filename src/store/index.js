import seedrandom from 'seedrandom';
import assert from 'assert';
import Vue from 'vue';
import Vuex from 'vuex';
import { pick } from '../modules/wordPicker';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    _initialSeed: 0,
    _seed: 0,
    _over: true,
    _grid: [],
    _redStarts: false,
    _redPlays: false,
    _red: [],
    _blue: [],
    _black: null,
    _grey: [],
    _picked: []
  },
  mutations: {
    generateGame(state, seed) {
      state._initialSeed = seed || Math.floor(seedrandom()() * 100000);
      seedrandom(state._initialSeed, { global: true });

      state._seed = state._initialSeed;
      state._over = false;
      state._picked = [];
      state._grid = pick();
      assert.equal(state._grid.length, 25);
      const shuffled = [...state._grid].sort(() => 0.5 - Math.random());
      state._redStarts = Math.random() > 0.5;
      state._redPlays = state._redStarts;
      state._red = shuffled.slice(0, state._redStarts ? 9 : 8);
      assert.equal(state._red.length, state._redStarts ? 9 : 8);
      state._blue = shuffled.slice(state._redStarts ? 9 : 8, 17);
      assert.equal(state._blue.length, state._redStarts ? 8 : 9);
      state._black = shuffled[17];
      state._grey = shuffled.slice(18);
      assert.equal(
        state._red.length + state._blue.length + state._grey.length + 1,
        state._grid.length
      );
    },
    pick(state, word) {
      try {
        if (state._picked.includes(word)) {
          return false;
        }
        const red = state._red.find(x => x === word) !== undefined;
        const blue = state._blue.find(x => x === word) !== undefined;
        const black = state._black === word;
        if (red && state._redPlays) {
          return true;
        } else if (blue && !state._redPlays) {
          return true;
        } else if (black) {
          state._over = true;
          return false;
        } else {
          state._redPlays = !state._redPlays;
          return false;
        }
      } finally {
        state.found(word);
      }
    },
    changeTeam(state) {
      state._redPlays = !state._redPlays;
    },
    found(state, word) {
      state._picked.push(word);
    }
  },
  getters: {
    playing(state) {
      return state._redStarts ? 'red' : 'blue';
    },
    isRed(state) {
      return word => state._picked.includes(word) && state._red.includes(word);
    },
    isBlue(state) {
      return word => state._picked.includes(word) && state._blue.includes(word);
    },
    isGrey(state) {
      return word => state._picked.includes(word) && state._grey.includes(word);
    },
    isBlack(state) {
      return word => state._picked.includes(word) && state._black === word;
    },
    redLeft(state) {
      const res = new Set(
        [...state._red].filter(x => !state._picked.includes(x))
      );
      // console.log('red', res);
      return res;
    },
    blueLeft(state) {
      const res = new Set(
        [...state._blue].filter(x => !state._picked.includes(x))
      );
      // console.log('blue', res);
      return res;
    },
    grid(state) {
      return state._grid;
    },
    red(state) {
      return state._red;
    },
    blue(state) {
      return state._blue;
    },
    black(state) {
      return state._black;
    },
    grey(state) {
      return state._grey;
    },
    picked(state) {
      return state._picked;
    },
    defeat(state, getters) {
      return getters.picked.includes(state._black);
    },
    seed(state) {
      return state._seed;
    },
    over(state, getters) {
      return (
        getters.redLeft.size === 0 ||
        getters.blueLeft.size === 0 ||
        getters.defeat
      );
    }
  },
  actions: {
    generateGame({ commit }, words) {
      commit('generateGame', words);
    },
    pick({ commit }, word) {
      commit('pick', word);
    },
    changeTeam({ commit }) {
      commit('changeTeam');
    },
    found({ commit }, word) {
      commit('found', word);
    }
  }
});

export default store;
