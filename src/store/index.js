import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    isMainModalOpen: false,
  },
  getters: {
    getIsMainModalOpen: (state) => {
      return state.isMainModalOpen;
    }
  },
  mutations: {
  },
  actions: {
    getDepartments(){
      return axios.get("departments");
    },
    getPriorities(){
      return axios.get("priorities");
    },
    getEmployees(){
      return axios.get("employees");
    },
    getTasks(){
      return axios.get("tasks");
    },
    getStatuses(){
      return axios.get("statuses");
    }
  },
  modules: {
  }
})
