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
                  <vue-data-table>
                    <v-client-table
                      :data="tableData"
                      :columns="columns"
                      :options="options" >
                      <span slot="status" slot-scope="props">
                        <label class='badge badge-success'>Enabled</label>
                      </span>
                      <span slot="actions" slot-scope="props" >
                        <button type='button' class='btn btn-success mr-2'>Edit</button>
                        <button type='button' class='btn btn-primary mr-2'>Disabled</button>
                        <button type='button' class='btn btn-danger'>Delete</button>
                      </span>
                    </v-client-table>

                  </vue-data-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-modal class="modal__registration" id="modalmd" size="md">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <form @submit.prevent="register">
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
        columns: [
          'username',
          'role',
          'status',
          'actions'
        ],
        tableData: [],
        options: {
          headings: {
            username: 'Username',
            role: 'Role',
            status: 'Status'
          },
          sortable: ['username', 'role', 'status'],
          filterable: ['username', 'role', 'status']
        }
      }
    },
    mounted() {
      // this.axios({
      //   type: 'GET',
      //   url: `${Host}/user`,
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   }
      // }).then(res => {
      //   this.tableData = res.data
      // })
    },
    methods: {
      register: function () {
        // console.log("Retrieving username");
        // console.log(this.username);
        // console.log(this.password);
        // console.log(this.role);
        let newUser = { username: this.username, password: this.password, role: this.role };
        this.$store.dispatch('register', newUser)
          .then(() => this.$router.replace({name: 'users-managment'}),
          )
          .catch(err => console.log(err))
      },
      getAll: function ({commit}, users) {
        return new Promise((resolve, reject) => {
          let myRequest = new XMLHttpRequest();
          myRequest.onreadystatechange = function() {
            try {
              if ( myRequest.readyState == 4 ) {
                console.log(myRequest.response);
                // console.log(store.getters.isLoggedIn);
                // commit('auth_request');
                resolve();
              }
            }
            catch (err) {
              reject(console.log(err));
            }
          };
          myRequest.responseType = 'json';
          myRequest.open('get', `${Host}/user`);
          myRequest.setRequestHeader('Content-Type', 'application/json');
          myRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
          myRequest.send(JSON.stringify(users));
        });
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
