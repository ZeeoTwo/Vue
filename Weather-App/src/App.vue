<script>
import axios from "axios";

export default {
  data(){
    return{
      inputValue: "Szczecin",
      api_key: "36bb972eb44abc7137a2a84bd63afd71",
      data: null,
      
    };
  },
  methods: {
  
    fetchWeather() {
      const url =  `https://api.openweathermap.org/data/2.5/weather?q=${this.inputValue}&units=metric&appid=${this.api_key}`;

      axios.get(url)
      .then(response => {
        this.data = response.data
        console.log(this.data);
      })
      .catch(error => {
        this.data = false;
        console.log("This City Doesn't Exist");
      });
    },
    fetchIcon() {
      return `https://openweathermap.org/img/wn/${this.data.weather[0].icon}@2x.png`;
    }

  },
  components: {
  },

}

</script>

<template>
  <!-- <h1 class="text-center text-6xl text-blue-600">Weather App</h1> -->
  <input type="text" placeholder="City Name" v-model="inputValue">
  <button @click="fetchWeather">Submit</button>


  <div v-if="data === null">
    <h1>What City do you need?</h1>
  </div>
  <div v-else-if="data === false">
      <h1>This City Does not exist</h1>
    </div>
  <div v-else="">

    <div class="w-96 h-96 rounded-lg shadow-gray-500 shadow-sm border border-opacity-5 border-black mt-5 font-semibold flex-row justify-center text-center bg-blue-100">
      

      <div name="Head" class="pt-5 h-32 border-b-2 border-gray-100 flex flex-row">
        <div class=" w-[100] float-left scale-100">
          <img :src="fetchIcon()">
        </div>
        <div class="align-middle">
          <p class="text-3xl">{{ data.name }}</p>
        </div>
        <h1>Temp:{{data.main.temp}}</h1>
      </div>
      
      
      <div class="hidden">
        <h1>Feels Like:{{data.main.feels_like}}</h1>
        <h1>Min:{{data.main.temp_min}}</h1>
        <h1>Max:{{data.main.temp_max}}</h1>
      </div>
      
      <div class="hidden">
        <h1>Cloudines:{{data.clouds.all}}</h1>
        <h1>Weather:{{data.weather[0].main}}</h1>
      </div>
    </div>
  </div>
  


</template>

<style scoped>
</style>
