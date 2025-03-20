<template>
    <div class="d-flex flex-column align-items-stretch">
        <div @click="toggleAccordion()">
            <slot name="accordionHead">

            </slot>
        </div>
        <div :class="['common-accoridon-body-grid-wrapper', 'commmon-transition-02', {'active': isOpen}]">
            <div class="moving-component-content-wrapper">
                <slot name="accordionBody">

                </slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isOpen: false,
        }
    },
    watch: {
        closeTrigger(){
            this.isOpen = false;
        }
    },
    props: {
        closeTrigger: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        toggleAccordion(){
            this.isOpen = !this.isOpen;
            this.$emit("openModeChange", this.isOpen);
        }
    }
}
</script>
<style lang="scss" scoped>
.common-accoridon-body-grid-wrapper{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0fr;
    &.active{
        grid-template-rows: 1fr;
    }
    .moving-component-content-wrapper{
        grid-row: 1 / span 2;
        overflow: hidden;
    }
}
</style>