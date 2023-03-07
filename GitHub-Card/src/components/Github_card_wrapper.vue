<script>
import Github_card from './Github_card.vue';


export default{
  props:{
    usernames: Array,
  },
  components:{
    Github_card
  }
}

</script>

<template >
    <div v-for="user in usernames">
        <Github_card :username=user />
    </div>

</template>