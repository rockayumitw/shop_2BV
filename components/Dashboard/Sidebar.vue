<template lang="pug">
div
    nav.sidebar.d-none.d-md-block.bg-light.col-md-2
        .sidebar-sticky
            h6.sidebar-heading.d-flex.justify-content-between.align-items-center.px-3.mt-4.mb-1.text-muted
                span 管理員
            ul.nav.flex-column.mb-2
                li.nav-item
                    nuxt-link.nav-link(to='./products') 產品列表
                li.nav-item
                    nuxt-link.nav-link(to='./orderlist') 訂單列表
                li.nav-item
                    nuxt-link.nav-link(to='./coupon') 優惠券 

            h6.sidebar-heading.d-flex.justify-content-between.align-items-center.px-3.mt-4.mb-1.text-muted
                span 模擬功能
            ul.nav.flex-column.mb-2
                li.nav-item
                    nuxt-link.nav-link(to='./customerOrders') 模擬訂單
</template>
