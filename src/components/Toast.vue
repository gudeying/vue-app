<template>
  <v-snackbar v-model="snackbar" :color="color" top multi-line :timeout="timeout">{{ text }}</v-snackbar>
</template>
<script>
export default {
  name: "snackbar",
  data() {
    return {
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "Hello",
      color: "lime"
    };
  },
  methods: {
    success(msg) {
      this.text = msg;
      this.color='pink',
      this.snackbar=true
    },
    error(msg) {
      this.text = msg;
      this.text='lime'
      this.snackbar=true
    },
    msg(text, param) {
      this.text = text;
      this.timeout = Boolean(param.timeout) ? param.timeout : 600;
      this.snackbar=true
    }
  }
};
</script>