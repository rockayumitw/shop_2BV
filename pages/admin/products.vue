<template>
<div>
    <Products />
</div>
</template>

<script>
import Products from '../../components/Dashboard/Products'
// import Sidebar from '../../components/Dashboard/Sidebar'
// import Alert from '../../components/Dashboard/AlertMessage'

export default {
    layout: 'dashboard',
    components: {
        Products,
        // Sidebar,
        // Alert,
    }
}
</script>
