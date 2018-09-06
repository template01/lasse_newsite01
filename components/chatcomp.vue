<template>
<div>
  <div v-if="!setUser">
    <input type="text" name="user" v-model="user">
    <div class="uppercase" @click="setUser = true">
      OK
    </div>
  </div>
  <div v-if="setUser">


    <div>
      <!-- <input type="text" name="user" v-model="user"> -->
      <input type="text" name="content" v-model="content">  <div class="uppercase" @click="sendMessage">
          Send
        </div>
    </div>
    <div>
      <!-- {{last10chats}} -->
      <div v-for="message in last10chats" :key="message.id">
        <span v-html="message.user+': '"></span><span v-html="message.content"></span>
      </div>
    </div>
  </div>

</div>
</template>
<script>
export default {
  data() {
    return {
      user: '',
      content: '',
      chat: [],
      setUser: false
    }
  },
  computed: {
    last10chats: function() {
      return this.chat.slice(-10)
    }
  },
  methods: {
    getInitChat: function() {
      var vm = this
      fetch('http://51.15.227.36:1337/chat', {
          method: 'get',
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then(function(data) {
            vm.chat = data
          });
        })
        .catch((err) => console.log('Fetch Error :-S', err));
      // });
    },
    sendMessage: function() {
      // add.addEventListener('click', () => { // listen to click event
      // send a post request with our input value
      var vm = this

      fetch('http://51.15.227.36:1337/chat', {
          method: 'post',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: `user=${this.user}&content=${this.content}`
        })
        .then((res) => {
          if (res.status !== 200) return;
          res.json().then(function(data) {
            vm.content = 'ass'
          });
        })
        .catch((err) => console.log('Fetch Error :-S', err));
      // });
    }

  },
  mounted() {
    // alert('go')
    this.getInitChat()
    var vm = this
    const socket = io('http://51.15.227.36:1337/');
    // listen for event name 'hello' & log it
    socket.on('hello', (res) => console.log(res));

    const food = document.getElementById('food');
    socket.on('food_ready', function(res) {
      console.log()
      // vm.chat.push({ "user": "xxxxxxxxxxxxxxxxxxxxxxxxxxx", "content": "xxxxxxxxxxxxxxxxxxxxxxxxxxx", "_id": "5b9050xxxxxxxxxxx5f45e5154ba88cae11", "createdAt": "2018-09-05T21:53:35.143Z", "updatedAt": "2018-09-05T21:53:35.183Z", "__v": 0, "id": "5b9xxxxxxxxxx0505f45e5154ba88cae11" })
      //
      vm.getInitChat()
    });

  }
}
</script>

<style lang="scss">

</style>
