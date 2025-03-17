<template>
    <div class="page-content-primary-wrapper">
        <h2 class="extra-large-text-size">დავალებების გვერდი</h2>
        <div class="d-flex flex-column w-100">
            <filterComponent :buttonsArr="filterButtonsArr" :closeTrigger="filtersCloseTrigger" @chosenBtnObj="getChosenBtnObj">
                <template v-slot:bodyContent>
                    <div v-if="chosenBtnObj?.content == 'დეპარტამენტი'">
                        <form @submit.prevent="submitDepartments()" class="d-flex flex-column align-items-start gap-2">
                            <fieldset v-for="(departmentObj, i) of departmentsOptionsArr" class="d-flex align-items-center gap-2 cursor-pointer">
                                <input :name="`department${departmentObj.id}`" :id="`department${departmentObj.id}`" class="filter-checkbox cursor-pointer" type="checkbox" v-model="departmentObj.vmodel">
                                <label :for="`department${departmentObj.id}`" class="standard-text-size cursor-pointer">{{ departmentObj?.name }}</label>
                            </fieldset>
                            <btnWithPlus @click="closeFiltersBody()" btnType="submit" class="align-self-end" :mode2="true" :hasPlus="false">
                                <template v-slot:content>
                                    არჩევა
                                </template>
                            </btnWithPlus>
                        </form>
                    </div>
                    <div v-if="chosenBtnObj?.content == 'პრიორიტეტი'">
                        <form @submit.prevent="submitPriorities()" class="d-flex flex-column align-items-start gap-2">
                            <fieldset v-for="(priorityObj, i) of prioritiesOptionsArr" class="d-flex align-items-center gap-2 cursor-pointer">
                                <input :name="`priority${priorityObj.id}`" :id="`priority${priorityObj.id}`" class="filter-checkbox cursor-pointer" type="checkbox" v-model="priorityObj.vmodel">
                                <label :for="`priority${priorityObj.id}`" class="standard-text-size cursor-pointer">{{ priorityObj?.name }}</label>
                            </fieldset>
                            <btnWithPlus @click="closeFiltersBody()" btnType="submit" class="align-self-end" :mode2="true" :hasPlus="false">
                                <template v-slot:content>
                                    არჩევა
                                </template>
                            </btnWithPlus>
                        </form>
                    </div>
                    <div v-if="chosenBtnObj?.content == 'თანამშრომელი'">
                        <form ref="employeeFiltersForm" @submit.prevent="submitEmployees()" class="d-flex flex-column align-items-start gap-2">
                            <fieldset v-for="(employeeObj, i) of employeesOptionsArr" class="d-flex align-items-center gap-2 cursor-pointer">
                                <input @click="toggleEmployeeCheckBox" :name="`employee`" :id="`employee${employeeObj.id}`" class="filter-checkbox cursor-pointer" type="radio" v-model="employeesOptionsSelectedVal" :value="employeeObj.id">
                                <label :for="`employee${employeeObj.id}`" class="d-flex align-items-center gap-2 cursor-pointer">
                                    <img loading="lazy" class="filters-img" :src="employeeObj?.avatar" alt="avatarImg">
                                    <p class="standard-text-size">{{ `${employeeObj?.name} ${employeeObj?.surname}` }}</p>
                                </label>
                            </fieldset>
                            <btnWithPlus @click="closeFiltersBody()" btnType="submit" class="align-self-end" :mode2="true" :hasPlus="false">
                                <template v-slot:content>
                                    არჩევა
                                </template>
                            </btnWithPlus>
                        </form>
                    </div>
                </template>
            </filterComponent>
            <main class="assignments-main-content d-flex flex-column align-items-stretch">
                <div class="status-titles-wrapper">
                    <div v-for="(ststusObj, i) of statusesArray" :class="['status-title', {'yellow': ststusObj.id == 1}, {'orange': ststusObj.id == 2}, {'pink': ststusObj.id == 3}, {'blue': ststusObj.id == 4}, 'slightly-large-text-size']">
                        {{ ststusObj.name }}
                    </div>
                </div>
                <div class="assignment-cards-cols-wrapper">
                    <ul v-for="(tasksArr, i) of [toDoTasks, tasksInProgress, readyForTestingTasks, doneTasks]" class="assignment-cards-col d-flex flex-column align-items-stretch">
                        <li v-for="(toDoTask, i) of tasksArr">
                            <article :class="['d-flex', 'primary-card', 'flex-column', {'yellow': toDoTask.status.id == 1}, {'orange': toDoTask.status.id == 2}, {'pink': toDoTask.status.id == 3}, {'blue': toDoTask.status.id == 4}]">
                                <div class="d-flex align-items-center justify-content-between light-text-size">
                                    <div class="d-flex align-items-center gap-2">
                                        <div :class="['priority-indicator', {'green': toDoTask.priority.id == 1}, {'yellow': toDoTask.priority.id == 2}, {'orange': toDoTask.priority.id == 3}, 'd-flex', 'align-items-center', 'gap-1', 'br-5']">
                                            <img v-if="toDoTask.priority.id == 1" src="@\assets\images\assignment_card_images\Low.svg" alt="">
                                            <img v-if="toDoTask.priority.id == 2" src="@\assets\images\assignment_card_images\avarage.svg" alt="">
                                            <img v-if="toDoTask.priority.id == 3" src="@\assets\images\assignment_card_images\High.svg" alt="">
                                            <p>{{ toDoTask.priority.name }}</p>
                                        </div>
                                    </div>
                                    <p>{{ `${new Date(toDoTask.due_date).getDate()} ${dateArr[new Date(toDoTask.due_date).getMonth()]}, ${new Date(toDoTask.due_date).getFullYear()}` }}</p>
                                </div>
                                <div class="d-flex flex-column align-items-stretch gap-3">
                                    <h5 class="slightly-large-text-size">{{ toDoTask.name }}</h5>
                                    <p class="before-standard-text-size">{{ toDoTask.description }}</p>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <img style="width: 31px; height: 31px; border-radius: 50%;" :src="toDoTask.employee.avatar" alt="profile img">
                                    <div class="d-flex align-items-center gap-1 before-standard-text-size">
                                        <img src="@\assets\images\assignment_card_images\Comments.svg" alt="comments">
                                        <p>{{ toDoTask.total_comments }}</p>
                                    </div>
                                </div>
                            </article>
                        </li>
                    </ul>
                </div>
            </main>

           
        </div>
    </div>
