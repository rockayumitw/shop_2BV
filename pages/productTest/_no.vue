<template>
<div>
    detail---{{this.$route.params}} ---- {{this.$route.params.no}}
    {{detail}}
</div>
</template>

<script>
// import axios from 'axios'
// export default {
//     asyncData(data) {
//         let api = `https://randomuser.me/api?id=${data.params.no}`
//         return axios({
//             url: api,
//         }).then(res => {
//             return {
//                 detail: res.data.results.id
//             }
//         })
//     }
// }
</script>
