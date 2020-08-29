<template>
    <div>
      <!--login-->
      <b-modal id="modal-login" :modal-class="modalClass" centered title="" ok-only no-stacking>
        <div class='__login'></div>
        <template v-slot:modal-header="{ close }">
          <b-button size="sm" class='btn-close' @click="close()">
            <img src="../../assets/_img/_btn/btn-close.png" alt="">
          </b-button>
          <div class='text-center text-white mx-auto title'>門號登入</div>
        </template>
          <b-form-group label="" label-for="input-3">
              <b-form-select
              id="input-3"
              v-model="countryCode"
              :options="countryCodeData"
              :state = "countryCodeState"
              aria-describedby="input-live-feedback"
              required
              ></b-form-select>
          </b-form-group>
          <!--國碼-->
          <b-form-group label="" label-for="input-3">
              <b-input v-model="phoneNumber" :state = "phoneNumberState" placeholder='請輸入電話號碼(測試tip:隨便輸入1個字母)'></b-input>
          </b-form-group>
          <b-form-valid-feedback class='d-block'>
            {{errMessage}}
          </b-form-valid-feedback>
          <p class="mt-2 mb-4 text-center text-silver">
            請輸入門號，註冊或登入教學平台<br/>
            當您按下「送出」即表示您同意我們的<br/>
            <b-link class='text-white' href="/">使用者條約</b-link>以及
            <b-link class='text-white' href="/">隱私權條款</b-link>
          </p>
          <!--modal-footer-->
          <template v-slot:modal-footer>
            <div class="w-100 text-center">
              <b-button variant="primary" size="sm" class="btn-submit" @click="phoneSubmit()" :disabled="validation">送出</b-button>
            </div>
          </template>
      </b-modal>
    </div>
</template>

<script>

export default {
  data() {
      return{
          countryCode: null,         // 國碼
          phoneNumber: '',           // 電話號碼
          errMessage: '請選擇國碼',  // 錯誤訊息
          modalClass: "__login",
          validation: false,
          countryCodeData: [{ text: 'Select One', value: null }, '+886', '+996'],
          phoneVerificationModalShow: false,     // 電話驗證碼
      }
  },
  watch:{
    countryCode: function(val){
      this.validationForm()
    },
    phoneNumber: function(val){
      this.validationForm()
    }
  },
  computed: {
    countryCodeState (){
      return this.countryCode ? true : false
    },
    phoneNumberState (){
      return this.phoneNumber.length > 8  ? true : false
    }
  },
  mounted () {
    this.resetForm()
  },
  methods:{
    resetForm (){
      this.phoneNumber = ''
      this.countryCode = null
      this.validation = true
      this.errMessage = '請選擇國碼'
      this.countryCodeData = [{ text: 'Select One', value: null }, '+886', '+996']
    },
    validationForm (){
      this.validation = true
      if(this.countryCode == null){
        this.errMessage = '請選擇國碼'
        return
      }
      if(this.phoneNumber == ''){
        this.errMessage = '請輸入電話'
        return
      }
      // if(this.phoneNumber.length < 9){
      //   this.errMessage = '電話號碼少於9'
      //   return
      // }
      if(this.countryCode != '' && this.phoneNumber != ''){
        this.errMessage = '請點選下方送出按鈕'
        this.validation = false
      }
    },
    phoneSubmit (){
      this.$bvModal.show('modal-phoneVerification')
      // this.$store.data.isLogin = true
      // console.log(this.$store.data.isLogin )
      this.$store.dispatch('setCountDown', true)
      this.resetForm()
    },
    getUserData (){
      this.userData = this.$store.state.UserData
    }
  },
  components: {
    // Login
  }
};
</script>
