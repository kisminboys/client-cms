import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    teachers: [],
    teacher: {},
    students: [],
    subjects: []
  },
  mutations: {
    toggleSidebarDesktop (state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
      state[variable] = value
    },
    SET_TEACHERS (state, payload) {
      state.teachers = payload
    },
    SET_TEACHER (state, payload) {
      state.teacher = payload
    },
    SET_STUDENTS (state, payload) {
      state.students = payload
    },
    SET_SUBJECTS (state, payload) {
      state.subjects = payload
    }
  },
  actions: {
    login (context, payload) {
      console.log(payload);
      axios({
        method: 'POST',
        url: '/admin/login',
        data: payload
      })
        .then(response => {
          console.log(response.data)
          localStorage.setItem('access_token', response.data.access_token)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchTeachers (context, payload) {
      axios({
        method: 'get',
        url: '/teachers',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
        context.commit('SET_TEACHERS', data)
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    },
    fetchTeacherById (context, payload) {
      console.log(payload);
      axios({
        method: 'get',
        url: `/teachers/${payload}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        console.log(data);
        context.commit('SET_TEACHER', data)
      })
      .catch(err => {
        console.log(err);
      })
    }, 
    fetchStudents (context, payload) {
      axios({
        method: 'get',
        url: '/students',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
        context.commit('SET_STUDENTS', data)
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    }, 
    fetchSubjects (context, payload) {
      axios({
        method: 'GET',
        url: '/subjects',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
        context.commit('SET_SUBJECTS', data)
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    } 
  },
  modules: {
  }
})
