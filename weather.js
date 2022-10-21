// 5 days weather forecast api call
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} // lat and lon to be get from previous api call



const weatherData = {
 appID : '5d179f4cb4f82811e994c2ec6954cf79',
    date : new Date(),
 getWeatherData : function(city){
    this.fetchWeatherData(city);
 },
 
 fetchWeatherData : function(city){
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + this.appID + '&units=metric')
        .then(response => response.json())
        .then(result => {
       // console.log('Thirukural #', result.number)
       // console.log('Thirukural in tamil', result.line1)
            console.log(result);
            this.updateUI (result);
            //const lat=result.coord.lat;
            //const lon=result.coord.lon;
            this.fetchHourlyData(result.coord.lat,result.coord.lon);
        })
    },
fetchHourlyData : function (lat1=lat,lon1=lon,date1=this.date){
  console.log(this.date);
  console.log(   fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat1 + '&lon='+lon1+ '&APPID=' + this.appID + '&units=metric&dt_txt='+
this.date.getFullYear()+'-'+this.date.getMonth()+'-'+this.date.getDate()+"'"));
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat1 + '&lon='+lon1+ '&APPID=' + this.appID + '&units=metric&dt_txt='+
    this.date.getFullYear()+'-'+this.date.getMonth()+'-'+this.date.getDate()+"'")
    //fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon='+lon+ '&APPID=' + this.appID + '&units=metric')

    .then(response=>response.json())
    .then(result=>{
        console.log(result);
        this.getChart(result);
        this.getXaxis(result);
    })
},
    updateUI : function (result) {
        document.getElementById('spnTemp').innerHTML = Math.ceil(result.main.temp) + 'deg. C';
       // document.getElementById('spnTempImg').style.background = url('.\assets\images\cloudy.png');

        document.getElementById('divHumid').innerHTML = 'Humidity: ' + result.main.humidity +'%';
        document.getElementById('divPrecip').innerHTML = 'Pressure: ' + result.main.pressure ;

        document.getElementById('divWind').innerHTML = 'Wind: ' + Math.ceil(result.wind.speed) + 'kmph';

        document.getElementById('divName').innerHTML = result.name;
        document.getElementById('divDateTime').innerHTML = this.date;

        document.getElementById('divStatus').innerHTML = result.weather[0].description;

    },
        
    

//line chart example
/*
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };
*/
getChart : function (result){

if (  document.getElementById('myChart'))
  {
   document.getElementById('myChart').innerHTML="";
    
  }


 const labels = [
//'9 PM',
result.list[0].dt_txt,
'12 AM',
'3 AM',
'6 AM',
'9 AM',
'12 PM',
'3 PM',
'6 PM',

];

const data = {
labels : labels,
datasets: [{
    label : 'Temperature',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    fill:true,
    data: [result.list[0].main.temp,result.list[1].main.temp,result.list[2].main.temp,result.list[3].main.temp,result.list[4].main.temp,result.list[5].main.temp,result.list[6].main.temp,result.list[7].main.temp],
}

]
};

const config = {
    type: 'line',
    data: data,
    options: {
            animations: {
              tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
              }
            },
            scales: {
              y: { // defining min and max so hiding the dataset does not change scale range
                min: 20,
                max: 31,
                
              }
    },
    responsive : true

}};


const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
 // document.getElementById('myChart').remove();

},

getXaxis : function (result){
  
    //document.getElementById('chartXaxis').appendChild(div);
    const dtf = new Intl.DateTimeFormat();
    document.getElementById('spn1').innerHTML=this.date.toDateString();
    for (let i=2;i<=7;i++){

    var spn = document.createElement("span");
    spn.id = "spn"+i;
    document.getElementById("chartXaxis").appendChild(spn);
    const tomorrow= this.date.setDate(this.date.getDate() + 1)
    console.log(this.date);
    document.getElementById('spn'+i).innerHTML=this.date.toDateString();
    document.getElementById('spn'+i).addEventListener("click",this.fetchHourlyData(this.lat, this.lon,this.date.toDateString()));
    //document.getElementById('spn2').innerHTML=dtf.format(tomorrow);
    
}
},
gettingDate : function (event){
  console.log("date:" + event.innerHTML);
  //console.log(document.getElementById('spn'+i).innerHTML)}
}

}