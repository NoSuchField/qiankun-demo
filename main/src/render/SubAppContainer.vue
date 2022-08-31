<template>
  <div id="subapp-container">
    <h4 v-if="loading" class="subapp-loading">Loading...</h4>
    <div id="subapp-viewport"></div>
  </div>
</template>

<script>

  export default {

    name: 'SubAppContainer',
    props: {
      loading: Boolean
    },

    setup() {
    },

    data() {
      return {
      };
    },
  }

</script>