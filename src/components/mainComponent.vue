<template>
    <div class="container">
        <headerComponent/>
        <router-view/>
    </div>
</template>
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
<script>
import headerComponent from './headerComponent.vue';
export default {
    components: {
        headerComponent,
    }
}
</script>