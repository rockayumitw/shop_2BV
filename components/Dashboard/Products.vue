<template>
<div>
    <!--<loading :active.sync="isLoading"></loading>-->
    <div class="text-right mt-4">
        <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>

    <!--產品列表-->
    <b-table :items="products" :fields="fields" :busy="isBusy" caption-top>
        <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </template>
        <template v-slot:cell(origin_price)='data'>
            <span v-if="!data.item.origin_price">$0</span>
            <span v-else> {{data.item.origin_price | currency}}</span>
        </template>
        <template v-slot:cell(price)='data'>
            <span v-if="!data.item.price">$0</span>
            <span v-else> {{data.item.price | currency}}</span>
        </template>
        <template v-slot:cell(is_enable)='data'>
            <b-button size="sm" v-if="data.item.is_enabled">啟用</b-button>
            <b-button size="sm" v-else>不啟用</b-button>
        </template>
        <template v-slot:cell(is_edit)='data'>
            <b-button size="sm" @click='openModal(false,data.item)'>編輯</b-button>
            <b-button size="sm" @click='delProduct(data.item)'>刪除</b-button>
        </template>
    </b-table>

    <Pagination :pagination="pagination" />
    <!--產品列表-->

    <!--modal-->
    <b-modal ref='productModal2' id="productModal2" centered :title="modalTitle" hide-footer>
        <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                    <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80" class="img-fluid" :src="tempProduct.imageUrl" alt="">
            </div>
            <div class="col-sm-8">
                <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="tempProduct.category">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                        <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price">
                    </div>
                </div>
                <hr>

                <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="1">
                        <label class="form-check-label">
                            是否啟用
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
    </b-modal>

    <b-modal ref='delProductModal' id="productModal2" centered title="刪除產品" hide-footer>
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
                <div class="modal-body">
                    是否刪除
                    <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click='delProduct(item)'>確認刪除</button>
                </div>
            </div>
        </div>
    </b-modal>
</div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import Pagination from '../Dashboard/Pagination'
// import {
//     apiTestData
// } from '~/api/path.js'

export default {
    // middleware: 'auth',
    // meta: {
    //     requiresAuth: true,
    // },
    components: {
        Pagination
    },
    data() {
        return {
            fields: [{
                    key: 'title',
                    label: '產品名稱'
                },
                {
                    key: 'category',
                    label: '產品分類'
                },
                {
                    key: 'origin_price',
                    label: '產品原價'
                },
                {
                    key: 'price',
                    label: '產品價格'
                },
                {
                    key: 'is_enable',
                    label: '是否啟用'
                },
                {
                    key: 'is_edit',
                    label: '編輯'
                },
            ],
            isBusy: true,
            modalTitle: '',
            products: [],
            pagination: {},
            tempProduct: {},
            isNew: false,
            isLoading: false,
            status: {
                fileUploading: false,
            },
        }
    },
    created() {

    },
    mounted() {
        this.getProducts();
        let _this = this
        this.$nuxt.$on('get-product-page', function (page) {
            _this.getProducts(page);
        })
    },
    methods: {
        getProducts(page = 1) {
            console.log(page)
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/products?page=${page}` // 管理者取得資料
            const _this = this
            this.$axios.get(url).then((res) => {
                console.log(res)
                _this.isLoading = false;
                if (res.data.products.origin_price) {
                    console.log(res.data.products)
                }
                _this.products = res.data.products;
                _this.isBusy = false
                _this.pagination = res.data.pagination;
            })
        },
        openModal(isNew, item) {
            console.log(item)
            if (isNew) {
                this.tempProduct = {};
                this.isNew = true;
                this.modalTitle = '新增產品'
            } else {
                this.tempProduct = Object.assign({}, item);
                console.log(this.tempProduct)
                this.isNew = false;
                this.modalTitle = '編輯產品'
            }
            this.$refs['productModal2'].show()
        },
        updateProduct() { //更新產品
            // let url = `${process.env.APIPATH}/api/${process.env.CUSTOMER_PATH}/admin/product`;
            let url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/product`;
            const _this = this;
            let httpMethod = 'post';

            if (!_this.isNew) { //不是新的產品
                // url = `${process.env.APIPATH}/api/${process.env.CUSTOMER_PATH}/admin/product/${vm.tempProduct.id}`;
                url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/product/${_this.tempProduct.id}`;
                httpMethod = 'put';
            }
            this.$axios[httpMethod](url, {
                data: _this.tempProduct
            }).then((res) => {
                if (res.data.success) {
                    console.log(res.data.success)
                    this.$refs['productModal2'].hide()
                    _this.getProducts();
                } else {
                    this.$refs['productModal2'].hide()
                    console.log('新增失敗')
                }
            })
        },
        delProduct(item) {
            console.log(item)
            console.log('刪除產品')
            let _this = this
            let product_id = item.id
            this.$bvModal.msgBoxConfirm('你確定要刪除此產品', {
                    title: '刪除產品',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    this.boxTwo = value
                    const url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/product/${product_id}`
                    this.$axios.delete(url, {
                        product_id
                    }).then((res) => {
                        console.log(res.data)
                        this.isBusy = true
                        _this.getProducts();
                    })
                })
                .catch(err => {
                    // An error occurred
                })

        },
        uploadFile() {
            const uploadedFile = this.$refs.files.files[0];
            const _this = this;
            const formData = new FormData();
            formData.append('file-to-upload', uploadedFile);
            // const url = `${process.env.APIPATH}/api/${process.env.CUSTOMER_PATH}/admin/upload`;
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/upload`;
            //'file-to-upload':欄位 , uploadedFile:將值上傳
            _this.status.fileUploading = true;
            this.$axios.post(url, formData, { //上傳路徑,上傳formDATA本身,將格式改成formdata格式
                headers: {
                    'Content-Type': 'multipart/form-data' //將格式改成formdata格式
                }
            }).then((res) => {
                _this.status.fileUploading = false;
                if (res.data.success) {
                    // vm.tempProduct.imageUrl=res.data.imageUrl;
                    _this.$set(_this.tempProduct, 'imageUrl', res.data.imageUrl); //強制將圖片路徑寫入,具有雙向綁定
                } else {
                    _this.$nuxt.$emit('message:push', res.data.message, 'danger');
                    console.log('test')
                }
            })
        }
    },
    created() {
        // this.getProducts();
    }
}
</script>
