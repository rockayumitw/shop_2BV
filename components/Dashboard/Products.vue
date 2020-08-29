<template>
<div>
    <!--<loading :active.sync="isLoading"></loading>-->
    <div class="text-right mt-4">
        <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>

    <b-button v-b-modal.modal-center>Launch centered modal</b-button>

    <b-modal id="modal-center" centered title="BootstrapVue">
        <p class="my-4">Vertically centered modal!</p>
    </b-modal>

    <!--產品列表-->
    <b-table :items="products" :fields="fields" caption-top>
        <template v-slot:table-caption>This is a table caption at the top.</template>
        <template v-slot:cell(origin_price)='data'>
            <span v-if="!data.origin_price">$0</span>
            <span v-else> {{data.origin_price | currency}}</span>
        </template>
        <template v-slot:cell(price)='data'>
            <span v-if="!data.price">$0</span>
            <span v-else> {{data.price | currency}}</span>
        </template>
        <template v-slot:cell(is_enable)='data'>
            <b-button size="sm">啟用</b-button>
            <b-button size="sm">不啟用</b-button>
        </template>
        <template v-slot:cell(is_edit)='data'>
            <b-button size="sm">編輯</b-button>
        </template>
    </b-table>

    <!--page-->
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{'disabled':!pagination.has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>

            <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page === page}">
                <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
            </li>

            <li class="page-item" :class="{'disabled':!pagination.has_next}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
    <!---->
    <br /><br />

    <span> -------- </span>
    <table>
        <tr>
            <td>產品名稱</td>
            <td>產品分類</td>
            <td>產品原價</td>
            <td>產品價格</td>
            <td>是否啟用</td>
            <td>編輯</td>
        </tr>

        <tr v-for="item in products" :key='item.id'>
            <td>{{item.title}}</td>
            <td>{{item.category}}</td>
            <td>
                <span v-if="!item.origin_price">$0</span>
                <span v-else> {{item.origin_price | currency}}</span>
            </td>
            <td>
                <span v-if="!item.price">$0</span>
                <span v-else> {{item.price | currency}}</span>
            </td>
            <td>
                <span v-if="item.is_enabled">啟用</span>
                <span v-else>不啟用</span>
            </td>
            <td class="btn bnt-outline-primary btn-sm" @click="openModal(false,item)">編輯</td>
        </tr>
    </table>

    <!--產品列表-->

    <!--modal-->

    <b-modal id="productModal2" centered title="新增產品">
        <p class="my-4">Vertically centered modal!</p>
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

    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <span>新增產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <span>刪除產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除
                    <!-- <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。 -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger">確認刪除</button>
                </div>
            </div>
        </div>
    </div>
    <!--modal-->
</div>
</template>

<script>
import $ from 'jquery'
import {
    apiTestData
} from '~/api/path.js'

export default {
    // middleware: 'auth',
    // meta: {
    //     requiresAuth: true,
    // },
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
    mounted() {
        this.test()
        // this.getProducts();
    },
    methods: {
        test(page = 1) {
            console.log(apiTestData)
            var data = {
                page: 1
            }
            console.log()
            apiTestData(data)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getProducts(page = 1) {
            // const url = `${process.env.APIPATH}/api/${process.env.CUSTOMER_PATH}/admin/products?page=${page}`;
            // const vm = this;
            // const url = `https://vue-course-api.hexschool.io/api/rockayumitw/products?page=${page}`
            const url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/products?page=${page}` // 管理者取得資料
            // const url = `https://vue-course-api.hexschool.io/api/rockayumitw/admin/product?page=${page}`
            const _this = this
            // _this.isLoading = true
            this.$axios.defaults.withCredentials = true
            this.$axios.$post(url).then((res) => {
                _this.isLoading = false;
                console.log(res)
                if (res.products.origin_price) {
                    console.log(res.data)
                }
                _this.products = res.products;
                console.log(_this.products)
                _this.pagination = res.pagination;
            })
        },
        openModal(isNew, item) {
            console.log('openmodal')
            if (isNew) {
                this.tempProduct = {};
                this.isNew = true;
            } else {
                this.tempProduct = Object.assign({}, item);
                this.isNew = false;
            }
            this.$bvModal.show('#productModal2')
            // $('#productModal').modal('show')
        },
        updateProduct() { //更新產品
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMER_PATH}/admin/product`;
            const vm = this;
            let httpMethod = 'post';
            //不是新的產品
            if (!vm.isNew) {
                url = `${process.env.APIPATH}/api/${process.env.CUSTOMER_PATH}/admin/product/${vm.tempProduct.id}`;
                httpMethod = 'put';
            }
            this.$http[httpMethod](url, {
                data: vm.tempProduct
            }).then((res) => {
                if (res.data.success) {
                    $('#productModal').modal('hide')
                    vm.getProducts();
                } else {
                    $('#productModal').modal('hide')
                    console.log('新增失敗')
                }
            })
        },
        uploadFile() {
            const uploadedFile = this.$refs.files.files[0];
            const vm = this;
            const formData = new FormData();
            formData.append('file-to-upload', uploadedFile);
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMER_PATH}/admin/upload`;
            //'file-to-upload':欄位 , uploadedFile:將值上傳
            vm.status.fileUploading = true;
            this.$http.post(url, formData, { //上傳路徑,上傳formDATA本身,將格式改成formdata格式
                headers: {
                    'Content-Type': 'multipart/form-data' //將格式改成formdata格式
                }
            }).then((res) => {
                vm.status.fileUploading = false;
                if (res.data.success) {
                    // vm.tempProduct.imageUrl=res.data.imageUrl;
                    vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl); //強制將圖片路徑寫入,具有雙向綁定
                } else {
                    this.$bus.$emit('message:push', res.data.message, 'danger');
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
