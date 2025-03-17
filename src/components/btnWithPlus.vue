<template>
<button :class="['d-flex', 'align-items-center','btn-with-plus', {'mode-2': mode2}]" :type="btnType">
    <img v-if="hasPlus" src="../assets/images/header/add.svg" alt="">
    <slot name="content">

    </slot>
</button>
</template>
<style lang="scss" scoped>
.btn-with-plus{
    color: var(--main-background-color);
    &.mode-2{
        border-radius: 20px;
    }
    padding: 10px 20px;
    border-radius: 5px;
    background-color: var(--primaryMagenta);
}
</style>
<script>
export default {
    props: {
        hasPlus: {
            type: Boolean,
            default: true,
        },
        mode2: {
            type: Boolean,
            default: false,
        },
        btnType: {
            type: String,
            default: "button",
        }
    }
}
</script>