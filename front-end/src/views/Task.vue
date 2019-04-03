<template lang="html">
  <div class="container-scroller">
    <app-header/>
    <div class="container-fluid page-body-wrapper">
      <app-sidebar/>
      <div class="main-panel">
        <div class="content-wrapper">
          <section class="dashboard">
            <el-table
                    :data="tableData"
                    v-loading="loading"
                    width="100%">
              <el-table-column
                      prop="website"
                      label="Website"
                      width="280">
              </el-table-column>
              <el-table-column
                      prop="schedule"
                      label="Schedule">
                <template slot-scope="props">
                  <span v-if="props.row.schedule === 'HOUR_2'">Every 2 Hours</span>
                  <span v-if="props.row.schedule === 'HOUR_4'">Every 4 Hours</span>
                  <span v-if="props.row.schedule === 'HOUR_8'">Every 8 Hours</span>
                  <span v-if="props.row.schedule === 'HOUR_12'">Every 12 Hours</span>
                  <span v-if="props.row.schedule === 'DAY_1'">Every 1 Day</span>
                  <span v-if="props.row.schedule === 'WEEK_1'">Every 1 Week</span>
                  <span v-if="props.row.schedule === 'MONTH_1'">Every 1 Month</span>
                </template>
              </el-table-column>
              <el-table-column
                      prop="status"
                      label="Status">
              </el-table-column>
              <el-table-column
                      prop="limit"
                      label="Limit">
              </el-table-column>
              <el-table-column
                      prop="actions"
                      label="Actions"
                      width="200">
                <template slot-scope="props">
                  <button class="btn btn-success" @click="showEditModal(props.row.website)">
                    Edit
                  </button>
                </template>
              </el-table-column>
            </el-table>
            <div id="taskModal" class="product-modal">
              <div class="product-modal__content">
                <span id="taskModalClose" class="close product-modal__close">x</span>
                <div class="modal-body product-modal__body">
                  <div class="form-group">
                    <div class="form-group">
                      <label>Schedule</label>
                      <select id="editTaskSchedule" class="form-control" >
                        <option value="HOUR_2">Every 2 Hours</option>
                        <option value="HOUR_4">Every 4 Hours</option>
                        <option value="HOUR_8">Every 8 Hours</option>
                        <option value="HOUR_12">Every 12 Hours</option>
                        <option value="DAY_1">Every 1 Day</option>
                        <option value="WEEK_1">Every 1 Week</option>
                        <option value="MONTH_1">Every 1 Month</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Status</label>
                      <select id="editTaskStatus" class="form-control" >
                        <option value="ENABLED">ENABLED</option>
                        <option value="DISABLED">DISABLED</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Limit</label>
                      <input type="number" id="editTaskLimit" class="form-control" min="0" step="1">
                      <div id="AlertMessage" class="alert-danger"></div>
                    </div>
                  </div>
                  <div class="modal-footer product-modal__footer">
                    <button type="submit" class="btn btn-primary" id="submitEditTask">Confirm</button>
                  </div>
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
  import AppHeader from '../components/AppHeader';
  import AppSidebar from '../components/AppSidebar'
  import AppFooter from '../components/AppFooter'

  export default {
      name: 'task',
      components: {
          AppHeader,
          AppSidebar,
          AppFooter
      },
      data() {
          return {
            tableData: [],
            loading: true
          }
      },
      mounted() {
          this.loadTaskData();
      },
      methods: {
          loadTaskData: function () {
              let datarequest = new XMLHttpRequest();
              datarequest.onreadystatechange = function(v) {
                  if (datarequest.readyState == 4) {
                      v.loading = false;
                      v.tableData = datarequest.response;
                  }
              }.bind(datarequest, this);
              datarequest.open('GET', `${Host}/tasks`);
              datarequest.responseType = 'json';
              datarequest.setRequestHeader('Content-Type', 'application/json');
              datarequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
              datarequest.send();
          },
          showEditModal: function (edit) {
              let targetTask = this.tableData.find((item) => item.website === edit);
              // console.log(targetTask);
              let targetTaskIndex = this.tableData.findIndex((item) => item.website === edit);
              let modal = document.getElementById('taskModal');
              let close = document.getElementById("taskModalClose");
              let TaskSchedule = document.getElementById('editTaskSchedule');
              let TaskStatus = document.getElementById('editTaskStatus');
              let TaskLimit = document.getElementById('editTaskLimit');
              let submit = document.getElementById('submitEditTask');
              let alert = document.getElementById('AlertMessage');
              TaskSchedule.value = targetTask.schedule;
              TaskStatus.value = targetTask.status;
              TaskLimit.value = targetTask.limit;
              // console.log(TaskStatus.setAttribute('value', targetTask.schedule))
              // alert.innerText = ' ';

              modal.setAttribute("style", "z-index:9999; opacity: 1;");
              close.onclick = function() {
                  modal.setAttribute("style", "z-index:-1; opacity: 0;");
              };
              window.onclick = function(event) {
                  if (event.target == modal) {
                      modal.setAttribute("style", "z-index:-1; opacity: 0;");
                  }
              };
              submit.onclick = function(v, event) {
                  // if (TaskLimit.value > 0) {
                  //     v.alert.innerText = ' ';
                  //     v.changePassword();
                  //     v.modal.setAttribute("style", "z-index:-1; opacity: 0;");
                  // } else {
                  //     // event.preventDefault();
                  //     alert.innerText = 'the limit number can not have a negative value!';
                  // }
                  if(TaskLimit.value < 0 || TaskLimit.value.length == ' ') {
                      // console.log(111);
                      alert.innerText = 'the limit number can not have a negative or empty value!';
                      // console.log(alert);
                      // v.changeTask(targetTaskIndex);
                      // modal.setAttribute("style", "z-index:-1; opacity: 0;");
                  } else {
                      alert.innerText = '';
                      v.changeTask(targetTaskIndex);
                      modal.setAttribute("style", "z-index:-1; opacity: 0;");
                  }
              }.bind(submit, this)
          },
          changeTask: function (targetTaskIndex) {
              let taskParams = {
                  schedule: document.getElementById('editTaskSchedule').value,
                  status: document.getElementById('editTaskStatus').value,
                  limit: document.getElementById('editTaskLimit').value
              };
              // console.log(taskParams);
              let editInfo = {};
              editInfo["action"] = 'updateTask';
              editInfo['targetWebsite'] = this.tableData[targetTaskIndex].website;
              editInfo['newSchedule'] = taskParams.schedule;
              editInfo['newStatus'] = taskParams.status;
              editInfo['newLimit'] = taskParams.limit;
              let editRequest = new XMLHttpRequest();
              editRequest.onreadystatechange = function(v) {
                  try {
                      if (editRequest.readyState == 4) {
                          v.loading = false;
                          v.tableData[targetTaskIndex].schedule = taskParams.schedule;
                          v.tableData[targetTaskIndex].status = taskParams.status;
                          v.tableData[targetTaskIndex].limit = taskParams.limit;
                      }
                  }
                  catch (err) {
                      console.log(err);
                  }
              }.bind(editRequest, this);
              editRequest.responseType = 'json';
              editRequest.open('PATCH', `${Host}/tasks`);
              editRequest.setRequestHeader('Content-Type', 'application/json');
              editRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
              editRequest.send(JSON.stringify(editInfo));
              this.loading = true;
          }
      }
  }
</script>