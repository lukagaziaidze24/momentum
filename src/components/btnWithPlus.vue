<template>
<button :class="['d-flex', 'align-items-center','btn-with-plus', {'has-plus': hasPlus}]">
    <img src="../assets/images/header/add.svg" alt="">
    <slot name="content">

    </slot>
</button>
</template>
<style lang="scss" scoped>
.btn-with-plus{
    color: var(--main-background-color);
    &.has-plus{
        background-color: var(--primaryMagenta);
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
        }
    }
}
</script>