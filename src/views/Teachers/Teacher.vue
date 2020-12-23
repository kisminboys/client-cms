<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
          User id:  {{ $route.params.id }}
        </CCardHeader>
        <CCardBody>
          <CDataTable
            striped
            small
            fixed
            :items="teacherData"
            :fields="fields"
          />
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Back</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import usersData from './UsersData'
export default {
  name: 'User',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.usersOpened = from.fullPath.includes('users')
    })
  },
  data () {
    return {
      usersOpened: null
    }
  },
  computed: {
    fields () {
      return [
        { key: 'key', label: this.teacher.fullName, _style: 'width:150px'},
        { key: 'value', label: '', _style: 'width:150px;' }
      ]
    },
    userData () {
      const id = this.$route.params.id
      const user = usersData.find((user, index) => index + 1 == id)
      const userDetails = user ? Object.entries(user) : [['id', 'Not found']]
      return userDetails.map(([key, value]) => { return { key, value } })
    },
    visibleData () {
      console.log(this.userData)
      return this.userData.filter(param => param.key !== 'username')
    },
    username () {
      return this.userData.filter(param => param.key === 'username')[0].value
    },
    teacher () {
      return this.$store.state.teacher
    },
    teacherData () {
      const id = this.$route.params.id
      // const teacherDetails 
      const arr = Object.keys(this.teacher)
      const result = arr.map((e) => {
        return {key: e, value: this.teacher[e]}
      })
      return result.filter( e => !(e.key === 'photo' || e.key === "password"))
    }
  },
  methods: {
    goBack() {
      this.usersOpened ? this.$router.go(-1) : this.$router.push({path: '/teachers'})
    }
  },
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('fetchTeacherById', id)
  }
}
</script>
