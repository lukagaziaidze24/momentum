<template>
    <main v-if="currentTask" class="d-flex flex-column align-items-start gap-3">
        <div :class="['priority-indicator', {'green': currentTask.priority.id == 1}, {'yellow': currentTask.priority.id == 2}, {'orange': currentTask.priority.id == 3}, 'd-flex', 'align-items-center', 'gap-1', 'br-5']">
            <img v-if="currentTask.priority.id == 1" src="@\assets\images\assignment_card_images\Low.svg" alt="img">
            <img v-if="currentTask.priority.id == 2" src="@\assets\images\assignment_card_images\avarage.svg" alt="img">
            <img v-if="currentTask.priority.id == 3" src="@\assets\images\assignment_card_images\High.svg" alt="img">
            <p>{{ currentTask.priority.name }}</p>
        </div>
        <div class="d-flex justify-content-between w-100">
            <section class="task-info-section d-flex flex-column" style="row-gap: 63px;">
                <article class="d-flex flex-column gap-4">
                    <h4 class="extra-large-text-size">{{ currentTask.name }}</h4>
                    <p class="standard-text-size">{{ currentTask.description }}</p>
                </article>
                <div class="d-flex flex-column">
                    <h6 class="before-large-text-size" style="margin-bottom: 28px;">დავალების დეტალები</h6>
                    <ul class="task-details-ul-grid-wrapper color-extra-gray">
                        <li class="d-flex align-items-center gap-3">
                            <img src="@\assets\images\detailedTaskPage\pie_chart.svg" alt="img">
                            <p class="standard-text-size">სტატუსი</p>
                        </li>
                        <li class="d-flex align-items-center gap-3">
                            <img src="@\assets\images\detailedTaskPage\user.svg" alt="img">
                            <p class="standard-text-size">თანამშრომელი</p>
                        </li>
                        <li class="d-flex align-items-center gap-3">
                            <img src="@\assets\images\detailedTaskPage\calendar.svg" alt="img">
                            <p class="standard-text-size">დავალების ვადა</p>
                        </li>
                        <li class="d-flex align-items-center gap-3 w-100">
                            <Form class="w-100" v-slot="{ isSubmitting }" @submit.prevent>
                                <fieldset class="primary-form-field">
                                    <Field name="taskStatus" :value="statusesMultiselectObj.value" :rules="checkInputNumberIDValRequired" :validateOnInput="true" v-slot="{ field, errors, handleChange, handleBlur, errorMessage, meta, isSubmitting }">
                                        <Multiselect v-bind="field" class="primary-form-multiselect" required :options="statusesMultiselectObj.options" mode="single" 
                                            :searchable="true" :loading="false" :close-on-select="true" :object="false" :resolve-on-load="false" :min-chars="1"
                                            :hideSelected="true" autocomplete="off" id="taskStatus" @select="newStatusSelected"/>
    
                                        <ul v-if="errors?.length > 0" class="d-flex flex-column gap-1">
                                            <li v-for="(errorMsg, i) of errors" class="primary-form-msg error">
                                                <p>{{ errorMsg }}</p>
                                            </li>
                                        </ul>
                                    </Field>
                                </fieldset>
                            </Form>
                        </li>
                        <li class="d-flex align-items-end gap-3">
                            <img class="task-details-employee-img" :src="currentTask.employee.avatar" alt="img">
                            <div class="d-flex flex-column gap-2">
                                <p class="light-text-size">{{ currentTask.department.name }}</p>
                                <p class="standard-text-size color-middle-black">{{ `${currentTask.employee.name} ${currentTask.employee.surname}` }}</p>
                            </div>
                        </li>
                        <li class="d-flex align-items-center gap-3">
                            <div class="d-flex flex-column gap-2">
                                <p class="standard-text-size color-middle-black">{{ 
                                    `${this.$helper.weekDayArr[new Date(currentTask.due_date).getDay()]} - ${new Date(currentTask.due_date).getDate()}/${new Date(currentTask.due_date).getMonth() + 1}/${new Date(currentTask.due_date).getFullYear()}`
                                }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="task-info-comments-section br-10">
                <Form class="w-100" v-slot="{ isSubmitting }" @submit="addCommentOnTask">
                    <fieldset class="primary-form-field">
                        <Field name="taskComment" value="" :rules="isRequired" :validateOnInput="true" v-slot="{ field, errors, handleChange, handleBlur, errorMessage, meta, isSubmitting }">
                            <fieldset class="primary-textarea-wrapper">
                                <textarea v-bind="field" placeholder="დაწერე კომენტარი" required class="primary-form-input primary-form-textarea" id="taskComment"></textarea>
                                <btnWithPlus :hasPlus="false" :mode2="true" btnType="submit" class="primary-form-textarea-submit">
                                    <template v-slot:content>
                                        <p class="standard-text-size">დააკომენტარე</p>
                                    </template>
                                </btnWithPlus>
                            </fieldset>
                            <ul v-if="errors?.length > 0" class="d-flex flex-column gap-1">
                                <li v-for="(errorMsg, i) of errors" class="primary-form-msg error">
                                    <p>{{ errorMsg }}</p>
                                </li>
                            </ul>
                        </Field>
                    </fieldset>
                </Form>
                <div class="d-flex flex-column justify-content-start align-items-stretch gap-5">
                    <div class="d-flex align-items-stretch gap-2">
                        <h5 class="just-before-large-text-size">კომეტარები</h5>
                        <div class="comment-count-indicator before-standard-text-size">
                            {{ currentTaskComments?.length??0 }}
                        </div>
                    </div>
                    <ul class="d-flex flex-column align-items-stretch gap-3">
                        <li v-for="(taskCommentObj, i) of currentTaskComments">
                            <article class="d-flex align-items-start gap-2">
                                <img :src="taskCommentObj.author_avatar" alt="img" class="circle" style="width: 38px; height: 38px;">
                                <div class="d-flex flex-column gap-2 pt-1 w-100">
                                    <h6 class="slightly-large-text-size18">{{ taskCommentObj.author_nickname }}</h6>
                                    <p class="standard-text-size">{{ taskCommentObj.text }}</p>
                                    <accordion :closeTrigger="commentReplyBodyCloseIndicator" @openModeChange="(isOpen) => {handleCommentReplyBodyClose(isOpen, `replyCommentForm${taskCommentObj.id}`)}"> 
                                        <template v-slot:accordionHead>
                                            <button class="d-flex align-items-center gap-2 cursor-pointer">
                                                <img src="@\assets\images\detailedTaskPage\Left2.svg" alt="img">
                                                <span class="color-primary-magenta light-text-size">უპასუხე</span>
                                            </button>
                                        </template>
                                        <template v-slot:accordionBody>
                                            <Form :ref="`replyCommentForm${taskCommentObj.id}`" class="w-100" v-slot="{ isSubmitting }" @submit="(values, actions) => {replyComment(values, actions, taskCommentObj)}">
                                                <fieldset class="primary-form-field">
                                                    <Field name="commentReply" value="" :rules="isRequired" :validateOnInput="true" v-slot="{ field, errors, handleChange, handleBlur, errorMessage, meta, isSubmitting }">
                                                        <fieldset class="primary-textarea-wrapper">
                                                            <textarea v-bind="field" placeholder="დაწერე კომენტარი" required class="primary-form-input primary-form-textarea" id="commentReply"></textarea>
                                                            <btnWithPlus :hasPlus="false" :mode2="true" btnType="submit" class="primary-form-textarea-submit">
                                                                <template v-slot:content>
                                                                    <p class="standard-text-size">დააკომენტარე</p>
                                                                </template>
                                                            </btnWithPlus>
                                                        </fieldset>
                                                        <ul v-if="errors?.length > 0" class="d-flex flex-column gap-1">
                                                            <li v-for="(errorMsg, i) of errors" class="primary-form-msg error">
                                                                <p>{{ errorMsg }}</p>
                                                            </li>
                                                        </ul>
                                                    </Field>
                                                </fieldset>
                                            </Form>
                                        </template>
                                    </accordion>
                                    <article v-if="taskCommentObj.sub_comments?.length > 0" v-for="(sub_commentObj, i) of taskCommentObj.sub_comments" class="d-flex align-items-start gap-2">
                                        <img :src="sub_commentObj.author_avatar" alt="img" class="circle" style="width: 38px; height: 38px;">
                                        <div class="d-flex flex-column gap-2 pt-1">
                                            <h6 class="slightly-large-text-size18">{{ sub_commentObj.author_nickname }}</h6>
                                            <p class="standard-text-size">{{ sub_commentObj.text }}</p>
                                        </div>
                                    </article>
                                </div>
                            </article>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </main>
</template>
<script>
import { Field } from 'vee-validate';
import btnWithPlus from '@/components/btnWithPlus.vue';
import accordion from '@/components/accordion.vue';

export default {
    data(){
        return {
            commentReplyBodyCloseIndicator: false,
            currentTaskComments: [],
            currentTask: null,
            statusesMultiselectObj: {
                options: [],
                value: null,
            }
        }
    },
    components: {
        btnWithPlus,
        accordion,
    },
    mounted(){
        this.getTaskAndStatuses();
        this.getCommentsForTask();
    },
    methods: {
        handleCommentReplyBodyClose(isOpen, refIndicator){
            if(!isOpen){
                this.$refs[refIndicator][0].resetForm()
            }
        },
        replyComment(values, actions, taskCommentObj){
            this.$store.dispatch("addCommentOnTask", {task: this.$route.params.taskID, text: values.commentReply, parent_id: taskCommentObj.id}).then((response) => {
                if(response.status == 201){
                    actions.resetForm();
                    this.getCommentsForTask();
                    // this.commentReplyBodyCloseIndicator = !this.commentReplyBodyCloseIndicator;
                }
            }).catch((error) => {

            });
        },
        getCommentsForTask(){
            this.$store.dispatch("getCommentsForTask", {task: this.$route.params.taskID}).then((response) => {
                this.currentTaskComments = [];
                setTimeout(() => {
                    this.currentTaskComments = response.data;
                }, 0)
            });
        },
        addCommentOnTask(values, actions){
            this.$store.dispatch("addCommentOnTask", {task: this.$route.params.taskID, text: values.taskComment, parent_id: null}).then((response) => {
                if(response.status == 201){
                    actions.resetForm();
                    this.getCommentsForTask();
                    this.commentReplyBodyCloseIndicator = !this.commentReplyBodyCloseIndicator;
                }
            }).catch((error) => {

            });
        },
        isRequired(value) {
            return this.$helper.isRequired(value);
        },
        newStatusSelected(value, option){
            this.$store.dispatch("addStatusOnTask", {id: this.$route.params.taskID, status_id: value}).then((response) => {
            }).catch((error) => {

            });
        },
        getTaskAndStatuses(){
            Promise.all([this.$store.dispatch("getTaskById", this.$route.params.taskID), this.$store.dispatch("getStatuses")]).then((response) => {
                this.currentTask = response[0].data;
                response[1].data.forEach((statusObj) => {
                    this.statusesMultiselectObj.options.push({
                        value: statusObj.id,
                        label: statusObj.name,
                    });
                });
                this.statusesMultiselectObj.value = this.currentTask.status.id;
            });
        },
        checkInputNumberIDValRequired(value){
            return this.$helper.checkInputNumberIDValRequired(value);
        },
    },
}
</script>
<style lang="scss" scoped>
.task-info-section{
    max-width: 715px;
    width: 100%;
    .task-details-ul-grid-wrapper{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 40px;
        align-items: center;
        justify-items: start;
        grid-auto-flow: column;
        .task-details-employee-img{
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }
    }
}
.task-info-comments-section{
    display: flex;
    flex-direction: column;
    padding: 40px 45px;
    background-color: var(--middle-beige);
    width: 100%;
    max-width: 741px;
    row-gap: 66px;
}
.comment-count-indicator{
    display: flex;
    align-items: center;
    padding: 0 11px;
    background-color: var(--primaryMagenta);
    border-radius: 30px;
    color: var(--main-background-color);
}

</style>