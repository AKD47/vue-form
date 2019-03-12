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
    import AppHeader from '../components/AppHeader'
    import AppSidebar from '../components/AppSidebar'
    import AppFooter from '../components/AppFooter'

    export default {
        name: 'products',
        components: {
            AppHeader,
            AppSidebar,
            AppFooter
        },
        data() {
            return {

            }
        },
    }
</script>

<style scoped lang="scss">
</style>
