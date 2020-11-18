<template>
  <div class="user-article">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态" name="first">动态</el-tab-pane>
      <el-tab-pane label="视频" name="second">视频</el-tab-pane>
      <el-tab-pane label="历史" name="third">
        <div class="detailparent">
          <cover
              class="detailitem"
              :detailitem="categoryitem"
              v-for="(categoryitem,categoryindex) in readHistorys"
              :key="categoryindex"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cover from '@/views/cover';

export default {
  data() {
    return {
      readHistorys: [],
      activeName: 'second'
    }
  },
  components: {
    cover
  },
  methods: {
    async getHistory() {

      const res = await this.$http.get('/user/readHistory/list', {
        params: {
          userId: localStorage.getItem('userId')
        }
      })

      this.readHistorys = res.data.data
    },
    async handleClick(tab, event) {
      if (tab.name === 'third') {
        if (this.readHistorys.length>0){
          return
        }
        const res = await this.$http.get("/user/readHistory/list", {
          params: {
            userId: localStorage.getItem('userId')
          }
        });
        this.readHistorys = res.data.data
      }
    }
  }
}
</script>

<style lang="less">
.user-article {
  background-color: white;
}
</style>