<template>
<div>
    <b-button @click='getmodal(true)'>建立新的優惠卷</b-button>
    <!--產品列表-->
    <b-table :items="coupon" :fields="fields" :busy="isBusy" caption-top>
        <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </template>
        <template v-slot:cell(due_date)='data'>
            {{data.item.due_date | dateFormat('YYYY-MM-DD')}}
        </template>
        <template v-slot:cell(action)='data'>
            <b-button @click='getmodal(false,data.item)'>編輯</b-button>
            <b-button @click='removeCoupon(data.item.id)'>刪除</b-button>
        </template>
    </b-table>
    <!---->
    <Pagination :pagination="pagination" />

    <b-modal ref='couponModal' id="couponModal" :title="modaltitle" centered hide-footer>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <ValidationObserver tag="form" ref="couponForm" @submit.prevent='changeCoupon()'>
                        <div class="form-group">
                            <label for="title">標題</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <input type="text" class="form-control" id="標題" placeholder="請輸入標題" v-model="tempCoupon.title">
                                <span class="text-danger">{{errors[0]}}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <label for="title">優惠碼</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <input type="text" class="form-control" id="優惠碼" placeholder="請輸入優惠碼" v-model="tempCoupon.code">
                                <span class="text-danger">{{errors[0]}}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <!--格式日期-->
                            <label for="title">到期日</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <input type="date" class="form-control" id="到期日" placeholder="請輸入到期日" v-model="tempCoupon.due_date">
                                <!--<b-calendar v-model="tempCoupon.due_date" locale="en-US"></b-calendar>-->
                                <span class="text-danger">{{errors[0]}}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <label for="title">折扣百分比</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <input type="text" class="form-control" id="折扣百分比" placeholder="折扣百分比" v-model.number="tempCoupon.percent">
                                <span class="text-danger">{{errors[0]}}</span>
                            </ValidationProvider>
                        </div>
                        <b-form-checkbox id="checkbox-1" v-model.number="tempCoupon.is_enabled" name="checkbox-1" value="1" unchecked-value="0">
                            啟用
                        </b-form-checkbox>
                        <button class='btn'>送出</button>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </b-modal>
</div>
</template>

<script>
import {
    ValidationProvider,
    ValidationObserver
} from 'vee-validate';
import Pagination from '../Dashboard/Pagination'
export default {
    components: {
        ValidationProvider,
        ValidationObserver,
        Pagination
    },
    data() {
        return {
            isNew: null,
            modaltitle: '',
            tempCoupon: {
                title: '',
                is_enabled: 0,
                percent: '',
                due_date: '',
                code: ''
            },
            fields: [{
                    key: 'code',
                    label: '名稱'
                },
                {
                    key: 'percent',
                    label: '折扣百分比'
                },
                {
                    key: 'due_date',
                    label: '到期日'
                },
                {
                    key: 'is_enabled',
                    label: '是否啟用'
                },
                {
                    key: 'action',
                    label: '動作'
                },
            ],
            coupon: [],
            isBusy: false
        }
    },
    mounted() {
        this.getCoupon()
    },
    methods: {
        getmodal(action, item) {
            let _this = this
            if (action == true) {
                console.log(action)
                _this.isNew = true
                _this.tempCoupon = {}
                _this.modaltitle = '新增優惠卷'
                // _this.changeCoupon()
            } else {
                _this.modaltitle = '編輯優惠卷'
                _this.tempCoupon = Object.assign({}, item);
                _this.isNew = false
                _this.tempCoupon.due_date = moment(_this.tempCoupon.due_date).format('YYYY-MM-DD')
                // _this.changeCoupon(id)
            }
            _this.$refs['couponModal'].show()
        },
        changeCoupon() { // 新增優惠卷
            let url = ''
            let _this = this
            let httpMethod = ''

            if (_this.isNew) {
                httpMethod = 'post'
                url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/coupon`
            } else {
                httpMethod = 'put'
                url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/coupon/${ _this.tempCoupon.id}`
            }

            _this.tempCoupon.due_date = new Date(this.tempCoupon.due_date).getTime()

            _this.$refs.couponForm.validate().then((result) => {
                if (result) {
                    _this.$axios[httpMethod](url, {
                        data: this.tempCoupon
                    }).then((res) => {
                        console.log(res)
                        this.getCoupon()
                        _this.$refs['couponModal'].hide()
                    })
                }
            })
        },
        getCoupon(page = 1) { // 取得優惠卷
            let url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/coupons?page=${page}`
            ///api/:api_path/admin/coupons?page=:page
            let _this = this
            _this.$axios.get(url).then((res) => {
                console.log(res)
                this.coupon = res.data.coupons
                this.pagination = res.data.pagination;
            })
        },
        editCoupon(id) {
            console.log(id)
        },
        removeCoupon(id) {
            let url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/coupon/${id}`
            console.log('刪除' + id)
            console.log('delete')
            let _this = this
            _this.$axios.delete(url).then((res) => {
                console.log(res)
                this.getCoupon()
            })
        }
    }
}
</script>
