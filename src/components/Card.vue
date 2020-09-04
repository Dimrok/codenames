<template>
  <div
    :class="{
      card: true,
      background: true,
      red: isRed,
      blue: isBlue,
      grey: isGrey,
      black: isBlack
    }"
  >
    <div class="inner">
      <div class="top">
        <div class="left">
          <svg
            class="hole"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <div class="line" />
        </div>
        <div class="right"><div class="picture" /></div>
      </div>
      <div class="bottom">
        <h2>{{ word }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    word: String
  },
  computed: {
    isRed() {
      return this.$store.getters.isRed(this.word);
    },
    isBlue() {
      return this.$store.getters.isBlue(this.word);
    },
    isGrey() {
      return this.$store.getters.isGrey(this.word);
    },
    isBlack() {
      return this.$store.getters.isBlack(this.word);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  border-radius: 5px;
  display: flex;
  justify-content: center;
  padding: 6px;
  min-height: 128px;
  background-color: #d4b19d;

  .background {
    background-color: #d4b19d;
    // background-image: url('../assets/dirty-overlay.jpeg');
    background-size: cover;
    background-blend-mode: soft-light;
  }

  .inner {
    flex-grow: 1;
    border: 3px solid darken(#d4b19d, 8%);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 6px;

    .top {
      position: relative;
      content: " ";
      flex: 1 1 50%;
      display: flex;
      margin-bottom: 2px;
      .left {
        flex: 1 1 70%;
        display: flex;
        flex-direction: column;
        svg {
          fill: lighten(#d4b19d, 20%);
        }
        .hole {
          position: absolute;
          left: 50%;
          width: auto;
          height: 30%;
        }

        .line {
          content: " ";
          width: 100%;
          height: 1px;
          background-color: darken(#d4b19d, 30%);
          align-self: flex-end;
          margin-top: auto;
          margin-bottom: 4px;
        }
      }

      .right {
        flex: 1 1 10%;

        .picture {
          background-image: url("../assets/picture.jpeg");
          mix-blend-mode: multiply;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          width: 100%;
          min-height: 100%;
        }
      }
    }

    .bottom {
      flex: 1 1 50%;
      background-color: white;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;

      h2 {
        margin: 0;
      }
    }
  }
}

.red {
  opacity: 0.7;
  background-color: red;
}
.blue {
  opacity: 0.7;
  background-color: blue;
}
.grey {
  opacity: 0.7;
  background-color: grey;
}
.black {
  opacity: 0.7;
  background-color: black;
}
</style>
