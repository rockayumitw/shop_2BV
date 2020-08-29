<template lang="pug">
.login-area.d-flex.align-item-center.justify-content-center.text-center
    form.form-signin(@submit.prevent='signin')
        h1.h3.mb-3.font-weight-normal Please sign in
        label.sr-only(for='inputEmail') Email address
        input#inputEmail.form-control(v-model='userInfo.username', type='email', placeholder='Email address', required='', autofocus='')
        label.sr-only(for='inputPassword') Password
        input#inputPassword.form-control(v-model='userInfo.password', type='password', placeholder='Password', required='')
        .checkbox.mb-3
            label
                input(type='checkbox', value='remember-me')
                |  Remember me
        button.btn.btn-lg.btn-primary.btn-block(type='submit') Sign in
        p.mt-5.mb-3.text-muted &copy; 2017-2018
</template>

<script>
import {
    mapState,
    mapActions,
    mapMutations
} from 'vuex'
export default {
    layout: 'login',
    data() {
        return {
            userInfo: {
                username: 'rockayumitw@gmail.com',
                password: 'w1071030'
            }
        }
    },
    computed: {},
    mounted() {
        console.log(this.user)
    },
    methods: {
        // ...mapActions(['signin']),
        // ...mapMutations(['SET_USER'])
        signin() {
            const url = `https://vue-course-api.hexschool.io/admin/signin`;
            // const url = `${process.env.APIPATH}/admin/signin`;
            const _this = this;
            this.$axios.$post(url, _this.userInfo).then((res) => {
                if (res.success) {
                    console.log(res)
                    this.$store.commit('SET_USERINFO', this.userInfo)
                    this.$store.commit('SET_USERTOKEN', res.uid)
                    this.$router.push('/admin/products');
                }
            })
        }
    }
}
</script>

<style scoped>
html,
body {
    height: 100%;
}

body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.login-area {
    height: 100vh;
}

.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

.form-signin .checkbox {
    font-weight: 400;
}

.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}

.form-signin .form-control:focus {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
