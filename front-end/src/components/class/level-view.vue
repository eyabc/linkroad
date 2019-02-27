<template>
  <div>
    <header class="header">
      <h1>level</h1>
      <span class="title-friend" v-if="!putTaskState"><i @click="putTaskToggle" class="fas fa-plus"></i></span>
      <span class="title-friend" v-else><i @click="putTaskToggle" class="fas fa-times"></i></span>
    </header>
    <div class="tasks">
      <form :action="`/api/put-task/${cidx}`" method="post" v-if="putTaskState" @submit.prevent="putTask">
        <input type="text" name="title" placeholder="Title" required="">
        <input type="text" name="url" placeholder="URL">
        <button type="submit"></button>
      </form>
      <ul class="list">
        <li class="list-item" v-for="(item, key) in task" :key="key" :class="{'task-active': key === activeTask}"> 
          <a href="#" @click.prevent="viewChildren(item.tidx, key)">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        putTaskState: false,
        cidx: this.$route.params.cidx,
        activeTask: null
      }
    },
    methods: {
      putTaskToggle () {
        this.putTaskState = !this.putTaskState
      },
      async putTask (e) {
        const frm = e.target
        const data = { 
          title: frm.title.value,
          url: frm.url.value
        }
        const json = await fetch(frm.action, {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        }).then(res=>res.json())
        if(json.success){
          this.tasks.push(data)
        } else {
          alert('task 추가 실패')
        }
      },
      async viewChildren (tidx, key) {
        this.activeTask = key
        const json = await fetch(`/api/get-task/${this.cidx}/${tidx}`).then(res => res.json())
        if (this.level + 1 === this.$parent.tasks.length) {
          this.$parent.tasks.push(json.taskInfo)
        } else {
          this.$set(this.$parent.tasks, this.level + 1, json.taskInfo)
          this.$parent.tasks.splice(this.level + 2, this.$parent.tasks.length - 1)
          // const arr = this.$parent.tasks.slice()
          // arr[this.level + 1] = json.taskInfo
          // arr.splice(this.level + 2, arr.length - 1)
          // this.$parent.tasks = arr
        }
      }
    },
    props: ['task', 'level']
  }
</script>
<style lang="scss">
.level-contents {
  width: 300px;
  header { border-bottom: #09f solid 2px; display: flex; justify-content: space-between;}
  h1 {font-size: 20px;}
  input { height: 20px; width: 100%; padding: 0; border-color: #ddd; padding: 0 10px; box-sizing:border-box}
}
.tasks{
  margin: 8px
  button {display:none}
}
</style>