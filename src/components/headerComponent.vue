<template>
    <header class="header-wrapper d-flex align-items-center justify-content-between">
        <router-link class="router-link d-flex align-items-center gap-1" to="/">
            <h1 class="header-title">Momentum</h1>
            <img src="@/assets/images/header/Hourglass.svg" alt="img">
        </router-link>
        <div class="d-flex align-items-stretch gap-2 standard-text-size">
            <button @click="openMainModal()" class="common-blue-border-button">
                თანამშრომლის შექმნა
            </button>
            <btnWithPlus>
                <template v-slot:content>
                    შექმენი ახალი დავალება
                </template>
            </btnWithPlus>
        </div>
    </header>
</template>
<script>
import btnWithPlus from './btnWithPlus.vue';
export default {
    components: {
        btnWithPlus,
    },
    methods: {
        openMainModal(){
            this.$store.state.isMainModalOpen = true;
        }
    }
}
</script>
<style lang="scss" scoped>
.header-wrapper{
    padding: 31px 0;
    .header-title{
        font-family: "fredoka-400", Helvetica, Arial, sans-serif;
        font-weight: 600;
        font-size: 31px;
        color: var(--primaryMagenta);
    }
}
</style>