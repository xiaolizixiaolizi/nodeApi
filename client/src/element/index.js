// 按需导入
import {
  Select, Radio, Loading, RadioGroup, Form, Option, OptionGroup, Input, Tree, Dialog, Row, Col, Button, FormItem,
  Table,Tag,
  TableColumn,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

export default {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(Tree)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Radio)
    Vue.use(RadioGroup)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Tag)
    Vue.use(Loading)
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$message = Message;
    Vue.prototype.$notify = Notification;

  }
}


