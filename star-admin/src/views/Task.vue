<template lang="html">
  <div class="container-scroller">
    <app-header/>
    <div class="container-fluid page-body-wrapper">
      <app-sidebar/>
      <div class="main-panel">
        <div class="content-wrapper">
          <section class="dashboard">
            <el-table :data="tableData" width="100%">
              <el-table-column
                      prop="website"
                      label="Website"
                      width="280">
              </el-table-column>
              <el-table-column
                      prop="schedule"
                      label="Schedule">
              </el-table-column>
              <el-table-column
                      prop="status"
                      label="Status">
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
                        <option value="HOUR_2">2 Hours</option>
                        <option value="HOUR_4">4 Hours</option>
                        <option value="HOUR_8">8 Hours</option>
                        <option value="HOUR_12">12 Hours</option>
                        <option value="DAY_1">1 Day</option>
                        <option value="WEEK_1">1 Week</option>
                        <option value="MONTH_1">1 Month</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Status</label>
                      <select id="editTaskStatus" class="form-control" >
                        <option value="ENABLED">ENABLED</option>
                        <option value="DISABLED">DISABLED</option>
                      </select>
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
            tableData: []
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
                      // console.log(datarequest.response);
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
              let targetTaskIndex = this.tableData.findIndex((item) => item.website === edit);
              // console.log(targetTask);
              let modal = document.getElementById('taskModal');
              let close = document.getElementById("taskModalClose");
              let submit = document.getElementById('submitEditTask');

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
                  v.changeTask(targetTaskIndex);
                  modal.setAttribute("style", "z-index:-1; opacity: 0;");
              }.bind(submit, this)
          },
          changeTask: function (targetTaskIndex) {
              let taskParams = {
                  schedule: document.getElementById('editTaskSchedule').value,
                  status: document.getElementById('editTaskStatus').value
              };
              let editInfo = {};
              editInfo["action"] = 'updateTask';
              editInfo['targetWebsite'] = this.tableData[targetTaskIndex].website;
              editInfo['newSchedule'] = taskParams.schedule;
              editInfo['newStatus'] = taskParams.status;
              // console.log(taskParams);
              // console.log(editInfo);
              let editRequest = new XMLHttpRequest();
              editRequest.onreadystatechange = function(v) {
                  try {
                      if (editRequest.readyState == 4) {
                          v.tableData[targetTaskIndex].schedule = taskParams.schedule;
                          v.tableData[targetTaskIndex].status = taskParams.status;
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
          }
      }
  }
</script>