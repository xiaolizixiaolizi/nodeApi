<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">register in here</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="学号" prop="stu_id">
          <el-input v-model="registerUser.stu_id" placeholder="请输入6位学号"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="age" v-model.number="registerUser.age" placeholder="请输入年龄"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="registerUser.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>

        <el-form-item label="选择角色">
          <el-select v-model="registerUser.identity">
            <!-- ：value="1" 1是nun类型 value="1" 1是string -->
            <el-option label="学生" :value="1"></el-option>
            <el-option label="管理员" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="success" round size="medium" class="reg_btn" @click="submitForm('registerForm')">注册</el-button>
          <el-button round type="danger" size="medium" @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>
            已有账号？现在
            <a href="javascript:;" @click.prevent="goLogin">登录</a>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import { checkReg } from "network/user.js";

export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        stu_id: "",
        age: "",
        name: "",
        email: "",
        gender: 0,
        password: "",
        password2: "",
        identity: 1
      },
      rules: {
        stu_id: [
          { required: true, message: "学号不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "学号输入长度错误", trigger: "blur" }
        ],
        age: [
          { required: true, message: "年龄不能为空",trigger:'blur' },
          { type: "number", message: "年龄必须为数字值",trigger:'blur' }
        ],
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async _checkReg() {
      let { errCode, message } = await checkReg(this.registerUser);
      this.$message({
        showClose: true,
        message: message,
        // 关闭时候回调函数 注册完跳转到登录页面
        onClose: () => {
          this.$router.push({ name: "login" });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 写入数据库
          this._checkReg();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>


<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 120vh;
  background: url("~assets/img/bg.jpg") no-repeat center center;

  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  /* height: 210px; */
  position: absolute;
  /* top: 10%; */
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  /* font-weight: bold; */
  font-size: 26px;
  color: #212121;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #c1c1c1;
}

.reg_btn {
  width: 60%;
}
.registerForm .tiparea p {
  text-align: right;
  font-size: 12px;
  /* color: #409eff; */
}
.registerForm .tiparea p a {
  /* font-size: 12px; */
  color: #409eff;
}
</style>



