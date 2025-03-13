<template>
    <header class="header-wrapper d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-1">
            <p class="header-title">Momentum</p>
            <img src="@/assets/images/header/Hourglass.svg" alt="img">
        </div>
        <div class="d-flex align-items-stretch gap-2 standard-text-size">
            <button class="common-blue-border-button">
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
    }
}
</script>
<style lang="scss" scoped>
.header-wrapper{
    padding: 31px 120px;
    .header-title{
        font-family: "fredoka-400", Helvetica, Arial, sans-serif;
        font-weight: 600;
        font-size: 31px;
        color: var(--primaryMagenta);
    }
}
</style>