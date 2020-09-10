import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend, localize} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import { required, email } from 'vee-validate/dist/rules'  // 按照需求導入規則

Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});

// 註冊的名稱
extend('required', required)
extend('email', email)


// 語系導入
localize('zh_TW', TW,{
  messages: {
    names:{
      username:'使用者'
    },
    fields:{
      
    }
  }
})


// // 全域註冊 - 比較推薦(區域)
// Vue.component('ValidationObserver', ValidationObserver);
// Vue.component('ValidationProvider', ValidationProvider);