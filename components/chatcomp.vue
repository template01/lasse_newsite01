<template>
<div class="is-size-5-desktop is-size-6-touch chatcomp">
  <div class="robotGuide">
    <transition-group name="list" tag="div">
      <div :key="index" v-for="(message,index) in robotMessagesDisplay" class="bubbleWrapper aligner " v-if="!setUser" style="justify-content:flex-end">
        <div class="bubble" :style="lockUser? {'opacity':'1'}:{}">
          <div>
            <p class="is-size-7 is-size-7-touch" v-html="'Robot'"></p>
            <p class="is-size-5-desktop is-size-6-touch is-pulled-left" v-html="message"></p>
          </div>
        </div>
      </div>
    </transition-group>
  </div>

  <div class="bubbleWrapper fullwidth" v-if="!setUser">
    <div class="bubble" disabled="true" :style="lockUser? {'opacity':'0.55','pointer-events':'none'}:{}">
      <input onClick="this.select();" class="is-size-5-desktop is-size-6-touch is-pulled-left " autocomplete="off" type="text" name="user" maxlength="16" v-model="user" v-on:keyup.enter="submitUser">
      <div @click="submitUser">
        <div class="submit has-text-right uppercase is-pulled-left">

          <div class="">
            OK
          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-if="setUser">



    <div>
      <!-- {{last10chats}} -->
      <!-- {{sortChat}} -->
      <transition-group name="list" tag="div">
        <div class="bubbleWrapper aligner" :style="message.user.toUpperCase() === 'LASSE' ? {'justify-content': 'flex-end'}:{'justify-content': 'flex-start'}" v-for="(message,index) in sortChat" :key="'message'+index">
          <div class="bubble">
            <div>
              <p class="is-size-7 is-size-7-touch" v-html="safeContent(message.user)">

              </p>
              <p v-html="safeContent(message.content)"></p>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="bubbleWrapper fullwidth">
      <div class="bubble">
        <!-- <input type="text" name="user" v-model="user"> -->
        <input onClick="this.select();" class="is-size-5-desktop is-size-6-touch is-pulled-left" autocomplete="off" type="text" name="content" maxlength="120" v-model="content" v-on:keyup.enter="sendMessage">
        <div class="submit has-text-right uppercase is-pulled-left" @click="sendMessage">

          <div class="">
            Send
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import _ from 'lodash'
import striptags from 'striptags'
import {
  mapGetters
} from 'vuex'

