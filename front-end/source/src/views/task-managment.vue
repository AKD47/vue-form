<template>
    <div>
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
                                            Create task
                                        </b-btn>
                                    </div>

                                </div>
                            </div>
                            <b-modal id="modalmd" size="md">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <form action="#">
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <label>Task name</label>
                                                    <input type="text" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label>Website</label>

                                                    <select class="form-control">
                                                        <option>Select1</option>
                                                        <option>Select2</option>
                                                        <option>Select3</option>
                                                        <option>Select4</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>How often the task should run?</label>
                                                    <select class="form-control">
                                                        <option>Select1</option>
                                                        <option>Select2</option>
                                                        <option>Select3</option>
                                                        <option>Select4</option>
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

                        <div class="row">
                            <div class="col-lg-12 grid-margin">
                                <div class="card">
                                    <div class="card-body">
                                        <vue-data-table>
                                            <v-client-table
                                                    :data="tableData"
                                                    :columns="columns"
                                                    :options="options" >
                                                <a slot="Actions" slot-scope="props" >
                                                    <button type='button' class='btn btn-success mr-2'>Enabled</button>
                                                    <button type='button' class='btn btn-danger'>Disabled</button>
                                                </a>
                                            </v-client-table>

                                        </vue-data-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script lang="js">
    import AppHeader from '../../src/components/partials/AppHeader'
    import AppSidebar from '../../src/components/partials/AppSidebar'
    import AppFooter from '../../src/components/partials/AppFooter'

    export default {
        name: 'taskManagment',
        components: {
            AppHeader,
            AppSidebar,
            AppFooter
        },
        data() {
            return {
                columns: ['ID', 'TaskName','Schedule','Website', 'Actions'],
                tableData: [],
                options: {
                    headings: {
                        url: 'URL',
                        name: 'Name'
                    },
                    sortable: ['ID', 'TaskName','Schedule','Website'],
                    filterable: ['ID', 'TaskName','Schedule','Website']
                }
            }
        },
      mounted() {
        this.axios.get('http://www.json-generator.com/api/json/get/bOHbvMaBRu?indent=2').then(res => {
          this.tableData = res.data;
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        })
      },

    }
</script>
