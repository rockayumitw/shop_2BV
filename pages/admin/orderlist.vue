<template>
<div>
    <OrderList />
</div>
</template>

<script>
import OrderList from '../../components/Dashboard/OrderList'
// import Sidebar from '../../components/Dashboard/Sidebar'
// import Alert from '../../components/Dashboard/AlertMessage'

export default {
    layout: 'dashboard',
    components: {
        OrderList,
        // Sidebar,
        // Alert,
    }
}
</script>
