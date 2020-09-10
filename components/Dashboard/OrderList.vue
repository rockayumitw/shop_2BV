<template>
<div>
    <!--產品列表-->
    <b-table :items="products" :fields="fields" :busy="isBusy" caption-top>
        <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </template>
        <template v-slot:cell(create_at)='data'>
            <span>{{data.item.paid_date | dateFormat('YYYY.MM.DD')}}</span>
        </template>
        <template v-slot:cell(user)='data'>
            <span>{{data.item.user.email}}</span>
        </template>
        <template v-slot:cell(products)='data'>
            <span>{{data.item.products}}</span>
            <!--<span>{{data.item.products.product.title}}</span>-->
        </template>
        <template v-slot:cell(total)='data'>
            <span>{{data.item.total}}</span>
        </template>
        <template v-slot:cell(is_paid)='data'>
            <span v-if="data.item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-danger">尚未啟用</span>
        </template>
    </b-table>
</div>
</template>

<script>
export default {
    data() {
        return {
            fields: [{
                    key: 'create_at',
                    label: '購買時間'
                },
                {
                    key: 'user',
                    label: 'Email'
                },
                {
                    key: 'products',
                    label: '購買款項'
                },
                {
                    key: 'total',
                    label: '應付金額'
                },
                {
                    key: 'is_paid',
                    label: '是否付款'
                },
            ],
            products: [],
            isBusy: false
        }
    },
    computed: {

    },
    mounted() {
        this.getOrderList()
    },
    methods: {
        getOrderList() {
            let _this = this
            let url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/orders?page=:page`
            this.$axios.get(url).then((res) => {
                console.log(res)
                _this.products = res.data.orders
            });
        }
    }
}
</script>
