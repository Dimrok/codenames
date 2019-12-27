<template>
<div class="cards">
  <template v-for="word in words">
    <div :key=word @click="pick(word)" class="card">
      <Card :word=word />
    </div>
  </template>
</div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  components: {
    Card,
  },
  props: {
    words: Array,
  },
  methods: {
    pick(word) {
      this.$store.commit('pick', word);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .card {
    flex: 0 0 18%;
    margin: 2px;
  }
}
</style>
