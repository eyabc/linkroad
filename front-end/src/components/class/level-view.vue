<template>
  <div>

    <header class="header">
      <h1>
        <span><i class="title-friend fas fa-search"></i></span>
      </h1>
      <span class="title-friend task-icon" v-if="!putTaskState"><i @click="putTaskToggle" class="fas fa-plus"></i></span>
      <span class="title-friend task-icon" v-else><i @click="putTaskToggle" class="fas fa-times"></i></span>
    </header>
    <div class="tasks">
      <form :action="`/api/put-task/${cidx}`" method="post" v-if="putTaskState" @submit.prevent="putTask" autocomplete="off">
        <input type="text" name="title" placeholder="Title" required="" v-model="form.title">
        <input type="text" name="url" placeholder="URL" v-model="form.url">
        <button type="submit"></button>
      </form>
      <ul class="list">
        <li class="list-item" v-for="(item, key) in task" :key="key" :class="{'task-active': key === activeTask}"> 
          <a href="#" @click.prevent="viewChildren(item.tidx, key)">{{item.title}}</a>
          <span v-if="deleteTask" >
            <label>
              <input type="checkbox" class="cb1">
              <span></span>
            </label>
          </span>
          <span @click="updateTaskLayer" v-else><i class="fas fa-edit title-icon"></i></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
  import updateTask from '@/components/layer/updateTask'
  
  export default {
    data () {
      return {
        putTaskState: false,
        cidx: this.$route.params.cidx,
        activeTask: null,
        form: {
          title:'',
          url:''
        }
      }
    },
    created () {
      console.log(this.deleteTask)
    },
    methods: {
      putTaskToggle () { this.putTaskState = !this.putTaskState },
      async putTask (e) {
        const frm = e.target
        const data = { 
          title: frm.title.value,
          url: frm.url.value,
          parent_task: this.tidx 
        }
        const json = await fetch(frm.action, {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        }).then(res=>res.json())
        if(json.success){
          this.form = ''
          data.tidx = json.tidx
          this.task.push(data)
        } else {
          alert('task 추가 실패')
        }
      },
      async viewChildren (tidx, key) {
        console.log(tidx)
        if(this.activeTask === key){
          this.activeTask = null
          this.$parent.tasks.splice(this.level + 1, this.$parent.tasks.length - 1)
        } else {
          this.activeTask = key
          const json = await fetch(`/api/get-task/${this.cidx}/${tidx}`).then(res => res.json())
          if (this.level + 1 === this.$parent.tasks.length) {
            this.$parent.tasks.push(json.taskInfo)
            this.$parent.parent_task.push(tidx)
          } else {
            this.$set(this.$parent.tasks, this.level + 1, json.taskInfo)
            this.$set(this.$parent.parent_task, this.level + 1, tidx)
            this.$parent.tasks.splice(this.level + 2, this.$parent.tasks.length - 1)
            this.$parent.parent_task.splice(this.level + 2, this.$parent.tasks.length - 1)
          // const arr = this.$parent.tasks.slice()
          // arr[this.level + 1] = json.taskInfo
          // arr.splice(this.level + 2, arr.length - 1)
          // this.$parent.tasks = arr
        }
      }
    },
    updateTaskLayer () {
      this.$store.commit("openLayer",updateTask)
    },
  },
  props: ['task', 'level', 'tidx', 'deleteTask']
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

.list-item {position: relative;
  &:hover {color:#000}
}
.title-icon { position: absolute; top:2px; right:2px; color:#ccc; transition:0.5s; padding: 10px;  }
.task-icon {
  line-height: 26.88px; display:line-block; padding: 0 3px;
}
.fa-search { line-height: 26.88px; font-size: 15px; padding: 0 3px;}
.cb1{display:none;}
.cb1+span { display:inline-block;position:absolute;  width: 20px;height:20px; top:9px;  right: 10px;  background: #fff; border: #eee 1px solid; cursor: pointer;
  &:hover{
    background: #ffd6d6;
  }
}
.cb1:checked+span:after{ 
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    background: #ffd6d6;
    width: 2px;
    height: 2px;
    box-shadow: 
      2px 0 0 red,
      4px 0 0 red,
      4px -2px 0 red,
      4px -4px 0 red,
      4px -6px 0 red,
      4px -8px 0 red;
    transform: rotate(45deg);
}
</style>

