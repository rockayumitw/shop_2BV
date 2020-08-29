<template>
<div class='wrap them-TW'>
    <nuxt />
</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}
</style>

<script>
// import Header from '~/components/Header.vue'
// import Footer from '~/components/Footer.vue'
// import Loading from '~/components/Loading/Loading-DNA.vue'
import {
    searchMixins
} from '../mixins/search'

export default {
    mixins: [searchMixins],
    name: '',
    head: {},
    data() {
        return {
            isActive: false,
            isFocus: 'true',
            isLoading: true,
        }
    },
    mounted() {
        // this.$cookies.set('token','test')
        // gsap.to(".box", {rotation: 27, x: 100, duration: 1});
        // this.isLoading = false
    },
    methods: {
        click() {
            this.$swal('哈囉')
        },
    },
    components: {
        // Header,
        // Footer,
        // Loading
    }
}
</script>
