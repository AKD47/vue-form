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
                                        <div class="table-responsive">
                                            <table aria-busy="false" aria-colcount="4"
                                                   class="table b-table table-striped table-hover">
                                                <thead >
                                                <tr>
                                                    <th>Task name</th>
                                                    <th>Schedule</th>
                                                    <th>Website</th>
                                                    <th>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody >
                                                <tr v-for="loans in loans">
                                                    <td v-for="loan in loans">{{loan}}</td>
                                                    <td><button class="btn btn-outline-success">Enabled</button> <button class="btn btn-outline-danger">Disabled</button></td>

                                                </tr>
                                              </tbody>
                                            </table>
                                            <div>
                                                <button @click="prevPage">Previous</button>
                                                <button @click="nextPage">Next</button>
                                            </div>
                                        </div>
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
                loans: ''
            }
        },
        created () {
            this.$http.get('http://www.json-generator.com/api/json/get/bPYaUAgbtu?indent=2')
                .then(
                    response => {
                this.loans = response.data

        })
        .catch(function(error){
                console.log(error)
            })
        },
        methods:{
            sort:function(s) {
                //if s == current sort, reverse
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
                }
                this.currentSort = s;
            },
            nextPage:function() {
                if((this.currentPage*this.pageSize) < this.cats.length) this.currentPage++;
            },
            prevPage:function() {
                if(this.currentPage > 1) this.currentPage--;
            }

        }
    }
</script>