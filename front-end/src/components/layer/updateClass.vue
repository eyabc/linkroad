<template>
  <div class="ClassLayer">
    <form method="post" @submit.prevent="updateClass">
      <ul class="fields">
        <li>
          <label class="input-label">
            <span class="pre"><i class="fas fa-tag"></i></span>
            <input type="text" name="title" class="full-width" :value="`${classInfo.title}`" required autofocus>
            <span class="lbl">제목</span>
          </label>
        </li>
        <li>
          <label class="input-label">
            <span class="pre"><i class="fas fa-info"></i></span>
            <textarea name="description" class="full-width" :value="`${classInfo.description}`"></textarea>
            <span class="lbl">상세설명</span>
          </label>
        </li>
      </ul>
      <button class="btn" type="submit">Class 업데이트</button>
    </form>
  </div>  
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
          classInfo: this.$store.state.classInfo
      }
    },
    created () {
    },
    methods: {
     async updateClass (e) {
      const frm = e.target
      const data = {
        title: frm.title.value,
        description: frm.description.value
      }
      console.log(this.classInfo)
      const json = await fetch('/api/update-class/'+this.classInfo.cidx, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res=>res.json())
      if(json.success){
        this.$store.state.classInfo.title=data.title
        this.$store.state.classInfo.description=data.description
        this.classInfo = data
        this.$store.commit("closeLayer")
      } else {
        alert('오류')
      }
    },
  }
}
</script>