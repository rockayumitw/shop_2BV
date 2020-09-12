<template>
<div>
    <!--<loading :active.sync="isLoading"></loading>
    customerOrder-->

    <div class="row mt-4">
        <div class="col-md-4 col-6 mb-4" v-for="item in products" :key="item.id">
            <div class="card border-0 shadow-sm">
                <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}">
                </div>
                <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div v-if="!item.price" class="h5">{{item.origin_price | currency}} 元</div>
                        <del v-if="item.price" class="h6">原價 {{item.origin_price | currency}} 元</del>
                        <div v-if="item.price" class="h5">現在只要 {{item.price | currency}} 元</div>
                    </div>
                </div>
                <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        加到購物車
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!--取得商品-->
    <b-modal ref='productModal' id="productModal" centered :title="product.title " hide-footer>
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt="">

                    <blockquote class="blockquote mt-3">
                        <p class="mb-0">{{ product.content }}</p>
                        <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h4" v-if="!product.price">{{ product.origin_price | currency}} 元</div>
                        <del class="h6" v-if="product.price">原價 {{ product.origin_price | currency}} 元</del>
                        <div class="h4" v-if="product.price">現在只要 {{ product.price | currency}} 元</div>
                    </div>
                    <select name="" class="form-control mt-3" v-model="product.num">
                        <option :value="num" v-for="num in 10" :key="num">
                            選購 {{num}} {{product.unit}}</option>
                    </select>
                </div>

                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                        小計 <strong>{{ product.num*product.price | currency}}</strong> 元
                    </div>
                    <button type="button" class="btn btn-primary" @click="addtoCart(product.id, product.num)">
                        <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                        加到購物車
                    </button>
                </div>
            </div>
        </div>
    </b-modal>

    <!--取得商品-->

    <!--購物清單-->
    <div class="my-5 row justify-content-center">
        <div class="my-5 row justify-content-center">
            <table class="table">
                <thead>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                    <th>總價</th>
                </thead>
                <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                        <td class="align-middle">
                            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                                <b-icon icon="trash" aria-hidden="true"></b-icon>
                            </button>
                        </td>
                        <td class="align-middle">
                            {{item.product.title}}
                            <div class="text-success" v-if="item.coupon">
                                已套用優惠券
                            </div>
                        </td>
                        <td class="align-middle">
                            {{item.qty}}
                        </td>
                        <td>{{item.qty}}/{{item.product.unit}}</td>
                        <td>{{item.final_total}}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="text-right">總價</td>
                        <td class="text-right">{{ cart.final_total }}</td>
                    </tr>
                    <tr v-if="cart.final_total">
                        <td colspan="3" class="text-right text-success">折扣價</td>
                        <td class="text-right text-success">{{ cart.final_total }}</td>
                    </tr>
                </tfoot>
            </table>

            <!--套用優惠-->
            <div class="input-group mb-3 input-group-sm">
                <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                        套用優惠碼
                    </button>
                </div>
            </div>
            <!--套用優惠-->
        </div>
    </div>
    <!--購物清單-->

    <!--表單-->
    <div class="my-5 row justify-content-center">
        <ValidationObserver tag='form' ref="observer" class="col-md-6" @submit.prevent='creatOrder'>
            <div class="form-group">
                <label for="useremail">Email</label>
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                    <input type="email" class="form-control" name="email" id="useremail" placeholder="請輸入 Email" v-model="form.user.email">
                    <span class="text-danger">{{errors[0]}}</span>
                </ValidationProvider>
            </div>
            <div class="form-group">
                <label for="username">收件人姓名</label>
                <!--當觸發的時候不存在會跳出錯誤,name是對應上面的name="name"
               <input type="text" class="form-control" name="name" id="username" placeholder="輸入姓名" :class="{'is-invalid':errors.has('name')}" v-validate="'required'" v-model="form.user.name">
                <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>-->

                <ValidationProvider rules="required" v-slot="{ errors }">
                    <input type="text" class="form-control" name="username" id="username" placeholder="請輸入 姓名" v-model="form.user.name">
                    <span class="text-danger">{{errors[0]}}</span>
                </ValidationProvider>

            </div>
            <div class="form-group">
                <label for="usertel">收件人電話</label>
                <!--<input type="tel" class="form-control" id="usertel" placeholder="請輸入電話">-->
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <input type="tel" class="form-control" name="tel" id="usertel" placeholder="請輸入連絡電話" v-model="form.user.tel">
                    <span class="text-danger">{{errors[0]}}</span>
                </ValidationProvider>
            </div>
            <div class="form-group">
                <label for="useraddress">收件人地址</label>
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <input type="text" class="form-control" name="address" id="useraddress" placeholder="請輸入地址" v-model="form.user.address">
                    <span class="text-danger">{{errors[0]}}</span>
                </ValidationProvider>
                <!--<input type="address" class="form-control" name="address" id="useraddress" placeholder="請輸入地址">
                <span class="text-danger">地址欄位不得留空</span>-->
            </div>
            <div class="form-group">
                <label for="usermessage">留言</label>
                <textarea name="" id="" class="form-control" cols="30" rows="10"></textarea>
            </div>
            <div class="text-right">
                <button class="btn btn-danger">送出訂單</button>
            </div>
        </ValidationObserver>
    </div>

