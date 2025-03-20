<template>
    <div class="container">
        <headerComponent/>
        <router-view/>
    </div>
    <primaryModalComponent :showModal="showModal" maxHeight="766px" maxWidth="913px" @closeModal="triggerModal">
        <template v-slot:modal-content>
            <div class="d-flex flex-column align-items-stretch" style="row-gap: 45px;">
                <h6 class="large-text-size text-center">თანამშრომლის დამატება</h6>
                <Form ref="createEmployeeForm" class="create-employee-form-grid-wrapper" v-slot="{isSubmitting}" @submit="createNewEmployee">
                    <fieldset class="primary-form-field">
                        <label for="firstName" class="primary-form-label">სახელი*</label>
                        <Field name="firstName" value="" :rules="isRequired" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                            <input v-bind="field" id="firstName" required class="primary-form-input" type="text"/>
                            <!-- <span>{{ errors }}</span> -->
                            <!-- <span>{{ errorMessage }}</span> -->
                            
                            <ul class="d-flex flex-column gap-1">
                                <li v-for="(errorMsg, i) of errors" class="primary-form-msg error">
                                    <p>{{ errorMsg }}</p>
                                </li>
                            </ul>
                            <ul v-if="meta.valid && meta.dirty">
                                <li class="primary-form-msg">
                                    <img src="@\assets\images\modal\check_green.svg" alt="img">
                                    <p>მინიმუმ 2 სიმბოლო</p>
                                </li>
                                <li class="primary-form-msg">
                                    <img src="@\assets\images\modal\check_green.svg" alt="img">
                                    <p>მაქსიმუმ 255 სიმბოლო</p>
                                </li>
                                <li class="primary-form-msg">
                                    <img src="@\assets\images\modal\check_green.svg" alt="img">
                                    <p>მარტო ლათინური და ქართული სიმბოლოები</p>
                                </li>
                            </ul>
                        </Field>
                        <!-- <ErrorMessage name="firstName" as="ul" v-slot="{ message }">
                            <li class="primary-form-msg">
                                <img src="@\assets\images\modal\check_green.svg" alt="img">
                                <p>{{ message }}</p>
                            </li>
                        </ErrorMessage> -->
                    </fieldset>
                    <fieldset class="primary-form-field">
                        <label for="lastName" class="primary-form-label">გვარი*</label>
                        <Field name="lastName" value="" :rules="isRequired" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                            <input v-bind="field" id="lastName" required class="primary-form-input" type="text"/>
    
                            <ul class="d-flex flex-column gap-1">
                                <li v-for="(errorMsg, i) of errors" class="primary-form-msg error">
                                    <p>{{ errorMsg }}</p>
                                </li>
                            </ul>
                            <ul v-if="meta.valid && meta.dirty">
                                <li class="primary-form-msg">
                                    <img src="@\assets\images\modal\check_green.svg" alt="img">
                                    <p>მინიმუმ 2 სიმბოლო</p>
                                </li>
                                <li class="primary-form-msg">
                                    <img src="@\assets\images\modal\check_green.svg" alt="img">
                                    <p>მაქსიმუმ 255 სიმბოლო</p>
                                </li>
                                <li class="primary-form-msg">
                                    <img src="@\assets\images\modal\check_green.svg" alt="img">
                                    <p>მარტო ლათინური და ქართული სიმბოლოები</p>
                                </li>
                            </ul>
                        </Field>
                    </fieldset>
                    <fieldset class="primary-form-field" style="grid-column: 1 / 3;">
                        <p  class="primary-form-label">ავატარი*</p>
                        <Field name="employeeImage" value="" :rules="isPhotoUploadedValid" :validateOnInput="true" v-slot="{ field, errors, handleChange, handleBlur, errorMessage, meta, isSubmitting }">
                            <input @change="handleChange" @blur="handleBlur" required id="employeeImage" class="primary-form-file-input" accept="image/*" type="file"/>
                            <label for="employeeImage" title="ატვირთეთ სურათი" class="primary-form-file-input-label">
                                <div v-if="choosenEmployeeImageUrl" class="chosen-image-preview">
                                    <div class="chosen-image-wrapper">
                                        <img :src="choosenEmployeeImageUrl" alt="">
                                    </div>
                                    <button @click.prevent="deleteEmployeeImage" class="employee-delete-btn">
                                        <img src="@\assets\images\modal\trash.svg" alt="remove">
                                    </button>
                                </div>
                            </label>
                            <ul class="d-flex flex-column gap-1">
                                <li v-for="(errorMsg, i) of errors" class="primary-form-msg error">
                                    <p>{{ errorMsg }}</p>
                                </li>
                            </ul>
                            <ul v-if="meta.valid && meta.dirty">
                                <li class="primary-form-msg">
                                    <img src="@\assets\images\modal\check_green.svg" alt="img">
                                    <p>სურათის ზომა მაქსიმუმ 600KB</p>
                                </li>
                            </ul>
                        </Field>
                    </fieldset>
                    <fieldset class="primary-form-field">
                        <label for="newEmployeeDepartmentID" class="primary-form-label">დეპარტამენტი*</label>
                        <Field name="newEmployeeDepartmentID" value="" :rules="checkInputNumberIDValRequired" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                            <Multiselect v-bind="field" class="primary-form-multiselect" required :options="newEmployeeDepartmentObj.options" mode="single" 
                                :searchable="true" :loading="false" :close-on-select="true" :object="false" :resolve-on-load="false" :min-chars="1"
                                :hideSelected="true" autocomplete="off" id="newEmployeeDepartmentID"/>
    
                            <ul v-if="errors?.length > 0" class="d-flex flex-column gap-1">
                                <li v-for="(errorMsg, i) of errors" class="primary-form-msg error">
                                    <p>{{ errorMsg }}</p>
                                </li>
                            </ul>
                            <ul v-if="meta.valid && meta.dirty">
                                <li class="primary-form-msg">
                                    <img src="@\assets\images\modal\check_green.svg" alt="img">
                                    <p>სავალდებულო</p>
                                </li>
                            </ul>
                        </Field>
                    </fieldset>
                    <fieldset style="grid-column: 1 / 3;" class="d-flex align-items-stretch justify-content-end gap-3">
                        <button @click="triggerModal(false)" type="button" class="common-blue-border-button standard-text-size">
                            გაუქმება
                        </button>
                        <btnWithPlus :hasPlus="false" btnType="submit">
                            <template v-slot:content>
                                <p class="standard-text-size">დაამატე თანამშრომელი</p>
                            </template>
                        </btnWithPlus>
                    </fieldset>
                </Form>
            </div>
        </template>
    </primaryModalComponent>
