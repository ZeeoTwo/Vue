<script>
import Github_card from './components/Github_card.vue';
import Github_card_wrapper from './components/Github_card_wrapper.vue';

export default {
  data(){
    return{
      inputValue: "",
      compValue: "ZeeoTwo",
      users: ["ZeeoTwo", "XvenumPL"],
    };
  },
  methods: {
    sendUsername() {
      this.compValue = this.inputValue;
      this.input = "";
    }
  },
  components: {
    Github_card,Github_card_wrapper
  },

}

</script>

<template>
  <div>
  <input type="text" placeholder="Username" v-model="inputValue"/>
  <button @click="sendUsername">Show User Card</button>
  <!-- <Github_card :username=compValue /> -->
  <Github_card_wrapper :usernames=users>

  </Github_card_wrapper>
  </div>
</template>