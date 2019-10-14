<template>
  <div class="nofind">
    <img src="~assets/img/404.gif" alt>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      count: ""
    };
  },
  methods: {
    //几秒后进入跳转页面
    autoGo() {
      const timejump = 3;
      if (!this.timer) {
        this.count = timejump;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= timejump) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            //跳转的页面写在此处 调回首页
            this.$router.push({name:'home',query:{}})
          }
        }, 1000);
      }
    }
  },
  created() {
    this.autoGo()
  },
};
</script>

<style scoped>
.nofind {
  overflow: hidden;
  height: 100vh;
}
.nofind img {
  width: 100%;
  height: 100%;
}
</style>

