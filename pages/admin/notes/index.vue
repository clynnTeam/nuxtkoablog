<template>
  <el-container>
    <el-header style="height:40px;">
      <div class="admin_tit">
        <nuxt-link to="/admin"> &lt;&lt; 后台管理页面</nuxt-link>
        <nuxt-link to="/" class="page" target="_blank">前台页面</nuxt-link>
        <nuxt-link to="/admin/posts/list" class="page">文章列表</nuxt-link>
        <el-button plain size="mini" style="margin-left:10px;" @click="addNote">添加笔记</el-button>
      </div>
      <div class="author">
        <btnBackup></btnBackup>
        <a class="logout" @click="logout()">退出</a>
      </div>
    </el-header>
    <el-container class="main">
      <el-aside width="200px" class="cates">
        <div class="catestit">
          <i class="fa fa-book fa-left"></i>
          笔记本
        </div>
        <!-- 分类 -->
        <Cates ref="cates" :cateid.sync="cateid" :catename.sync="catename"></Cates>
      </el-aside>
      <el-aside width="250px" class="notes">
        <!-- 笔记列表 -->
        <Notes ref="notes" :cateid="cateid" :catename="catename" :act.sync="act" :noteid.sync="noteid"></Notes>
      </el-aside>
      <el-main class="editor">
        <!-- 编辑器 -->
        <Editor :cateid="cateid" :noteid.sync="noteid" :act.sync="act" @updatenotes="updatenotes" @addNote="addNote"></Editor>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Cates from '~/components/admin/note/cates'
import Notes from '~/components/admin/note/notes'
import Editor from '~/components/admin/note/editor'
import btnBackup from '~/components/btn-backup'

export default {
  layout: 'admin2',
  head() {
    return {
      title: '笔记'
    }
  },
  data() {
    return {
      cateid: 0,
      catename: '最新',
      noteid: 0,
      act: 'show'
    }
  },
  created() {
  },
  methods: {
    addNote() {
      if (this.cateid === 0) {
        // 选择第一个分类
        this.$refs.cates.$emit('selectFirstCate')
      }
      this.noteid = 0
      this.act = 'add'
    },
    updatenotes() {
      this.$refs.notes.$emit('updatenotes')
    }
  },
  components: {
    Cates,
    Notes,
    Editor,
    btnBackup
  }
}
</script>
<style scoped>
.el-header{
  background-color: #666;
}
.admin_tit{
  font-size: 20px;
  color: #fff;
  float: left;
  line-height: 40px;
}
.admin_tit a{
  color: #fff;
}
.admin_tit .page{
  font-size: 14px;
  margin-left: 20px;
}
.author{
  float: right;
  color: #fff;
  line-height: 40px;
}
.author a{
  color: #fff;
}
.logout{
  cursor: pointer;
}
.main{
  position: fixed;
  width: 100%;
  height: calc(100% - 40px);
  top: 40px;
}
.editor{
  padding: 0;
}
.cates{
  background: #41586e;
  color: #ccc;
  border-right: 1px solid #ccc;
  overflow: auto;
}
.catestit{
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
}
.notes{
  background-color: #fff;
  border: 1px solid #cfcfcf;
}
</style>
