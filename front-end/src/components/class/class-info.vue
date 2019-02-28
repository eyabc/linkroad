<template>
  <div>
  	<div class="contents" v-if="classInfo">
  	  <div class="class-info" v-if="!editState">
  	    <header class="">
  	      <h1>{{ classInfo.title }}</h1>
  	      <hr class="class-hr">
  	    </header>
  	    <div class="opt">
  	      <span class="small-font">생성날짜 {{classInfo.date}}</span> 
  	      <span @click="goEdit"><i class="fas fa-pencil-alt icons" ></i></span>
  	    </div>
  	    <p v-html="nl2br(classInfo.description)" />
  	  </div>
  	  <div class="class-info class-edit" v-else>
  	    <form method="post" @submit.prevent="editClass">
  	      <header class="">
  	        <input type="text" name="title" :value="`${classInfo.title}`" required Tabindex=1>
  	      </header>
  	      <textarea name="description" :value="`${classInfo.description}`" Tabindex=2></textarea>
  	      <div>
  	        <button type="submit"><i class="fas fa-check icons" Tabindex=3></i></button>
  	        <span @click="editCancel"><i class="fas fa-undo-alt icons"></i></span>
  	      </div>
  	    </form>
  	  </div>
  </div>
</template>