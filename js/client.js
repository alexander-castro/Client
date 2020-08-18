var app = new Vue({
    el: '#app',
    data: {
      time: 'hola',
      startTime: 0,
      messages: [],
      socket: io('http://localhost:3000/clients')
    },
    created: function () {
        this.connect();
    },
    methods: {
        connect: function(){
            let vue = this;
            this.socket.on('time', function(msg){
                vue.messages.push(msg);
            });
        },
        getTime: function () {
            this.startTime = new Date().getTime();
            axios
            .get('http://localhost:3000/time')
            .then(response => {
                let endTime = new Date().getTime();
                const travelTime = (endTime - this.startTime) / 2;
                let newTime = new Date();
                newTime.setHours(response.data.hour);
                newTime.setMinutes(response.data.minutes);
                newTime.setSeconds(response.data.seconds);
                newTime.setTime(newTime.getTime() + travelTime);
                this.time = newTime;
            }
            );
        }
    }
})