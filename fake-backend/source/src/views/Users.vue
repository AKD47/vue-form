<template>
    <div class="container-scroller">
        <app-header/>
        <div class="container-fluid page-body-wrapper">
            <app-sidebar/>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin">
                            <div class="card">
                                <div class="card-body d-flex justify-content-center">
                                    <b-btn v-b-modal.modalmd variant="primary">
                                        Create user
                                    </b-btn>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 grid-margin">
                            <div class="card">
                                <div class="card-body">
                                    <vue-data-table>
                                        <v-client-table
                                                :data="tableData"
                                                :columns="columns"
                                                :options="options" >
                                            <a slot="Status" slot-scope="props" >
                                                <label class='badge badge-success'>Enabled</label>
                                            </a>
                                            <a slot="Actions" slot-scope="props" >
                                                <button type='button' class='btn btn-success mr-2'>Edit</button>
                                                <button type='button' class='btn btn-primary mr-2'>Disabled</button>
                                                <button type='button' class='btn btn-danger'>Delete</button>
                                            </a>
                                        </v-client-table>

                                    </vue-data-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal id="modalmd" size="md">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form action="#">
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Username</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Role</label>

                                    <select class="form-control">
                                        <option>Admin</option>
                                        <option>User</option>
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary">Confirm</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import AppHeader from '../../src/components/partials/AppHeader'
    import AppSidebar from '../../src/components/partials/AppSidebar'
    import AppFooter from '../../src/components/partials/AppFooter'
    export default {
        name: 'users',
        components: {
            AppHeader,
            AppSidebar,
            AppFooter
        },
        data() {
            return {
                columns: ['Username', 'Role','Status','Actions'],
                tableData: [],
                options: {
                    headings: {
                        url: 'URL',
                        name: 'Name'
                    },
                    sortable: ['Username', 'Role'],
                    filterable: ['Username', 'Role']
                }
            }
        },
        mounted() {
            this.axios.get('http://www.json-generator.com/api/json/get/cppjqCmGoO?indent=2').then(res => {
                this.tableData = res.data
            })
        }
    }
</script>