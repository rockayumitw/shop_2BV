<template>
<div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table">
            <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
            </thead>
            <tbody>
                <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" class="text-right">總計</td>
                    <td class="text-right">{{ order.total }}</td>
                </tr>
            </tfoot>
        </table>
        <table class="table">
            <tbody>
                <tr>
                    <th width="100">Email</th>
                    <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                    <th>收件人電話</th>
                    <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                    <th>收件人地址</th>
                    <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                    <th>付款狀態</th>
                    <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-danger">確認付款去</button>
        </div>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            orderId: '',
            order: {
                user: {
                    email: '',
                    name: '',
                    address: '',
                    tel: '',
                },
            },

        }
    },
    methods: {
        getOrder() {
            const vm = this;
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/order/${vm.orderId}`;
            // vm.isLoading = true;
            this.$axios.get(url).then((res) => {
                console.log(res)
                vm.order = res.data.order;
                //console.log(res);
                // vm.isLoading = false;
            })
        },
        payOrder() { //
            const vm = this;
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/pay/${vm.orderId}`;
            // vm.isLoading = true;
            this.$axios.post(url).then((res) => {
                // console.log(res);
                if (res.data.success) {
                    this.getOrder()
                }
                // vm.isLoading = false;
            })
        }
    },
    created() {
        // console.log('hello')
        // console.log(this.$route.params.id)
        this.orderId = this.$route.params.id; //對應路由
        // console.log(this.orderId)
        this.getOrder(); //順序要注意

    }
}
</script>
