<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="视频名称">
        <el-input v-model="video.name"></el-input>
      </el-form-item>
      <el-form-item label="视频名称">
        <input type="file" @change="onFileChange">
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="video.description"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="video.category" placeholder="请选择">
          <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="test">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>


export default {
  name: "Upload",
  data() {
    return {
      video: {
        name: '',
        description: '',
        username: '',
        category: '请选择'
      },
      file: [],
      categoryList: []
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      console.log(this.file);
      this.video.username = localStorage.getItem('username')
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('filename', this.video.name)
      formData.append('description', this.video.description)
      formData.append('username', this.video.username)
      formData.append('category', this.video.category)
      const res = this.$fileHttp.post('/minio/upload', formData)
      console.log(res);
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.file = files[0]
    },
    async getCategory() {
      const res = await this.$http.get("/category/categorys");
      this.categoryList = res.data.data
    },
    test(){
      console.log(this.video.category);
    }
  },
  created() {
    this.getCategory()
  }
}
</script>

<style scoped>

</style>