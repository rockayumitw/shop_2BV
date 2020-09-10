<template>
<div>
    <customerCheckOut />
</div>
</template>

<script>
import customerCheckOut from '../../../components/Dashboard/customerCheckOut'
// import Sidebar from '../../components/Dashboard/Sidebar'
// import Alert from '../../components/Dashboard/AlertMessage'

export default {
    layout: 'dashboard',
    components: {
        customerCheckOut,
        // Sidebar,
        // Alert,
    }
}
</script>
