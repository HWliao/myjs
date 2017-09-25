<template>
  <el-row type="flex" class="seal" tag="section">
    <el-col>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>管理后台</el-breadcrumb-item>
        <el-breadcrumb-item>盖章管理</el-breadcrumb-item>
        <el-breadcrumb-item>印章信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col class="query-form">
      <el-form :inline="true" :model="queryData">
        <el-form-item prop="compnaies" label="印章所属公司">
          <g-select v-model="queryData.companies"></g-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="fa-search" @click="doClick">查询</el-button>
          <el-button type="primary" size="small" icon="fa-plus" style="margin-left: 20px;">增加</el-button>
          <el-button type="primary" size="small" icon="fa-exchange">替换</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col class="data-table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        class="pagination">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
  import GSelect from './GSelectComponent';

  export default {
    name: 'gzSeal',
    components: {
      [GSelect.name]: GSelect,
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      doClick() {
        console.log(this.queryData);
      },
    },
    data() {
      return {
        currentPage4: 4,
        test: 'seal',
        queryData: {},
        selectValue: 'xxx',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }],
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .seal {
    flex-direction: column;
    height: 100%;
    padding: 24px;
    overflow: auto;
  }

  .query-form {
    margin-top: 20px;
    padding-top: 25px;
    padding-left: 25px;
    background-color: #f2f2f2;
  }

  .data-table {
    margin-top: 30px;
  }

  .pagination {
    margin-top: 10px;
    float: right;
  }
</style>
