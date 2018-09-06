<template>
<div>
  <div v-if="!setUser">
    <input onClick="this.select();" class="is-pulled-left" autocomplete="off" type="text" name="user" maxlength="3" v-model="user" v-on:keyup.enter="submitUser">
    <div @click="submitUser">
      <div class="submit has-text-right uppercase is-pulled-left">

        <div class="">
          OK
        </div>
      </div>
    </div>
  </div>
  <div v-if="setUser">



    <div>
      <!-- {{last10chats}} -->
      <!-- {{sortChat}} -->
      <div v-for="message in sortChat" :key="message.id">
        <span v-html="message.user+': '"></span><span v-html="message.content"></span>
      </div>
    </div>
    <div>
      <!-- <input type="text" name="user" v-model="user"> -->
      <input onClick="this.select();" class="is-pulled-left" autocomplete="off" type="text" name="content" maxlength="120" v-model="content" v-on:keyup.enter="sendMessage">
      <div class="submit has-text-right uppercase is-pulled-left" @click="sendMessage">

        <div class="">
          Send
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      user: 'enter usr name. max 3 letters.',
      content: 'enter message',
      chat: [],
      msgLimit: 10,
      submitUserAllowed: false,
      setUser: false
    }
  },
  watch: {
    'user': function(user) {
      if (user.toUpperCase() === 'LAS') {
        this.user = ''
      } else if (user.length > 3) {
        this.user = ''
      } else {
        if (user.trim().length > 0) {
          this.submitUserAllowed = true
        }
      }
    }


  },
  computed: {
    last10chats: function() {
      return this.chat.slice(-10)
    },
    sortChat: function() {
      // return this.chat.sort()
      return _.sortBy(this.chat, function(dateObj) {
        return new Date(dateObj.createdAt);
      });


    }
  },
  methods: {
    submitUser: function() {
      if (this.submitUserAllowed) {
        this.setUser = true
        this.$nextTick(() => this.$el.querySelectorAll("input")[0].focus())
        this.$nextTick(() => this.$el.querySelectorAll("input")[0].select())
      }
    },
    getInitChat: function() {
      var vm = this
      fetch('http://51.15.227.36:1337/chat?_limit=' + vm.msgLimit + '&_sort=createdAt:desc', {
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
        .then(function(res) {
          vm.content = ''
        })
        .catch((err) => console.log('Fetch Error :-S', err));
      // });
    }

  },
  mounted() {
    // alert('go')
    this.$nextTick(() => this.$el.querySelectorAll("input")[0].focus())
    this.$nextTick(() => this.$el.querySelectorAll("input")[0].select())
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

<style lang="scss" scoped>
input {
    border: 0;
    margin: 0;
    background: transparent;
    outline: none;
    width: 80%;

    // border-bottom: 2px solid white;
}
.submit {
    width: 20%;
}
.blink {
    animation: blink-animation 1.5s steps(2, start) infinite;
}
@keyframes blink-animation {
    to {
        visibility: hidden;
    }
}
@-webkit-keyframes blink-animation {
    to {
        visibility: hidden;
    }
}
</style>
