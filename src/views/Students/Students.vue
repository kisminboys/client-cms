<template>
  <CRow>
    <CCol col="12" xl="8">
      <CCard>
        <CCardHeader>
          Students
        </CCardHeader>
        <CCardBody>
          <CDataTable
            hover
            striped
            :items="students"
            :fields="fields"
            :items-per-page="5"
            clickable-rows
            :active-page="activePage"
            @row-clicked="rowClicked"
            :pagination="{ doubleArrows: false, align: 'center'}"
            @page-change="pageChange"
          >
            <template #status="data">
              <td>
                <CBadge :color="getBadge(data.item.status)">
                  {{data.item.status}}
                </CBadge>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import usersData from './UsersData'
export default {
  name: 'Students',
  data () {
    return {
      items: usersData,
      fields: [
        { key: 'fullName', label: 'Name', _classes: 'font-weight-bold' },
        { key: 'email' },
        { key: 'batch' },
        { key: 'activation' }
      ],
      activePage: 1
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page)
        }
      }
    }
  },
  methods: {
    getBadge (activation) {
      switch (activation) {
        case 'Active': return 'success'
        case 'Not Active': return 'danger'
        default: 'primary'
      }
    },
    rowClicked (item, index) {
      this.$router.push({path: `users/${index + 1}`})
    },
    pageChange (val) {
      this.$router.push({ query: { page: val }})
    }
  },
  created () {
    this.$store.dispatch('fetchStudents')
  },
  computed: {
    students () {
      return this.$store.state.students
    }
  }
}
</script>
