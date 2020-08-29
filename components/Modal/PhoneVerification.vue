<template>
      <b-modal id="modal-phoneVerification" :modal-class="modalClass" centered title="">
        <template v-slot:modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <b-button size="sm" class='btn-close'  @click="close(),cancleValidation()">
            <img src="../../assets/_img/_btn/btn-close.png" alt="">
          </b-button>
        </template>
            <div class='text-center text-white mx-auto title'>我們已經發送驗證碼至您的手機</div>
            <div class="text-center phoneNumber text-white mx-auto title mb-3">{{phoneNumber}}</div>
          <b-input v-model="code" :state="validationCodeState" placeholder='請輸入收到的驗證碼(測試tip:123456)' id="feedback-user"></b-input>
          <b-form-valid-feedback class='d-block'>
            {{errMessage}}
          </b-form-valid-feedback>
          <p class="mt-3 mb-4 text-center text-silver"></p>
          <!--modal-footer-->
          <template v-slot:modal-footer>
            <div class="w-100 text-center">
                <p class="">
                    驗證碼有效時間
                    <span class='timer text-red'>{{timer}}</span>
                </p>
              <b-button variant="primary" size="sm" class="btn-submit" @click="resetCountDown()" :disabled = "timerState">重新發送驗證碼</b-button>
            </div>
          </template>
      </b-modal>
</template>

<script>

export default {
  data() {
      return{
          code:'',                    // 輸入驗證碼
          correctCode: '123456',      // 正確驗證碼
          timer: 60,                  // 時間倒數
          timerState : true,          // true => 時間尚未到
          validation: '',             // 電話號碼驗證
          errMessage: '',             // 錯誤訊息
          phoneNumber: '+886 0912345XXX',
          modalClass: '__login',
          phoneVerificationModalShow: false,
      }
  },
  watch:{
    code: function(val){
      this.validationForm()
    }
  },
  computed:{
    validationCodeState (){
      return this.code.length == this.correctCode  ? true : false
    }
  },
  mounted (){
    this.resetFrom()
    this.$store.watch(this.$store.getters.getCountDown, isCountDown => {
      console.log('watched isCountDown: ', this.$store.state.isCountDown)
      if(this.$store.state.isCountDown){
        this.resetCountDown()
      }
    })
  },
  methods:{
    cancleValidation (){
      this.resetFrom()
      this.$store.dispatch('setCountDown', false)
    },
    resetFrom(){
      this.code = ''
      this.correctCode = '123456'
      this.timer = 60                   // 時間倒數
      this.timerState = true            // true => 時間尚未到
      this.validation = ''              // 電話號碼驗證
      this.errMessage = '請輸入驗證碼'  // 錯誤訊息
      this.phoneVerificationModalShow = false
    },
    countDown (){
      this.timerState = true
      if(this.timer > 0){
        this.timer -- 
      }else{
        this.timerState = false
        clearInterval(this.interval)
      }
    },
    startCountDown (){
      this.interval = setInterval( this.countDown, 1000)
    },
    resetCountDown (){              // 驗證碼重新送出
      clearInterval(this.interval)
      this.timerState = true
      this.timer = 60;
      this.startCountDown()
    },
    validationForm (){
      if (this.code == null){
        this.errMessage = '請輸入驗證碼'
      }
      if(this.code != this.correctCode){
        this.errMessage = '驗證碼不正確'
      }
      if(this.code == this.correctCode){
        this.errMessage = '歡迎登入'
        // this.$store.state.isLogin = true
        // this.$store.getters.getLogin = true
        this.phoneVerification()
      }
    },
    phoneVerification (){             // 驗證碼驗鄭成功送出確認送出
      this.$bvModal.hide('modal-phoneVerification')
      this.$store.dispatch('setLogin', true)
      this.$store.dispatch('setCountDown', false)
      this.resetFrom()
    }
  },
  components: {
    // Login
  }
};
</script>
