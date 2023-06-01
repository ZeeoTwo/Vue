<script>
import Publication from './components/Publication.vue';
import axios from "axios";

export default {
  data(){
    return{
      publications: Array,
    };
  },
  methods: {
    
  },
  components: {
    Publication
  },
  mounted() {
    axios.get(`http://localhost/example-app/public/api/publications`).then(res => {
        try {
          this.publications = res.data;
          console.log(this.publications);
        } catch (error) {
          console.log(error);
        }
      })
  },
}


</script>

<template>
  <div class="flex-col">
    <h1 class="text-4xl">Publications</h1>
    <div v-for="pub in publications" >
    <Publication :publication={pub}></Publication>
    </div>
  </div>
</template>

<style></style>
