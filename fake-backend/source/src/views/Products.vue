<template lang="html">

  <div class="container-scroller">
    <app-header/>
    <div class="container-fluid page-body-wrapper">
      <app-sidebar/>
      <div class="main-panel">
        <div class="content-wrapper">
            <div class="card">
            <div class="card-body">
         <vue-data-table>
          <v-client-table
          :data="tableData"
          :columns="columns"
          :options="options"
          >
  <a slot="actions" slot-scope="props" >
        <button class="btn btn-primary"> active</button>
    </a>
        </v-client-table>

        </vue-data-table>

        </div>
        </div>
        </div>
        <!-- content wrapper ends -->
        <app-footer/>
      </div>
      <!-- main panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>

</template>

<script lang="js">
import AppHeader from '../../src/components/partials/AppHeader'
import AppSidebar from '../../src/components/partials/AppSidebar'
import AppFooter from '../../src/components/partials/AppFooter'
export default {
  name: 'products',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter
  },
  data() {
        return {
            columns: ['ID', 'Name','Category','Cost'],
            tableData: [],
            options: {
                headings: {
                    url: 'URL',
                    name: 'Name',
                },
                sortable: ['ID', 'Name','Category','Cost'],
                filterable: ['ID', 'Name','Category','Cost']
            }
        }
    },
    mounted() {
        this.axios.get('http://www.json-generator.com/api/json/get/bTyWGOlEgO?indent=2').then(res => {
            this.tableData = res.data
    })
    }
}
</script>

<style scoped lang="scss">

</style>
