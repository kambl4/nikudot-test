<template lang="pug">
  #app
    b-container(fluid style="padding-top: 50px;")
      b-row(align-h="around")
        b-col.d-none.d-lg-block.d-xl-block(sm="1")
        b-col(sm="10")
          router-view
        b-col.d-none.d-lg-block.d-xl-block(sm="1")
</template>

<script>
export default {
  mounted () {
    let scr = document.querySelector("#before-load");
      if (scr) {
        scr.classList.toggle('fade');
        setTimeout(() => {
          scr.remove();
        }, 500);
      }
  }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

@font-face {
  font-family: 'Ezra SIL';
  src: url('/static/fonts/SILEOT.ttf');
}

body {
  font-family: 'Ezra SIL';
  background: #edeef0;
  text-align: right;
  direction: rtl;
  background: url('/static/bg20.png');
}
#app {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
}
.unselectable {
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}
</style>