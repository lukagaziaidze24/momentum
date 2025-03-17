<template>
    <div class="container">
        <headerComponent/>
        <router-view/>
    </div>
    <primaryModalComponent :showModal="showModal" maxHeight="781px" maxWidth="1000px" @closeModal="triggerModal">
        <template v-slot:modal-content>
        </template>
    </primaryModalComponent>
</template>
<style lang="scss" scoped>
</style>
<script>
import headerComponent from './headerComponent.vue';
import primaryModalComponent from './primaryModalComponent.vue';
import { mapGetters } from 'vuex';
export default {
    data(){
        return{
            showModal: false,
        }
    },
    components: {
        headerComponent,
        primaryModalComponent,
    },
    computed: {
        ...mapGetters({
            isMainModalOpen: "getIsMainModalOpen",
        })
    },  
    watch:{
        isMainModalOpen: {
            handler(newVal){
                this.showModal = newVal;
            },
        },
    },
    methods: {
        triggerModal(val){
            this.$store.state.isMainModalOpen = val;
        }
    }
}
</script>