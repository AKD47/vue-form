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
                                    <a @click="getAll" type="submit" class="btn btn-primary">users</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal class="modal__registration" id="modalmd" size="md"
                ref="modal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form @submit.prevent="addUser">
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Username</label>
                                    <input type="text" v-model="username" required class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" v-model="password" required class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Role</label>

                                    <select class="form-control" v-model="role">
                                        <option value="ADMIN">Admin</option>
                                        <option value="USER">User</option>
                                    </select>
                                </div>
                                <div class="modal-footer modal__footer">
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
    import AppHeader from '../components/AppHeader'
    import AppSidebar from '../components/AppSidebar'
    import AppFooter from '../components/AppFooter'

    export default {
        name: "users",
        data() {
          return {

            }
        },
        components: {
            AppHeader,
            AppSidebar,
            AppFooter
        },
        methods: {
            getAll: function (users) {
                let myRequest = new XMLHttpRequest();
                myRequest.onreadystatechange = function() {
                    try {
                        if ( myRequest.readyState == 4 ) {
                            console.log(myRequest.response);
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                };
                myRequest.responseType = 'json';
                myRequest.open('get', `${Host}/user`);
                myRequest.setRequestHeader('Content-Type', 'application/json');
                myRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                myRequest.send(JSON.stringify(users));
            },
            addUser: function () {
                let newUser = {
                    username: this.username,
                    password: this.password,
                    role: this.role
                }
                let myRequest = new XMLHttpRequest();
                myRequest.onreadystatechange = function(v) {
                    try {
                        if (myRequest.readyState == 4) {
                            v.$nextTick(() => {
                                v.$refs.modal.hide();
                                v.$router.push({path: '/users'});
                            });
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                }.bind(myRequest, this);
                myRequest.responseType = 'json';
                myRequest.open('PUT', `${Host}/user`);
                myRequest.setRequestHeader('Content-Type', 'application/json');
                myRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                myRequest.send(JSON.stringify(newUser));
            },
        }
    }
</script>

<style scoped>

</style>