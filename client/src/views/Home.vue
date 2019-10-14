<template>
  <div class="home">
    <div class="hx-info" v-if="hxData.length!==0">
      <div class="search">
        <el-input
          v-model="search"
          style="width:20%"
          placeholder="化学式查询"
          clearable
          prefix-icon="el-icon-search"
          size="large"
        ></el-input>
      </div>
      <el-table
        :data="tables"
        border
        style="width: 100%"
        :default-sort="{prop: 'hxShi', order: 'descending'}"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="hxShi" label="化学式" sortable width="180"></el-table-column>
        <el-table-column prop="hxName" label="中文名" sortable width="180"></el-table-column>
        <el-table-column prop="hxSucheng" sortable label="俗称"></el-table-column>
        <el-table-column prop="hxLook" sortable label="外观和状态"></el-table-column>
        <el-table-column prop="hxMidu" sortable label="密度"></el-table-column>
        <el-table-column prop="hxShui" sortable label="水溶性"></el-table-column>
        <el-table-column prop="hxUsed" sortable label="用途"></el-table-column>
        <el-table-column
          prop="hxTag"
          label="标签"
          width="100"
          :filters="tags"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
         
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.hxTag === '单质' ? 'primary' : 
                    (scope.row.hxTag === '氧化物' ? 'success':
                    (scope.row.hxTag === '酸' ? 'info':
                    (scope.row.hxTag === '碱' ? 'warning':'danger')))"
              close-transition
            >{{scope.row.hxTag}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getHxData } from "network/huaxue.js";
export default {
  name: "home",
  components: {},
  data() {
    return {
      hxData: [],
      search: "",
      tags: [
        { text: "单质", value: "单质" },
        { text: "氧化物", value: "氧化物" },
        { text: "酸", value: "酸" },
        { text: "碱", value: "碱" },
        { text: "盐", value: "盐" }
      ]
    };
  },
  computed: {
    tables() {
      let search = this.search;
      return this.hxData.filter(element =>
        element.hxShi.toLowerCase().includes(search.toLowerCase())
      );
    }
  },
  methods: {
    async _getHxData() {
      let res = await getHxData();
      this.hxData = res;
    },
    filterTag(value, row) {
      return row.hxTag === value;
    }
  },
  created() {
    this._getHxData();
  }
};
</script>
<style lang="less" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-input {
  margin: 30px 30px 0 0;
}
</style>

