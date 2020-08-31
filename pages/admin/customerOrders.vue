<template>
<div>
    <customerOrders />
</div>
</template>

<script>
import customerOrders from '../../components/Dashboard/customerOrders'
// import Sidebar from '../../components/Dashboard/Sidebar'
// import Alert from '../../components/Dashboard/AlertMessage'

export default {
    layout: 'dashboard',
    components: {
        customerOrders,
        // Sidebar,
        // Alert,
    }
}
</script>
