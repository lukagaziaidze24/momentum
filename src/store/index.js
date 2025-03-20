import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    isMainModalOpen: false,
    employeeAddedTriggerVal: false,
  },
  getters: {
    getIsMainModalOpen: (state) => {
      return state.isMainModalOpen;
    },
    getEmployeeAddedTriggerVal: (state) => {
      return state.employeeAddedTriggerVal;
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
    },
    employees({state}, values){
      let formData = new FormData();
      formData.append("name", values.firstName);
      formData.append("surname", values.lastName);
      formData.append("avatar", values.employeeImage);
      formData.append("department_id", values.newEmployeeDepartmentID);
      
      return axios.postForm("employees", formData);
    },
    getTaskById({state}, id){
      return axios.get(`/tasks/${id}`);
    },
    addStatusOnTask({state}, {id, status_id}){
      return axios.put(`/tasks/${id}`, {
        status_id,
      })
    },
    getCommentsForTask({state}, {task}){
      return axios.get(`tasks/${task}/comments`);
    },
    addCommentOnTask({state}, {task, parent_id, text}){
      return axios.post(`tasks/${task}/comments`, {
        parent_id,
        text,
      });
    },

  },
  modules: {
  }
})
