<template>
    <div class="modal-background-container d-flex justify-content-center align-items-center" v-if="showModal">
        <div class="modal-content-wrapper br-10 d-flex flex-column common-scrollbar" :style="[{'--max-width': maxWidth}, {'--max-height': maxHeight}]">
            <img src="@\assets\images\modal\Cancel.svg" alt="Close" class="close-button align-self-end mb-4" @click="closeModal">
            <div class="slot-wrapper">
                <slot name="modal-content">
    
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props: {
        showModal: {
            type: Boolean,
            default: true,
        },
        maxWidth: {
            type: String,
            default: "846px",
        },
        maxHeight: {
            type: String,
            default: "781px",
        },
    },
    watch: {
        showModal(newVal){
            if(newVal){
                window.document.documentElement.style.overflowY = "hidden";
            }else{
                window.document.documentElement.style.overflowY = "auto";
            }
        }
    },
    methods: {
        closeModal(){
            this.$emit("closeModal", false);
        },
        closeModalFromBack(e){
            if(e.target.classList.contains("modal-background-container")){
                this.closeModal(false);
            }
        }
    }
}
</script>
<style scoped>
.modal-background-container{
    position: fixed;
    inset: 0;
    height: 100dvh;
    width: 100%;
    background: #0D0F1026;
    backdrop-filter: blur(10px);
    z-index: 120;
}
.modal-background-container > .modal-content-wrapper{
    max-width: var(--max-width);
    max-height: var(--max-height);
    width: 100%;
    height: 100%;
    background-color: var(--main-background-color);
    padding: 40px 50px;
    overflow-y: auto;
}
.close-button{
    cursor: pointer;
}
.slot-wrapper{
    padding-inline: 2em;
}
/* @media screen and (max-width: 1720px) {
    .modal-background-container > .modal-content-wrapper{
        max-width: calc(var(--max-width)*90/100);
        max-height: calc(var(--max-height)*90/100);
    }
}
@media screen and (max-width: 1560px) {
    .modal-background-container > .modal-content-wrapper{
        max-width: calc(var(--max-width)*80/100);
        max-height: calc(var(--max-height)*80/100);
    }
} */
</style>