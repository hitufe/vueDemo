<template>
  <div>
    <el-form :inline="true" :model="formInline" class="user-search" @submit.native.prevent>
      <el-form-item label="搜索：">
        <el-input
            size="small"
            v-model="formInline.title"
            placeholder="输入文章标题"
            @keyup.enter.native="search"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" plain icon="Search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" plain icon="Edit" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
        size="small"
        :data="listData"
        element-loading-text="拼命加载中"
        style="width: 100%;"
    >
      <el-table-column align="center" type="selection" min-width="1">
      </el-table-column>
      <el-table-column sortable prop="id" label="文章ID" min-width="1">
      </el-table-column>
      <el-table-column sortable prop="title" label="文章标题" min-width="3">
      </el-table-column>
      <el-table-column sortable prop="body" label="文章内容" min-width="5">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="6">
        <template v-slot="scope">
          <el-button size="small" @click="doEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination
        style="margin-top: 30px; justify-content: center;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.page"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
    >
    </el-pagination>

    <!-- 编辑界面 -->
    <el-dialog
        :title="title"
        v-model="editFormVisible"
        width="30%"
        @before-close="closeDialog"
    >
      <el-form
          label-width="120px"
          :model="editForm"
          :rules="rules"
          ref="editForm"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input
              size="small"
              v-model="editForm.title"
              auto-complete="off"
              placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="body">
          <el-input
              size="small"
              v-model="editForm.body"
              auto-complete="off"
              placeholder="请输入文章内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button
            size="small"
            type="primary"
            class="title"
            @click="submitForm('editForm')"
        >保存
        </el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {ElMessageBox} from "element-plus";
import {ElMessage} from 'element-plus';

export default {
  data() {
    return {
      listData: [],
      title: "",
      editFormVisible: false,
      formInline: {
        page: 1,
        rows: 10,
        title: ""
      },
      editForm: {
        title: "",
        body: "",
        id: 0
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        body: [
          {
            required: true,
            message: "请选择文字内容",
            trigger: "blur"
          }
        ]
      },
      total: 0
    };
  },
  methods: {
    handleSizeChange(rows) {
      this.formInline.page = 1;
      this.formInline.rows = rows;
      this.search();
    },
    handleCurrentChange(page) {
      this.formInline.page = page;
      this.search();
    },
    closeDialog() {
      //关闭对话框
      this.clearData();
    },
    handleEdit() {
      //添加
      this.editFormVisible = true;
      this.title = "新增窗体";
    },
    doEdit(index, row) {
      this.editForm.id = row.id;
      this.editForm.title = row.title;
      this.editForm.body = row.body;
      this.editFormVisible = true;
      this.title = "编辑窗体";
    },
    clearData() {
      this.title = "";
      this.editForm.id = 0;
      this.editForm.title = "";
      this.editForm.body = "";
      this.editFormVisible = false;
    },
    deleteUser(index, row) {
      // //删除
      // let url = this.axios.urls.SYSTEM_ARTICLE_DEL;
      // this.axios
      //   .post(url, { id: row.id })
      //   .then(response => {
      //     //console.log(response);
      //  this.$message({
      //           message: response.data.msg,
      //           type: 'success'
      //         });
      //     this.clearData();
      //     this.search();
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            ElMessage.success({
              message: '删除成功!'
            });
            let url = 'http://localhost:8080/article/del';
            // let url = this.axios.urls.SYSTEM_ARTICLE_DEL;
            this.axios
                .post(url, {id: row.id})
                .then(response => {
                  //console.log(response);
                  this.clearData();
                  this.search();
                })
                .catch(function (error) {
                  console.log(error);
                });
          })
          .catch(() => {
            ElMessage.info({
              message: "已取消删除"
            });
          });
    },
    submitForm(formName) {
      //验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url;
          if (this.editForm.id == 0) {
            //  url = this.axios.urls.SYSTEM_ARTICLE_ADD;
            url = 'http://localhost:8080/article/add';
          } else {
            url = 'http://localhost:8080/article/edit';
            //url = this.axios.urls.SYSTEM_ARTICLE_EDIT;
          }
          // let url = 'http://localhost:8080/T216_SSH/vue/userAction_login.action';

          this.axios
              .post(url, this.editForm)
              .then(response => {
                //console.log(response);
                // this.$message({
                //   message: response.data.msg,
                //   type: 'success'
                // });
                this.clearData();
                this.search();
              })
              .catch(function (error) {
                console.log(error);
              });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    doSearch(params) {
      //let url = this.axios.urls.SYSTEM_ARTICLE_LIST;
      let url = 'http://localhost:8080/article/list';
      // let url = 'http://localhost:8080/T216_SSH/vue/userAction_login.action';

      this.axios
          .post(url, params)
          .then(response => {
            console.log(response);
            this.listData = response.data.result;
            this.total = response.data.pageBean.total;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    search() {
      this.doSearch(this.formInline); //按照条件进行查询
    }
  },
  created() {
    this.doSearch({});
  }
};
</script>

<style></style>