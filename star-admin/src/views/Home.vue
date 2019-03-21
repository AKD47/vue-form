<template lang="html">
  <div class="container-scroller">
    <app-header/>
    <div class="container-fluid page-body-wrapper">
      <app-sidebar/>
      <div class="main-panel">
        <div class="content-wrapper">
          <section class="dashboard">
              <div style="margin-bottom: 10px">
                  <el-row>
                      <el-col :span="6">
                          <el-input placeholder="search" v-model="filters[0].value"></el-input>
                      </el-col>
                  </el-row>
              </div>
              <data-tables-server
                      :data="tableData"
                      :filters="filters"
                      :total="total"
                      @query-change="loadData"
                      :pagination-props="{ pageSizes: [5, 10, 15, 20] }">
                  <el-table-column
                          prop="productId"
                          label="ID"
                          custom
                          width="280">
                      <template slot-scope="props">
                          <a href="#" @click="showProductModal(props.row.productId)">{{ props.row.productId }}</a>
                      </template>

                  </el-table-column>
                  <el-table-column
                          prop="name"
                          label="Name"
                          sortable>
                  </el-table-column>
                  <el-table-column
                          prop="category"
                          label="Category"
                          sortable>
                  </el-table-column>
                  <el-table-column
                          prop="manufacturer"
                          label="Manufacturer"
                          sortable>
                  </el-table-column>
                  <el-table-column
                          prop="cost"
                          label="Cost"
                          sortable>
                  </el-table-column>
              </data-tables-server>
              <div id="productModal" class="product-modal">
                    <div class="product-modal__content">
                        <span class="close product-modal__close">x</span>
                        <div class="modal-body product-modal__body">
                            <div class="form-group">
                               <div class="product-modal__list" id="result"></div>
                            </div>
                            <!--<div class="modal-footer product-modal__footer"></div>-->
                        </div>
                    </div>
                </div>
          </section>
        </div>
        <app-footer/>
      </div>
    </div>
  </div>
</template>

<script lang="js">
    import AppHeader from '../components/AppHeader'
    import AppSidebar from '../components/AppSidebar'
    import AppFooter from '../components/AppFooter'

    export default {
        name: 'products',
        components: {
            AppHeader,
            AppSidebar,
            AppFooter
        },
        data() {
            return {
                tableData: [],
                filters: [
                    {
                        value: '',
                        // search_prop: ''
                    }
                ],
                total: 0
            }
        },
        mounted() {//после отрисовки DOM дерева
            this.loadProductsData();
        },
        methods: {
            loadProductsData: function () {
                let datarequest = new XMLHttpRequest();//создаем новый запрос
                datarequest.onreadystatechange = function(v) {//запрос на обработку события с контекстом функции
                    if (datarequest.readyState == 4) {//при загрузке странице до состояния полной загрузки
                        // console.log(datarequest.response);
                        v.tableData = datarequest.response.data;
                        v.total = datarequest.response.pageCount * 10;
                    }
                }.bind(datarequest, this);//
                datarequest.open('GET', `${Host}/products?limit=10&page=1`);
                datarequest.responseType = 'json';
                datarequest.setRequestHeader('Content-Type', 'application/json');
                datarequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                datarequest.send();
            },
            showProductModal: function (id) {
                event.preventDefault();
                let modal = document.getElementById('productModal');
                let span = document.getElementsByClassName("close")[0];
                let product = this.tableData.find((item) => item.productId === id);
                let result = document.getElementById('result');
                // console.log(product);
                let pics = [];
                product.pictures.forEach((pic) => pics.push(`<img src="${pic}">`));
                result.innerHTML = `<div class="product-modal__element"><label>Product Name:</label><span class="product-modal__element--name">${product.name}</span></div>
                                    <div class="product-modal__element"><label>Product Cost:</label><span class="product-modal__element--name">$ ${product.cost}</span></div>
                                    <div class="product-modal__element"><label>Product Category:</label><span class="product-modal__element--cat">${product.category}</span></div>
                                    <div class="product-modal__element"><label>Manufacturer:</label><span class="product-modal__element--cat">${product.manufacturer}</span></div>
                                    <div class="product-modal__element"><label></label><div class="product-modal__images">${pics}</div></div>`;
                modal.setAttribute("style", "z-index:9999; opacity: 1;");
                span.onclick = function() {
                    modal.setAttribute("style", "z-index:-1; opacity: 0;");
                    result.innerHTML = ' ';
                };
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.setAttribute("style", "z-index:-1; opacity: 0;");
                        result.innerHTML = ' ';
                    }
                }
            },
            loadData(queryInfo) {
                if (queryInfo.type === 'filter') {
                    let serchRequest = new XMLHttpRequest();
                    serchRequest.onreadystatechange = function (v) {
                        if (serchRequest.readyState === 4) {
                            console.log(v.filters.value);
                            // console.log(v.filters.value);
                            console.log(serchRequest.response.data);
                            v.tableData = serchRequest.response.data;
                            v.filters.value = queryInfo.filters[0].value;
                            v.total = queryInfo.pageSize * serchRequest.response.pageCount;
                        }
                    }.bind(serchRequest, this);
                    serchRequest.responseType = 'json';
                    serchRequest.open('GET', `${Host}/products?limit=${queryInfo.pageSize}&page=${queryInfo.page}`);
                    serchRequest.setRequestHeader('Content-Type', 'application/json');
                    serchRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                    serchRequest.send();
                }
                if (queryInfo.type === 'page' || queryInfo.type === 'size') {
                    let refreshRequest = new XMLHttpRequest();
                    refreshRequest.onreadystatechange =function (v) {
                        if (refreshRequest.readyState === 4) {
                            // console.log(refreshRequest.response);
                            // console.log(queryInfo);
                            // console.log(typeof queryInfo.pageSize);
                            // console.log(refreshRequest.response.pageCount);
                            v.tableData = refreshRequest.response.data;
                            v.total = queryInfo.pageSize * refreshRequest.response.pageCount;
                        }
                    }.bind(refreshRequest, this);
                    refreshRequest.responseType = 'json';
                    refreshRequest.open('GET', `${Host}/products?limit=${queryInfo.pageSize}&page=${queryInfo.page}`);
                    refreshRequest.setRequestHeader('Content-Type', 'application/json');
                    refreshRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                    refreshRequest.send();
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
