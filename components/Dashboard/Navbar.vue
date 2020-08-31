<template>
<div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
        <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
                <a class="nav-link" to="/login" @click.prevent='logout'>Sign out</a>
            </li>
        </ul>
    </nav>
</div>
</template>

<script>
import axios from 'axios'
export default {

    data() {
        return {

        }
    },
    methods: {
        logout() {
            // const url = `${process.env.APIPATH}/logout`;
            const url = `https://vue-course-api.hexschool.io/logout`;
            const _this = this;
            this.$axios.post(url).then((response) => {
                console.log(response)
                if (response.data.success) {
                    this.$router.push('/Login')
                }
            })
        }
    }
}
</script>
