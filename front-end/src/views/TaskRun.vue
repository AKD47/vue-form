<template lang="html">
    <div class="container-scroller">
        <app-header/>
        <div class="container-fluid page-body-wrapper">
            <app-sidebar/>
            <div class="main-panel">
                <div class="content-wrapper">
                    <section v-if="!isProducts" class="dashboard" id="taskRun">

                        <div style="margin-bottom: 10px">
                            <el-row>
                                <el-col :span="10">
                                    <el-select v-model="filters[1].value"
                                               placeholder="Select ID">
                                        <el-option label="www.revolve.com" value="www.revolve.com"></el-option>
                                        <el-option label="www.amazon.com" value="www.amazon.com"></el-option>
                                        <el-option label="www.ebay.com" value="www.ebay.com"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </div>
                        <data-tables-server
                                :data="tableData"
                                :filters="filters"
                                v-loading="loading"
                                @query-change="reloadTasksData">
                            <el-table-column
                                    prop="taskRunId"
                                    label="ID"
                                    custom
                                    width="300">
                                <template slot-scope="props">
                                    <a href="#" @click="showProducts(props.row.taskRunId)">{{ props.row.taskRunId }}</a>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="startedAt"
                                    label="Started"
                                    width="300"
                                    sortable>
                            </el-table-column>
                            <el-table-column
                                    prop="endedAt"
                                    label="Ended"
                                    width="300"
                                    sortable>
                            </el-table-column>
                            <!--<el-table-column-->
                                    <!--prop="status"-->
                                    <!--label="Status"-->
                                    <!--sortable>-->
                                <!--<template slot-scope="props">-->
                                    <!--<span class="alert-danger text-uppercase" v-if="props.row.status !=='succes'">{{props.row.status}}</span>-->
                                    <!--<span class="alert-success text-uppercase" v-else>{{props.row.status}}</span>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    prop="count"
                                    label="Items"                                    >
                                <template slot-scope="props">
                                    <span>{{props.row.count}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="website"
                                    label="Website">
                            </el-table-column>
                        </data-tables-server>
                    </section>
                    <div v-else>
                        <div style="margin-bottom: 10px">
                            <a href="#" v-on:click="isProducts = !isProducts">Back to Tasks Runs</a>
                        </div>
                        <app-products v-bind:task-run-id="currentTaskRunId"></app-products>
                    </div>
                </div>
                <app-footer/>
            </div>
        </div>
    </div>
</template>

<script>
    import AppHeader from '../components/AppHeader'
    import AppSidebar from '../components/AppSidebar'
    import AppFooter from '../components/AppFooter'
    import AppProducts from '../components/AppProducts'

    export default {
        name: "task-run",
        components: {
            AppHeader,
            AppSidebar,
            AppFooter,
            AppProducts
        },
        data() {
            return {
                isProducts: false,
                currentTaskRunId: '',
                user: '',
                role: '',
                tableData: [],
                filters: [
                    {
                        value: '',
                        search_prop: 'name'
                    },
                    {
                        value: []
                    }
                ],
                total: 0,
                loading: true
            }
        },
        mounted() {
            if (localStorage.username) {
                this.user = localStorage.username;
            }
            if (localStorage.role) {
                this.role = localStorage.role;
            }
            this.loadTasksData();
        },
        methods: {
            loadTasksData: function () {
                let datarequest = new XMLHttpRequest();
                datarequest.onreadystatechange = function(v) {
                    if (datarequest.readyState == 4) {
                        let dt = datarequest.response.data;
                        let options = { day: 'numeric', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                        dt.forEach((item) => {
                            item.startedAt = new Date(item.startedAt).toLocaleDateString("en-US", options);
                            item.endedAt = new Date(item.endedAt).toLocaleDateString("en-US", options);
                        });
                        v.tableData = dt;
                        // console.log(dt)
                    }
                }.bind(datarequest, this);//
                datarequest.open('GET', `${Host}/task-runs?limit=10&page=1`);
                datarequest.responseType = 'json';
                datarequest.setRequestHeader('Content-Type', 'application/json');
                datarequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                datarequest.send();
            },
            reloadTasksData(queryInfo) {
                let refreshQuery = '';
                refreshQuery = refreshQuery + `limit=${queryInfo.pageSize}&page=${queryInfo.page}`;
                if (queryInfo.sort.prop !== null && typeof queryInfo.sort.prop !== 'undefined'){
                    refreshQuery = refreshQuery + `&orderBy=${queryInfo.sort.prop}&order=${queryInfo.sort.order === 'ascending' ? 'asc' : 'desc'}`;
                }
                if (queryInfo.filters[1].value !== '') {
                    refreshQuery = refreshQuery + `&website=${queryInfo.filters[1].value}`;
                }
                let refreshRequest = new XMLHttpRequest();
                refreshRequest.onreadystatechange =function (v) {
                    if (refreshRequest.readyState === 4) {
                        switch (refreshRequest.status) {
                            case (403):
                                localStorage.removeItem('token');
                                localStorage.removeItem('username');
                                localStorage.removeItem('apiKey');
                                localStorage.removeItem('role');
                                v.$router.push({ path: '/login' });
                                break;
                            case (400):
                                localStorage.removeItem('token');
                                localStorage.removeItem('username');
                                localStorage.removeItem('apiKey');
                                localStorage.removeItem('role');
                                v.$router.push({ path: '/login' });
                                break;
                            case (200):
                                v.loading = false;
                                let dt = refreshRequest.response.data;
                                let options = { weekday: 'long', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                                dt.forEach((item) => {
                                    item.startedAt = new Date(item.startedAt).toLocaleDateString("en-US", options);
                                    item.endedAt = new Date(item.endedAt).toLocaleDateString("en-US", options);
                                });
                                v.tableData = dt;
                                v.total = queryInfo.pageSize * refreshRequest.response.pageCount;
                                break;
                            default:
                                localStorage.removeItem('token');
                                localStorage.removeItem('username');
                                localStorage.removeItem('apiKey');
                                localStorage.removeItem('role');
                                v.$router.push({ path: '/login' });
                        }
                    }
                }.bind(refreshRequest, this);
                refreshRequest.responseType = 'json';
                refreshRequest.open('GET', `${Host}/task-runs?${refreshQuery}`);
                refreshRequest.setRequestHeader('Content-Type', 'application/json');
                refreshRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                refreshRequest.send();
                this.loading = true;
            },
            showProducts: function (id) {
                this.currentTaskRunId = id;
                this.isProducts = !this.isProducts;
                // console.log(this.currentTaskRunId);
            }
        }
    }
</script>

<style scoped>

</style>