<script>
import Card from 'primevue/card';
import axios from 'axios'

export default{
  props:{
    username: String,
  },
  data() {
    return{
      user: {}
    }
  },
  mounted() {
    axios.get(`https://api.github.com/users/${this.username}`)
      .then(response => {
        this.user = response.data;
        console.log(this.user);
      });
  },
  components:{
    Card
  }
}

</script>

<template>
  <Card style="width: 300px;">
    <template #header>
      <img :src=user.avatar_url>
    </template>
    <template #title>
      <p>{{ user.name }}</p>
    </template>
    <template #content>
      <p>{{ user.bio }} </p>
    </template>
    <template #footer>
      <p>{{ user.created_at }}</p>
    </template>
  </Card>
</template>