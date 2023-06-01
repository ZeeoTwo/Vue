<script>

export default{
  props:{
    publication: {},
  },
  // data(){
  //   return{
  //     publication: {}
  //   }
  // },
  mounted() {
    console.log(this.publication)
  },
}

</script>

<template>
  <div class="flex-col justify-center border border-black content-center">
    <h1 class="text-4xl">{{publication.pub.title}}</h1>
    <hr>
    <div class="flex justify-center">
      <p class="text-sm">{{ publication.pub.content }}</p>


    </div>


  </div>
</template>

<style scoped></style>
