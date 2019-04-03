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
                                    <button class="btn btn-primary" @click="openUserModal">
                                        Create user
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 grid-margin">
                            <div class="card">
                                <div class="card-body">
                                    <el-table id="table"
                                              :data="tableData"
                                              v-loading="loading"
                                              width="100%">
                                        <el-table-column
                                                prop="username"
                                                label="Username"
                                                custom
                                                width="280">
                                        </el-table-column>
                                        <el-table-column
                                                prop="role"
                                                label="Role"
                                                sortable>
                                        </el-table-column>
                                        <el-table-column
                                                prop="status"
                                                label="Status"
                                                sortable>
                                        </el-table-column>
                                        <el-table-column
                                                prop="actions"
                                                label="Actions"
                                                width="320">
                                            <template slot-scope="props">
                                                <button v-if="props.row.username !== 'superadmin'" class="btn btn-success" @click="showEditModal(props.row.username)">
                                                    Edit
                                                </button>
                                                <button  type='button' value="DISABLE"
                                                        class='btn btn-primary mr-2 ml-2 change-btn statusBtn' id="statusBtn"
                                                        @click="changeStatus(props.row.username, $event)"
                                                        v-if="props.row.status == 'ENABLED' && props.row.username !== 'superadmin'">Disable
                                                </button>
                                                <button type='button' value="ENABLE"
                                                        class='btn btn-primary mr-2 ml-2 change-btn statusBtn' id="statusBtn"
                                                        @click="changeStatus(props.row.username, $event)"
                                                        v-if="props.row.status == 'DISABLED' && props.row.username !== 'superadmin'">Enable
                                                </button>
                                                <button v-if="props.row.username !== 'superadmin'" type='button' class='btn btn-danger'
                                                        @click="deleteUser(props.row.username)">Delete
                                                </button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="userModal" class="product-modal" ref="modalUser">
                <div class="product-modal__content">
                    <span class="close product-modal__close" id="closeUser">x</span>
                    <div class="modal-body product-modal__body">
                        <form action="#" @submit.prevent="addUser" id="userForm">
                                <div class="form-group">
                                    <label>Username</label>
                                    <input type="text" id="createUsername" v-model="username" required class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" id="createPassword" v-model="password" required class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Role</label>

                                    <select class="form-control" id="createRole" v-model="role">
                                        <option value="ADMIN">Admin</option>
                                        <option value="USER">User</option>
                                    </select>
                                </div>
                                <div class="modal-footer modal__footer">
                                    <button type="submit" class="btn btn-primary">Confirm</button>
                                </div>
                        </form>
                    </div>
                </div>
         </div>
            <div id="productModal" class="product-modal" ref="modal">
                <div class="product-modal__content">
                    <span class="close product-modal__close" id="closeEditModal">x</span>
                    <div class="modal-body product-modal__body">
                        <div id="result" class="form-group"></div>
                        <!--<div class="form-group">-->
                            <!--<div class="form-group">-->
                                <!--<label>Username</label>-->
                                <!--<input type="text" id="editUsername" required class="form-control">-->
                            <!--</div>-->
                            <!--<div class="form-group">-->
                                <!--<label>Role</label>-->
                                <!--<select id="editUserRole" class="form-control" >-->
                                    <!--<option value="ADMIN">Admin</option>-->
                                    <!--<option value="USER">User</option>-->
                                <!--</select>-->
                            <!--</div>-->
                        <!--</div>-->
                        <div class="modal-footer product-modal__footer">
                            <button type="submit" class="btn btn-primary" id="submitUserUpdate">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

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
              columns: [
                  'username',
                  'role',
                  'status',
                  'actions'
              ],
              tableData: [],
              loading: true
          }
        },
        components: {
            AppHeader,
            AppSidebar,
            AppFooter
        },
        mounted() {
            this.loadUsers();
            // this.flipButton();
        },
        methods: {
            loadUsers(){
                let datarequest = new XMLHttpRequest();
                datarequest.onreadystatechange = function(v, changedUserIndex) {
                    if (datarequest.readyState == 4) {
                        switch (datarequest.status) {
                            case(403):
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
                                v.tableData = datarequest.response;
                                break;
                            default:
                                localStorage.removeItem('token');
                                localStorage.removeItem('username');
                                localStorage.removeItem('apiKey');
                                localStorage.removeItem('role');
                                v.$router.push({ path: '/login' });
                        }
                    }
                }.bind(datarequest, this);
                datarequest.open('GET', `${Host}/user`);
                datarequest.responseType = 'json';
                datarequest.setRequestHeader('Content-Type', 'application/json');
                datarequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                datarequest.send();
                this.loading = true;
            },
            openUserModal: function () {
              let modal = document.getElementById('userModal');
              let close = document.getElementById('closeUser');

              document.querySelectorAll('#createUsername, #createPassword, #createRole').forEach(el=>el.value = '');

              modal.classList.remove('modal__close');
              modal.setAttribute('style', 'z-index:9999; opacity: 1;');
              close.onclick = function () {
                  modal.setAttribute('style', 'z-index:-1; opacity: 0;');
              };
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.setAttribute("style", "z-index:-1; opacity: 0;");
                    }
                };
            },
            addUser: function () {
                let newUser = {
                    username: this.username,
                    password: this.password,
                    role: this.role,
                    status: 'ENABLED'
                };
                let myRequest = new XMLHttpRequest();
                myRequest.onreadystatechange = function(v) {
                    try {
                        if (myRequest.readyState == 4) {
                            switch (myRequest.status) {
                                case(403):
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
                                    v.$nextTick(() => {
                                        v.$refs.modalUser.classList.add('modal__close');
                                        v.tableData.push(newUser);
                                        v.$router.push({path: '/users'});
                                    });
                                    break;
                                default:
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('username');
                                    localStorage.removeItem('apiKey');
                                    localStorage.removeItem('role');
                                    v.$router.push({ path: '/login' });
                            }
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
            deleteUser: function (user) {
                let deleteUser = this.tableData.find((item) => item.username === user);
                let deleteUserIndex = this.tableData.findIndex((item) => item.username === user);
                let deleteRequest = new XMLHttpRequest();
                deleteRequest.onreadystatechange = function (v) {
                    if (deleteRequest.readyState == 4) {
                        switch (deleteRequest.status) {
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
                                let reloadRequest = new XMLHttpRequest();
                                reloadRequest.onreadystatechange = function () {
                                    if (reloadRequest.readyState == 4) {
                                        v.tableData = reloadRequest.response;
                                    }
                                };
                                reloadRequest.responseType = 'json';
                                reloadRequest.open('GET', `${Host}/user`);
                                reloadRequest.setRequestHeader('Content-Type', 'application/json');
                                reloadRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                                reloadRequest.send();
                                break;
                            default:
                                localStorage.removeItem('token');
                                localStorage.removeItem('username');
                                localStorage.removeItem('apiKey');
                                localStorage.removeItem('role');
                                v.$router.push({ path: '/login' });
                        }
                    }
                }.bind(deleteRequest, this);
                deleteRequest.responseType = 'json';
                deleteRequest.open('DELETE', `${Host}/user`);
                deleteRequest.setRequestHeader('Content-Type', 'application/json');
                deleteRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                deleteRequest.send(JSON.stringify({username: deleteUser.username}));
            },
            changeStatus: function (targetUsername, ev) {
                let changedUser = this.tableData.find((item) => item.username === targetUsername);
                let changedUserIndex = this.tableData.findIndex((item) => item.username === targetUsername);

                let val = ev.srcElement.getAttribute("value");
                let info = {};
                info["action"] = 'updateUser';
                info['targetUsername'] = changedUser.username;
                if ("ENABLE" === val) {
                    ev.srcElement.setAttribute("value", "DISABLE");
                    info['newStatus'] = 'ENABLED';
                    let statusRequest = new XMLHttpRequest();
                    statusRequest.onreadystatechange = function (v) {
                        if (statusRequest.readyState == 4) {
                            switch (statusRequest.status) {
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
                                    v.tableData[changedUserIndex].status = 'ENABLED';
                                    break;
                                default:
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('username');
                                    localStorage.removeItem('apiKey');
                                    localStorage.removeItem('role');
                                    v.$router.push({ path: '/login' });
                            }
                        }
                    }.bind(statusRequest, this);
                    statusRequest.open('PATCH', `${Host}/user`);
                    statusRequest.responseType = 'json';
                    statusRequest.setRequestHeader('Content-Type', 'application/json');
                    statusRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                    statusRequest.send(JSON.stringify(info))
                }
                if ("DISABLE" === val) {
                    ev.srcElement.setAttribute("value", "ENABLE");
                    info['newStatus'] = 'DISABLED';
                    let statusRequest = new XMLHttpRequest();
                    statusRequest.onreadystatechange = function (v) {
                        if (statusRequest.readyState == 4) {
                            switch (statusRequest.status) {
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
                                    v.tableData[changedUserIndex].status = 'DISABLED';
                                    break;
                                default:
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('username');
                                    localStorage.removeItem('apiKey');
                                    localStorage.removeItem('role');
                                    v.$router.push({ path: '/login' });
                            }
                        }
                    }.bind(statusRequest, this);
                    statusRequest.open('PATCH', `${Host}/user`);
                    statusRequest.responseType = 'json';
                    statusRequest.setRequestHeader('Content-Type', 'application/json');
                    statusRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                    statusRequest.send(JSON.stringify(info))
                }
            },
            // flipButton(changedUserIndex) {
            //         let flipBtn = document.getElementById('statusBtn');
            //         if (this.tableData[changedUserIndex].status === 'ENABLED') {
            //             flipBtn.text = 'DISABLE';
            //         }
            //         if (this.tableData[changedUserIndex].status === 'DISABLED') {
            //             flipBtn.text = 'ENABLE';
            //         }
            // },
            showEditModal: function (edit) {
                let editUser = this.tableData.find((item) => item.username === edit);
                let targetUserIndex = this.tableData.findIndex((item) => item.username === edit);
                let modal = document.getElementById('productModal');
                let close = document.getElementById("closeEditModal");
                // let inputUsername = document.getElementById('editUsername');
                // let userRole = document.getElementById('editUserRole');
                let submit = document.getElementById('submitUserUpdate');
                let result = document.getElementById('result');
                // inputUsername.setAttribute('value', editUser.username);
                // userRole.setAttribute('value', editUser.role);
                // console.log(editUser.role);

                if ( editUser.role != 'ADMIN' ) {
                    result.innerHTML = `<div class="form-group">
                                        <label>Username</label>
                                        <input type="text" value="${editUser.username}" id="editUsername" required class="form-control">
                                    </div>
                                    <div class="form-group"><label>Role</label>
                                        <select id="editUserRole" value="${editUser.role}" class="form-control" >
                                            <option value="ADMIN">Admin</option>
                                            <option selected value="USER">User</option>
                                        </select>
                                    </div>`;
                } else {
                    result.innerHTML = `<div class="form-group">
                                        <label>Username</label>
                                        <input type="text" value="${editUser.username}" id="editUsername" required class="form-control">
                                    </div>
                                    <div class="form-group"><label>Role</label>
                                        <select id="editUserRole" value="${editUser.role}" class="form-control" >
                                            <option selected value="ADMIN">Admin</option>
                                            <option value="USER">User</option>
                                        </select>
                                    </div>`;
                }

                modal.classList.remove('modal__close');
                modal.setAttribute("style", "z-index:9999; opacity: 1;");
                close.onclick = function() {
                    modal.setAttribute("style", "z-index:-1; opacity: 0;");
                    result.innerHTML = " ";
                };
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.setAttribute("style", "z-index:-1; opacity: 0;");
                        result.innerHTML = " ";
                    }
                };
                submit.onclick = function(v, event) {
                    modal.setAttribute("style", "z-index:-1; opacity: 0;");
                    v.changeUser(targetUserIndex);
                    result.innerHTML = " ";
                }.bind(submit, this)
            },
            changeUser: function (targetUserIndex) {
                let paramsUser = {
                    username: document.getElementById('editUsername').value,
                    role:  document.getElementById('editUserRole').value
                };
                let editInfo = {};
                editInfo["action"] = 'updateUser';
                editInfo['targetUsername'] = this.tableData[targetUserIndex].username;
                editInfo['newUsername'] = paramsUser.username;
                editInfo['newRole'] = paramsUser.role;
                let editRequest = new XMLHttpRequest();
                editRequest.onreadystatechange = function(v) {
                    try {
                        if (editRequest.readyState == 4) {
                            switch (editRequest.status) {
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
                                    v.tableData[targetUserIndex].username = paramsUser.username;
                                    v.tableData[targetUserIndex].role = paramsUser.role;
                                    v.$nextTick(() => {
                                        v.$refs.modal.classList.add('modal__close');
                                        v.$router.push({path: '/users'});
                                    });
                                    break;
                                default:
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('username');
                                    localStorage.removeItem('apiKey');
                                    localStorage.removeItem('role');
                                    v.$router.push({ path: '/login' });
                            }
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                }.bind(editRequest, this);
                editRequest.responseType = 'json';
                editRequest.open('PATCH', `${Host}/user`);
                editRequest.setRequestHeader('Content-Type', 'application/json');
                editRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                editRequest.send(JSON.stringify(editInfo));
            }
        }
    }
</script>

<style scoped lang="scss">
    .modal__close{
        display: none;
    }
</style>