</div>
</template>

<script>
import $ from 'jquery';
import {
    ValidationProvider,
    ValidationObserver
} from 'vee-validate';
import {
    BIcon
} from 'bootstrap-vue'

export default {
    components: {
        BIcon,
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            products: [],
            product: {},
            isLoading: false,
            status: {
                loadingItem: '',
            },
            cart: {},
            coupon_code: '',
            form: {
                user: {
                    name: 'test',
                    email: 'test@test.com',
                    tel: '000000',
                    address: 'test',
                },
                message: '',
            }
        }
    },
    methods: {
        getProducts() { //取得商品列表
            //https://vue-course-api.hexschool.io/api/rockayumitw/admin/products?page=${page}
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/products?page=:page`;
            const _this = this;
            // vm.isLoading = true;
            this.$axios.$get(url).then((res) => {
                // console.log(res)
                // vm.isLoading = false;
                _this.products = res.products;
                // console.log(res.data.products)
            })
        },
        getProduct(id) { //取得單一列表
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/product/${id}`;
            const _this = this;
            _this.status.loadingItem = id;
            this.$axios.$get(url).then((res) => {
                _this.product = res.products;
                // $('#productModal').modal('show');
                _this.$refs['productModal'].show()
                _this.status.loadingItem = '';
                // console.log(res)
            })
        },
        addtoCart(id, qty = 1) { //加入購物車
            // console.log(id, qty)
            const _this = this;
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/cart`;
            _this.status.loadingItem = id;
            const cart = { //兩個參數
                product_id: id,
                qty,
            }
            this.$axios.post(url, {
                data: cart
            }).then((res) => {
                // console.log(res);
                _this.status.loadingItem = '';
                _this.$refs['productModal'].hide()
                _this.getCart(); //重新獲取購物車表單
            });
        },
        getCart() { //獲得購物車表單
            const _this = this;
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/cart`;
            this.$axios.get(url).then((res) => {
                // console.log(res)
                _this.cart = res.data.data;
                // console.log(_this.cart)
                // console.log(_this.cart.carts)
                // console.log(_this.cart.carts[0].product.title)
                // vm.isLoading = false;
                // vm.getCart();
            });
        },
        removeCartItem(id) {
            const _this = this;
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/cart/${id}`;
            // vm.isLoading = true;
            this.$axios.delete(url).then((res) => {
                _this.getCart();
                // vm.isLoading = false;
            });
        },
        addCouponCode() {
            const _this = this;
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/coupon`;
            const coupon = {
                code: _this.coupon_code
            }
            // vm.isLoading = true;
            this.$axios.$post(url, {
                data: coupon
            }).then((res) => {
                // vm.isLoading = false;

                // test
                // console.log(res)
                //找不到優惠卷內容錯誤提示訊息
                // 要到後台建立訂單
            });
        },
        creatOrder() {
            const _this = this;
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/order`;
            const order = _this.form;
            // vm.isLoading = true;
            this.$refs.observer.validate().then((result) => {
                if (result) {
                    this.$axios.$post(url, {
                        data: order
                    }).then((res) => {
                        // console.log(res)
                        if (res.success) {
                            // console.log(res.orderId)
                            _this.$router.push({
                                path: `/admin/_customerCheckOut/${res.orderId}`
                            })
                            // let id = res.orderId
                            // _this.$router.push({
                            //     name: `/admin/customerCheckOut`,
                            //     params: id
                            // })
                        }
                    });
                } else {
                    // console.log('訂單未完成')
                }
            })

        }
    },
    created() {
        this.getProducts();
        this.getCart();
    }
}
</script>