</template>
<style lang="scss" scoped>
</style>
<script>
import headerComponent from './headerComponent.vue';
import primaryModalComponent from './primaryModalComponent.vue';
import btnWithPlus from './btnWithPlus.vue';

import { mapGetters } from 'vuex';
export default {
    data(){
        return{
            newEmployeeDepartmentObj: {
                value: null,
                options: [],
            },
            choosenEmployeeImageUrl: null,
            showModal: false,
        }
    },
    components: {
        headerComponent,
        primaryModalComponent,
        btnWithPlus,
    },
    computed: {
        ...mapGetters({
            isMainModalOpen: "getIsMainModalOpen",
        })
    },
    mounted(){
        this.getDepartments();
    },
    watch:{
        isMainModalOpen: {
            handler(newVal){
                this.showModal = newVal;
            },
        },
    },
    methods: {
        deleteEmployeeImage(){
            // this.$refs.createEmployeeForm.resetForm();
            this.$refs.createEmployeeForm.setFieldValue("employeeImage", null);
            this.clearNewEmployeeImage();
        },
        createNewEmployee(values){
            
            this.$store.dispatch("employees", values).then((response) => {
                if(response.status == 201){
                    this.triggerModal(false);
                    
                    this.$store.state.employeeAddedTriggerVal = !this.$store.state.employeeAddedTriggerVal;
                }
            }).catch((error) => {
                if(error.response.status >= 400){
                }
            });
        },
        isPhotoUploadedValid(file){
            let isPhotoValid = this.$helper.isPhotoUploadedValid(file);
            if(isPhotoValid === true){
                let chosenEmployeeImage = new Blob([file], {
                    type: file.type,
                });
                this.choosenEmployeeImageUrl = URL.createObjectURL(chosenEmployeeImage);
            }else{
                this.clearNewEmployeeImage();
            }
            return isPhotoValid;
        },
        clearNewEmployeeImage(){
            URL.revokeObjectURL(this.choosenEmployeeImageUrl);
            this.choosenEmployeeImageUrl = null;
        },
        isRequired(value) {
            return this.$helper.isRequired(value);
        },
        checkInputNumberIDValRequired(value){
            return this.$helper.checkInputNumberIDValRequired(value);
        },
        triggerModal(val){
            if(!val && this.choosenEmployeeImageUrl){
                this.clearNewEmployeeImage();
                this.$refs.createEmployeeForm.resetForm();
            }
            
            this.$store.state.isMainModalOpen = val;
        },
        getDepartments(){
            this.$store.dispatch("getDepartments").then((response) => {
                response.data.forEach((departmentObj) => {
                    this.newEmployeeDepartmentObj.options.push({
                        value: departmentObj.id,
                        label: departmentObj.name
                    });
                });
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.create-employee-form-grid-wrapper{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: min-content;
    gap: 45px;
}
</style>