<template lang="html">
  <div class="container-scroller">
    <app-header/>
    <div class="container-fluid page-body-wrapper">
      <app-sidebar/>
      <div class="main-panel">
        <div class="content-wrapper">
          <section class="dashboard">
            <vue-data-table>
              <v-client-table
                :data="tableData"
                :columns="columns"
                :options="options">
              </v-client-table>
            </vue-data-table>
          </section>
        </div>
        <app-footer/>
      </div>
    </div>
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
      // columns: ['id', 'name', 'category', 'cost'],
      // tableData: [],
      // options: {
      //   headings: {
      //     id: 'ID',
      //     name: 'Name',
      //     category: 'Category',
      //     cost: 'Cost'
      //   },
      //   sortable: ['id', 'name', 'category', 'cost'],
      //   filterable: ['id', 'name', 'category', 'cost']
      // }
    }
  },
  mounted() {
    // this.axios.get(`${Host}/products`).then(res => {
    //   this.tableData = res.data
    // })
  }
}
</script>

<style scoped lang="scss">
</style>
