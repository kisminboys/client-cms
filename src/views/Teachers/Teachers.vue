<template>
  <CRow>
    <CCol col="12" xl="8">
      <CCard>
        <CCardHeader>
          Users
        </CCardHeader>
        <CCardBody>
          <CDataTable
            hover
            striped
            :items="teachers"
            :fields="fields"
            :items-per-page="3"
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
  name: 'Users',
  data () {
    return {
      items: this.teachers,
      fields: [
        { key: 'fullName', label: 'Name', _classes: 'font-weight-bold' },
        { key: 'email' },
        { key: 'gender' },
        { key: 'birthDate' }
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
    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
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
    this.$store.dispatch('fetchTeachers')
  },
  computed: {
    teachers () {
      return this.$store.state.teachers
    }
  }
}
</script>
