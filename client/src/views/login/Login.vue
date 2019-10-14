<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">loin in here</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        class="loginForm"
        label-width="60px"
      >
        <el-form-item label="学号" prop="stu_id">
          <el-input v-model="loginUser.stu_id" placeholder="请输入6位学号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            round
            class="login-btn"
            size="medium"
            @click="submitForm('loginForm')"
          >登 录</el-button>
          <el-button
            round
            type="danger"
            class="reset-btn"
            size="medium"
            @click="resetForm('loginForm')"
          >重置</el-button>
        </el-form-item>

        <div class="tiparea">
          <p>
            还没有账号？现在
            <a href="javascript:;" @click.prevent="goReg">注册</a>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>


<script>
import { checkLogin } from "network/user.js";
import { isEmpty } from "common/utils.js";
import jwt_decode from "jwt-decode";
export default {
  name: "Login",
  data() {
    return {
      loginUser: {
        stu_id: "",
        password: ""
      },
      rules: {
        stu_id: [
          { required: true, message: "学号不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "学号输入长度错误", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async _checkLogin() {
      // 结果不一定是token
      let { token, stu_id, password } = await checkLogin(this.loginUser);
      if (stu_id) {
        return this.$message.error(stu_id);
      }
      if (password) {
        return this.$message.error(password);
      }
      if (token) {
        // localStrorage存token
        localStorage.setItem("userToken", token);
        // 解析token
        let decoded = jwt_decode(token);
        // 存到vuex里面 isEmpty(decoded)有值是false
        this.$store.dispatch("setIsAutnenticated", !isEmpty(decoded));
        this.$store.dispatch("setUser", decoded);

        this.$message({
          type: "success",
          showClose: true,
          message: "登录成功",
          onClose: () => {
            this.$router.push({ name: "home" });
          }
        });
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._checkLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goReg() {
      this.$router.push({ name: "register" });
    }
  },
  components: {},
  computed: {},
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  updated() {}, //生命周期 - 更新之后
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import ; 引入公共css类

.login {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("~assets/img/bg.jpg") no-repeat center center;

  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #212121;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
.login-btn {
  width: 60%;
}
</style>