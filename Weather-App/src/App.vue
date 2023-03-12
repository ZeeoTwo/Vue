<script>
import axios from "axios";

export default {
  data(){
    return{
      inputValue: "",
      api_key: "36bb972eb44abc7137a2a84bd63afd71",
      data: null,
      forecast: null,
      forecast_day: null,
    };
  },
  methods: {
  
    fetchData() {
      this.fetchWeather();
      this.fetchForecast();
    },
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
    fetchIcon(icon) {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    },
    degToTxt(deg){

    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    // Split into the 8 directions
    let  DG = deg * 8 / 360;

    // round to nearest integer.
    DG = Math.round(DG, 0);

    // Ensure it's within 0-7
    DG = (DG + 8) % 8

    return directions[DG];
    },
    timestampToHour(timestamp){

      let date = new Date(timestamp * 1000);
      let hours = date.getHours();
      var minutes = "0" + date.getMinutes();

      return (hours + ':' + minutes.substr(-2));
    },
    fetchForecast() {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.inputValue}&units=metric&appid=${this.api_key}`
      axios.get(url)
      .then(response => {
        this.forecast = response.data
        this.setForecastDay(1);
        console.log(this.forecast);
      })
      .catch(error => {
        this.forecast = false;
        console.log("This City Doesn't Exist");
      });
    },
    setForecastDay(day){
      if (this.forecast) {
      const start = (day - 1) * 8;
      const end = day * 8;
      this.forecast_day = this.forecast.list.slice(start,end);
      // this.forecast_day = this.forecast_day.filter((_, index) => index % 2 === 0);
      console.log(this.forecast_day);
      }
    }
  },
  components: {
  }

}

</script>

<template>
  <!-- <h1 class="text-center text-6xl text-blue-600">Weather App</h1> -->
  <div class="flex justify-center">
    <input type="text" class="rounded-lg text-center" placeholder="City Name" v-model="inputValue">
    <button @click="fetchData" class="bg-slate-200 ml-5 shadow-gray-500 drop-shadow-lg  rounded-lg p-1 hover:bg-slate-400">Submit</button>
  </div>


  <div v-if="data === null" class="text-center">
  </div>
  <div v-else-if="data === false" class="text-center">
      <h1>This City Does not exist</h1>
    </div>
  <div v-else="">

    <div class="w-96 h-96 rounded-lg shadow-gray-500 drop-shadow-lg border border-opacity-5 border-gray-500 mt-5 flex-row justify-center text-center backdrop-blur-lg divide-y-2 divide-gray-300">

      <!-- Head -->
      <div class="pt-5 h-24 flex flex-row mr-5">
        <div class=" w-[100] float-left scale-100 pl-2 -mt-5">
          <img :src="fetchIcon(data.weather[0].icon)">
        </div>
          
            <div class=" flex-auto align-middle text-right">
              <p class="text-3xl">{{ data.name }}</p>
              <h1 class="mr-7">{{data.main.temp}} °C</h1>
            </div>

      </div>
      
      <!-- Mid -->
      <div name="parent" class="flex pt-3">
        <div name="child1" class="w-1/2 pl-1 flex flex-col items-start justify-start">
          <div class="flex">
            <img src="/assets/humidity.png" width="24" class="mr-1">
            <p>{{data.main.humidity}} %</p>
          </div>
          <div class="flex">
            <img src="/assets/pressure.png" width="24" class="mr-1">
            <p>{{data.main.pressure}} hPa</p>
          </div>
          <div class="flex">
            <img src="/assets/sunrise.png" width="24" class="mr-1">
            <h1>{{timestampToHour(data.sys.sunrise)}}</h1>
          </div>
        </div>

        <div name="child2" class="w-1/2 pr-1 flex flex-col items-end justify-start">
          <div class="flex">
            <h1 class="mr-1">{{degToTxt(data.wind.deg)}} {{(data.wind.speed*3.6).toFixed(1)}} km/h</h1>
            <img src="/assets/wind.png" width="24">
          </div>
          <div class="flex">
            <h1 class="mr-1">{{data.clouds.all}} %</h1>
            <img src="/assets/cloudiness.png" width="24">
          </div>
          <div class="flex">
            <h1 class="mr-1">{{timestampToHour(data.sys.sunset)}}</h1>
            <img src="/assets/sunset.png" width="24">
          </div>
        </div>

      </div>

      <!-- Foot -->
      <!-- 
        <div class="w-px drop-shadow-lg bg-gray-100 bg-opacity-30"></div>
        <div class="bg-green-500 w-1/5"></div>
       -->
      <div name="Days" ref="days">
        <div name="Buttons" class="flex justify-evenly pt-2">
          <button  class="rounded-lg p-1 backdrop-blur-2xl drop-shadow-lg border border-opacity-20 border-gray-100 hover:backdrop-blur-md hover:drop-shadow-sm" @click="setForecastDay(1)">Day 1</button>
          <button  class="rounded-lg p-1 backdrop-blur-2xl drop-shadow-lg border border-opacity-20 border-gray-100 hover:backdrop-blur-md hover:drop-shadow-sm" @click="setForecastDay(2)">Day 2</button>
          <button  class="rounded-lg p-1 backdrop-blur-2xl drop-shadow-lg border border-opacity-20 border-gray-100 hover:backdrop-blur-md hover:drop-shadow-sm" @click="setForecastDay(3)">Day 3</button>
          <button  class="rounded-lg p-1 backdrop-blur-2xl drop-shadow-lg border border-opacity-20 border-gray-100 hover:backdrop-blur-md hover:drop-shadow-sm" @click="setForecastDay(4)">Day 4</button>
          <button  class="rounded-lg p-1 backdrop-blur-2xl drop-shadow-lg border border-opacity-20 border-gray-100 hover:backdrop-blur-md hover:drop-shadow-sm" @click="setForecastDay(5)">Day 5</button>
        </div>

          <div class="flex h-full overflow-x-scroll">
            <div v-for="day in forecast_day" :key="day.dt" class="w-16 relative mr-2 ml-2 divide-y-2 divide-gray-300">
                  <img class="w-16 relative" :src="fetchIcon(day.weather[0].icon)">
                  <p class="w-16 relative">{{ timestampToHour(day.dt)}}</p>
                  <p class="w-16 relative font-bold">{{ day.main.temp_min }} °C</p>
                  <p class="w-16 relative font-thin">{{ day.main.temp_max }} °C</p>
            </div>
          </div>



      </div>
    </div>
  </div>
  


</template>

<style scoped>
</style>