</template>
<script>
import btnWithPlus from '@/components/btnWithPlus.vue';
import filterComponent from '@/components/filterComponent.vue';
export default {
    data(){
        return {
            // for filters section >>
            filteringInfo: {
                selectedEmployeesIDs: null,
                selectedPrioritiesIDs: null,
                selectedDepartmentsIDs: null,
            },
            departmentsOptionsArr: [],
            prioritiesOptionsArr: [],
            employeesOptionsArr: [], 
            employeesOptionsSelectedVal: null,
            checkedRadioBtnValue: null,
            filterButtonsArr: [
                {
                    content: "დეპარტამენტი",
                    isChosen: false,
                },
                {
                    content: "პრიორიტეტი",
                    isChosen: false,
                },
                {
                    content: "თანამშრომელი",
                    isChosen: false,
                }
            ],
            chosenBtnObj: null,
            filtersCloseTrigger: false,
            // for main content >>
            statusesArray: [],
            alltasks: {},
            toDoTasks: [],
            tasksInProgress: [],
            readyForTestingTasks: [],
            doneTasks: [],
            dateArr: [
                'იან','თებ','მარტ','აპრ','მაი','ივნ','ივლ','აგვ','სექ','ოქტ','ნოე','დეკ',
            ],
        }
    },
    mounted(){
        this.routerMountMovement(this.$route);
        this.getDepartments();
        this.getPriorities();
        this.getEmployees();
        this.getStatuses();
    },
    beforeRouteUpdate(to, from, next){
        this.getInfoFromRoute(to);
        this.filterAllTasks();
        // this.getTasks();
        next(true);
    },
    methods: {
        routerMountMovement(to){
            this.getInfoFromRoute(to);
            this.getTasks();
        },
        getInfoFromRoute(to){
            Object.keys(this.filteringInfo).forEach((key) => {
                this.filteringInfo[key] = null;
                console.log(to.query[key]);
                if(key == "selectedEmployeesIDs" && this.checkNumber(decodeURIComponent(to.query[key]?.replace(/%/g, "%25")))){
                    this.filteringInfo[key] = decodeURIComponent(to.query[key]?.replace(/%/g, "%25"));

                }else if(key !== "selectedEmployeesIDs" && this.checkFilterItem(decodeURIComponent(to.query[key]?.replace(/%/g, "%25")))){
                    this.filteringInfo[key] = decodeURIComponent(to.query[key]?.replace(/%/g, "%25"));
                }
            });
            console.log(this.filteringInfo);
        },
        
        filterAllTasks(){
            this.toDoTasks = [];
            this.tasksInProgress = [];
            this.readyForTestingTasks = [];
            this.doneTasks = [];
            let selectedDepartments = this.filteringInfo.selectedDepartmentsIDs?.split(",");
            let selectedPriorities = this.filteringInfo.selectedPrioritiesIDs?.split(",");
            console.log(selectedPriorities);
            

            let conformsDepatrmentsFilters;
            let conformsPrioritiesFilters;
            let conformsEmployeeFilter;
            this.alltasks.forEach((taskObj) => {
                if(selectedDepartments?.length > 0){
                    conformsDepatrmentsFilters = selectedDepartments.some((departmentID) => {
                        return departmentID == taskObj.department.id;
                    })
                }else{
                    conformsDepatrmentsFilters = true;
                }

                if(selectedPriorities?.length > 0){
                    conformsPrioritiesFilters = selectedPriorities.some((priorityID) => {
                        console.log(priorityID);
                        console.log(taskObj.priority.id);
                        
                        return priorityID == taskObj.priority.id;
                    })
                }else{
                    conformsPrioritiesFilters = true;
                }



                if(this.filteringInfo.selectedEmployeesIDs !== null){
                    conformsEmployeeFilter = taskObj.employee.id == this.filteringInfo.selectedEmployeesIDs?true:false;
                }else{
                    conformsEmployeeFilter = true;
                }

                
                if(conformsDepatrmentsFilters && conformsPrioritiesFilters && conformsEmployeeFilter){
                    console.log("sheushva");
                    
                    this.pushInTasks(taskObj);
                }
                conformsDepatrmentsFilters = false;
                conformsPrioritiesFilters = false;
                conformsEmployeeFilter = false;
            });
        },
        checkNumber(item){
            return /^[\d]+$/.test(String(item));
        },
        checkFilterItem(item){
            return /^[\d,]+$/.test(String(item));
        },
        toggleEmployeeCheckBox(e){
            console.log(e.target);
            console.log(this.checkedRadioBtnValue);
            if(e.target.checked && e.target.value == this.checkedRadioBtnValue){
                this.employeesOptionsSelectedVal = null;
            }
            this.checkedRadioBtnValue = e.target.value;
        },
        submitEmployees(){
            console.log(this.employeesOptionsSelectedVal);
            
            if(this.employeesOptionsSelectedVal){
                this.$router.push({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        selectedEmployeesIDs: this.employeesOptionsSelectedVal,
                    },
                });
            }else{
                this.$router.push({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        selectedEmployeesIDs: "",
                    },
                });
            }
        },
        submitPriorities(){
            let selectedPrioritiesIDInStr = "";
            this.prioritiesOptionsArr.forEach((priorityObj) => {
                if(priorityObj.vmodel){
                    selectedPrioritiesIDInStr += (selectedPrioritiesIDInStr.length == 0?`${priorityObj.id}`:`,${priorityObj.id}`);
                }
            });
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    selectedPrioritiesIDs: selectedPrioritiesIDInStr,
                },
            });
            console.log(selectedPrioritiesIDInStr);
        },
        submitDepartments(){
            console.log(this.departmentsOptionsArr);
            let selectedDepartmentsIDInStr = "";
            this.departmentsOptionsArr.forEach((departmentObj) => {
                if(departmentObj.vmodel){
                    selectedDepartmentsIDInStr += (selectedDepartmentsIDInStr.length == 0?`${departmentObj.id}`:`,${departmentObj.id}`);
                }
            });
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    selectedDepartmentsIDs: selectedDepartmentsIDInStr,
                },
            });
            console.log(selectedDepartmentsIDInStr);
        },
        closeFiltersBody(){
            this.filtersCloseTrigger = !this.filtersCloseTrigger;
        },
        getChosenBtnObj(data){
            this.chosenBtnObj = data;
        },
        pushInTasks(taskObj){
            if(taskObj.status.id == 1){
                this.toDoTasks.push(taskObj);
            }else if(taskObj.status.id == 2){
                this.tasksInProgress.push(taskObj);
            }else if(taskObj.status.id == 3){
                this.readyForTestingTasks.push(taskObj);
            }else if(taskObj.status.id == 4){
                this.doneTasks.push(taskObj);
            }
        },
        getTasks(){
            this.$store.dispatch("getTasks").then((response) => {
                this.toDoTasks = [];
                this.tasksInProgress = [];
                this.readyForTestingTasks = [];
                this.doneTasks = [];
                // response.data.forEach((taskObj) => {
                //     this.pushInTasks(taskObj);
                // });
                this.alltasks = response.data;
                this.filterAllTasks();
            });
        },  
        getStatuses(){
            this.$store.dispatch("getStatuses").then((response) => {
                this.statusesArray = response.data;
            });
        },
        getDepartments(){
            this.$store.dispatch("getDepartments").then((response) => {
                let chosenDepartmentIDs = this.filteringInfo.selectedDepartmentsIDs?.split(",");
                
                response.data.forEach((obj) => {
                    if(chosenDepartmentIDs?.includes(String(obj.id))){
                        this.departmentsOptionsArr.push({
                            ...obj,
                            vmodel: true,
                        });
                    }else{
                        this.departmentsOptionsArr.push({
                            ...obj,
                            vmodel: false,
                        });
                    }
                });
            });
        },
        getPriorities(){
            this.$store.dispatch("getPriorities").then((response) => {
                let chosenPrioritiesIDs = this.filteringInfo.selectedPrioritiesIDs?.split(",");

                response.data.forEach((obj) => {
                    if(chosenPrioritiesIDs?.includes(String(obj.id))){
                        this.prioritiesOptionsArr.push({
                            ...obj,
                            vmodel: true,
                        });
                    }else{
                        this.prioritiesOptionsArr.push({
                            ...obj,
                            vmodel: false,
                        });
                    }
                });
            });
        },
        getEmployees(){
            this.$store.dispatch("getEmployees").then((response) => {
                this.employeesOptionsArr = response.data;
                this.employeesOptionsSelectedVal = this.filteringInfo.selectedEmployeesIDs;
            });
        },
    },

    components: {
        btnWithPlus,
        filterComponent,
    }
}
</script>
<style lang="scss" scoped>
.page-content-primary-wrapper{  
    display: flex;
    flex-direction: column;
    row-gap: 52px;
    align-items: start;
}
.filters-wrapper{
    width: 688px;
}
.filter-checkbox{
    width: 22px;
    height: 22px;
    border-radius: 6px;
    border-radius: 1px solid var(--primaryMagenta);
}
.filters-img{
    width: 28px;
    height: 28px;
    border-radius: 50%;
}
.assignments-main-content{
    row-gap: 30px;
    .status-titles-wrapper{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: min-content;
        column-gap: 52px;
        row-gap: 30px;
        .status-title{
            width: 100%;
            padding: 15px 0;
            display: flex;
            justify-content: center;
            color: var(--main-background-color);
            border-radius: 10px;
            &.yellow{
                background-color: var(--extra-yellow);
            }
            &.orange{
                background-color: var(--extra-orange);
            }
            &.pink{
                background-color: var(--extra-pink);
            }
            &.blue{
                background-color: var(--extra-blue);
            }
        }
    }
    .assignment-cards-cols-wrapper{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: min-content;
        column-gap: 52px;
        row-gap: 30px;
        .assignment-cards-col{
            row-gap: 30px;
            .primary-card{
                border-radius: 15px;
                padding: 20px;
                row-gap: 28px;
                .priority-indicator{
                    
                    padding: 4px 6px;
                    &.yellow{
                        border: 0.5px solid var(--light-yellow);
                        color: var(--light-yellow);
                    }
                    &.orange{
                        border: 0.5px solid var(--extra-orange);
                        color: var(--extra-orange);
                    }
                    &.green{
                        border: 0.5px solid var(--middle-green);
                        color: var(--middle-green);
                    }
                }
                &.yellow{
                    border: 1px solid var(--extra-yellow);
                }
                &.orange{
                    border: 1px solid var(--extra-orange);
                }
                &.pink{
                    border: 1px solid var(--extra-pink);
                }
                &.blue{
                    border: 1px solid var(--extra-blue);
                }
            }
        }
    }
    
}
</style>