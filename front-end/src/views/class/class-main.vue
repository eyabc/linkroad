<template>
  <div class="contents" v-if="classInfo">
    <div class="class-info">
      <header class="">
        <h1>{{ classInfo.title }}</h1>
        <hr class="class-hr">
      </header>
      <div class="opt">
        <span class="small-font">생성날짜 {{classInfo.date}}</span> 
        <div class="setting-wrap">
          <span class="icon-setting" ><i class="fas fa-cog"></i></span>
          <ul class="setting-menu">
            <li>
              <span @click="updateClassLayer"><i class="fas fa-pen"></i></span>
            </li>
            <li>
              <span @click="moveClassLayer"><i class="fas fa-people-carry"></i></span>
            </li>
          </ul>
        </div>
      </div>

      <p v-html="nl2br(classInfo.description)" />
    </div>

    <div class="lev">
      <levelView class="level-contents" v-for="(task, level) in tasks" :task="task" :level="level" :tidx="parent_task[level]"/>
    </div>
  </div>
</template>
<script>
  import levelView from '@/components/class/level-view'
  import updateClass from '@/components/layer/updateClass'
  import moveClass from '@/components/layer/moveClass'
  export default {
    components: {
      levelView, updateClass, moveClass
    },
    data () {
      return {
        classInfo: null,
        tasks: [],
        cidx: this.$route.params.cidx,
        parent_task: [0]
      }
    },
    created () {
      this.getClass()
      this.getTask()
    },
    methods: {
      async getClass () {
        const json = await fetch ('/api/class-list/' + this.cidx).then(res=>res.json())
        this.$store.commit('setClassInfo', json.classInfo)
        this.classInfo = json.classInfo
      },

      async getTask () {
        const json = await fetch(`/api/get-task/${this.cidx}/0`).then(res=>res.json())
        this.tasks.push(json.taskInfo)
      },
      moveClassLayer () {
        this.$store.commit('openLayer', moveClass)
      },
      updateClassLayer () {
        this.$store.commit('openLayer', updateClass)

      }
    }

  }
</script>

<style lang="scss">
  @mixin clear () {
    &:after{content:"";display:block;clear:both;}
  }
  h1 { font-size: 20px }
  .contents { padding: 10px; }
  .small-font { font-size: 12px; color : #777; display: inline-block;margin-right: 10px }
  .class-info {
    min-width:600px;
    width: 30%;
    margin:0 auto 20px;
    text-align: center;
    height: 100px;
  }
  hr.class-hr {height: 3px;background-color: #ddd; border: none; }
  .opt { line-height: 20px;
    span { top:0;line-height: 20px; }
    i{ line-height:20px}
  }
  .lev { 
    display: flex;
    flex-wrap: nowrap; 
    overflow-x: auto; 
    -webkit-overflow-scrolling: touch; 
    -ms-overflow-style: -ms-autohiding-scrollbar;  
  }
  .scroll::-webkit-scrollbar {display: none; }
  .level-contents{flex: 0 0 auto; margin: 0 10px; }
  .setting-wrap { float:right; width: 30px;  position: relative;}
  .setting-menu {background: #eee; width: 30px; opacity:0; border-radius: 5px; transition:1s;position:relative;
    i{transition:.5s;padding:5px 0;
      &:hover{transform:scale(1.2)}
    }
  }
  .icon-setting {position:absolute;right:0;top:0;bottom:0;display:block;text-align:center;transition:0.5s;width:30px;}
  fa-cog {display: block; padding: 5px;}
  .setting-wrap:hover { 
    .icon-setting { opacity:0; } 
    .setting-menu { opacity:1; }
  }

</style>