export default {
  data() {
    return {
      user: 'enter name',
      content: 'enter message',
      chat: [],
      msgLimit: 30,
      submitUserAllowed: false,
      setUser: false,
      lasseAllowed: false,
      fetchInit: false,
      lockUser:false,
      robotMessages: ['Hi There!', 'You found the secret chat room!', 'How about filling in a name?', 'I tried to notify Lasse. Hopefully he will be online asap!', "When you're ready hit enter..."],
      robotMessagesChatHasRun: ["You're back! Go get em.", "Please enter your name again!"],
      robotMessageFetch: ['Cool! Just fetching the previous chat!', '...'],
      robotMessagesDisplay: []

    }
  },
  watch: {
    'content': function(content, contentBefore) {
      if (content === 'enter messag') {
        this.content = ''
      }
    },
    'user': function(user, userbefore) {
      if (user.toUpperCase() === 'LASSE' && !this.lasseAllowed) {
        this.user = ''
      } else if (user.length > 16) {
        this.user = ''
      } else if (user === 'enter nam') {
        this.user = ''
      } else if (user === '@lasse') {
        this.lasseAllowed = true
        this.user = 'Lasse'
      } else {
        if (user.trim().length > 0) {
          if (user === '') {
            this.submitUserAllowed = false
          } else {
            this.submitUserAllowed = true

          }
        }
      }
    }


  },
  computed: {
    ...mapGetters({
      getChatFirstRun: 'GET_CHAT_FIRST_RUN'
    }),
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

    pingLasse: function() {
      fetch(''+this.$store.state.rootChatServer+'pinglasse/sendmail', {
          method: 'get',
        })
        .then((res) => {
          // if (res.status !== 200) return;
          // res.json().then(function(data) {
          //   vm.chat = data
          // });
        })
        .catch((err) => console.log('Fetch Error :-S', err));
    },

    addRobotMessage: function() {

      var vm = this
      var index = 0
      var delay = 1200;
      var messages
      if (vm.getChatFirstRun) {
        messages = vm.robotMessages
      } else {
        messages = vm.robotMessagesChatHasRun
      }
      var robotLoop = function() {
        if (!vm.fetchInit) {

          delay = 0 + Math.floor(Math.random() * 1600) + 1000;
          vm.robotMessagesDisplay.push(messages[index])
          index = index + 1
          if (index < messages.length) {
            setTimeout(robotLoop, delay);
          }
        }
      }
      setTimeout(robotLoop, delay);

    },
    safeContent: function(input) {
      return striptags(input)
    },
    submitUser: function() {
      if (this.submitUserAllowed) {
        this.lockUser = true
        this.$nextTick(() => this.$el.querySelectorAll("input")[0].blur())
        this.robotMessagesDisplay=[]
        this.fetchInit = true
        var vm = this
        setTimeout(function() {
          vm.robotMessagesDisplay.push(vm.robotMessageFetch[0])
        }, 250)
        setTimeout(function() {
          vm.robotMessagesDisplay.push(vm.robotMessageFetch[1])
        }, 1250)
        setTimeout(function() {
          vm.setUser = true
          vm.$nextTick(() => vm.$el.querySelectorAll("input")[0].focus())
        }, 4000)

        // this.$nextTick(() => this.$el.querySelectorAll("input")[0].select())
      }
    },
    getInitChat: function() {
      var vm = this
      fetch(''+this.$store.state.rootChatServer+'chat?_limit=' + vm.msgLimit + '&_sort=createdAt:desc', {
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



      fetch(''+this.$store.state.rootChatServer+'chat', {
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
    // if(this.getChatFirstRun){
    this.pingLasse()
    // }
    this.$nextTick(() => this.$el.querySelectorAll("input")[0].focus())
    // this.$nextTick(() => this.$el.querySelectorAll("input")[0].select())
    this.getInitChat()
    var vm = this
    const socket = io(''+this.$store.state.rootChatServer+'');
    // listen for event name 'hello' & log it
    socket.on('hello', (res) => console.log(res));

    const food = document.getElementById('food');
    socket.on('food_ready', function(res) {
      console.log(res)
      vm.chat.push(res)
      // vm.robotMessagesDisplay.push(vm.robotMessageFetch[1])

      // vm.chat.push({ "user": "xxxxxxxxxxxxxxxxxxxxxxxxxxx", "content": "xxxxxxxxxxxxxxxxxxxxxxxxxxx", "_id": "5b9050xxxxxxxxxxx5f45e5154ba88cae11", "createdAt": "2018-09-05T21:53:35.143Z", "updatedAt": "2018-09-05T21:53:35.183Z", "__v": 0, "id": "5b9xxxxxxxxxx0505f45e5154ba88cae11" })
      //
      // vm.getInitChat()
    });


    this.addRobotMessage()

  }
}
</script>

<style lang="scss" scoped>
* {
    color: grey;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.25s;
}
/* .list-leave-active below version 2.1.8 */
.list-enter,
.list-leave-to {
    transform: translateY(5px);
    opacity: 0.8;
}

.robotGuide {
    .bubble {
        opacity: 0.55;
        // background: purple !important;

    }
}

.bubbleWrapper {

    margin-top: 8px;
    margin-bottom: 8px;
    width: 100%;
    &.fullwidth {
        .bubble {
            width: 100%;
            line-height: 46px;
        }
        &:last-of-type {
            margin-bottom: 0;
        }
    }
    .bubble {
        border-radius: 23px;
        display: inline-block;
        min-height: 46px;
        min-width: 46px;
        // line-height: 46px;
        padding: 6px 16px;
        background: white;
        transition: opacity 0.5s;

    }
}
input {
    &::selection {
        // color: inherit;
    }
    border: 0;
    margin: 0;
    background: transparent;
    outline: none;
    width: 80%;
    line-height: inherit;
    font-size: inherit;

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
