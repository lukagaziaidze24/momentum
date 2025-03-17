<template>
    <div ref="filterContainer" class="filter-container d-flex flex-column align-items-stretch standard-text-size">
        <div class="header-buttons-wrapper d-flex align-items-center justify-content-between">
            <button v-for="(data, i) of buttonsArr" @click="openLowPart(data)" :class="[{'chosen': data.isChosen}, 'commmon-transition', 'd-flex', 'align-items-center', 'gap-1']">
                {{ data.content }}
                <img v-if="data.isChosen" src="@\assets\images\filters\Icon.svg" alt="arrow">
                <img v-else src="@\assets\images\filters\light_arrow.svg" alt="arrow">
            </button>
        </div>
        <div class="moving-component-grid-wrapper commmon-transition w-100 br-10">
            <div class="moving-component-content-wrapper commmon-transition">
                <slot name="bodyContent">

                </slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            chosenBtnObj: null,
        }
    },
    props: {
        buttonsArr: {
            type: Array,
            default: [],
        },
        closeTrigger: false,
    },
    watch: {
        closeTrigger(){
            this.$refs.filterContainer.classList.remove("active");
            this.chosenBtnObj.isChosen = false;
            this.chosenBtnObj = null;
            setTimeout(() => {
                this.$emit("chosenBtnObj", this.chosenBtnObj);
            }, 300);
        }
    },
    methods: {
        openLowPart(chosenBtnObj){
            console.log(this.chosenBtnObj);
            console.log(chosenBtnObj);
            
            if(this.chosenBtnObj?.content == chosenBtnObj.content && this.chosenBtnObj?.isChosen == true){
                this.$refs.filterContainer.classList.remove("active");
                this.chosenBtnObj.isChosen = false;
                this.chosenBtnObj = null;
                setTimeout(() => {
                    this.$emit("chosenBtnObj", this.chosenBtnObj);
                }, 300);
            }else{
                if(this.chosenBtnObj){
                    this.chosenBtnObj.isChosen = false;
                }
                this.chosenBtnObj = chosenBtnObj;
                this.chosenBtnObj.isChosen = true;
                this.$refs.filterContainer.classList.add("active");
                this.$emit("chosenBtnObj", this.chosenBtnObj);
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.filter-container{
    position: relative;
    max-width: 688px;
    width: 100%;
    margin-bottom: 79px;
    &.active{
        .moving-component-grid-wrapper{
            grid-template-rows: 1fr;
            border-color: var(--primaryMagenta);
            background-color: var(--main-background-color);
            .moving-component-content-wrapper{
                padding: 30px 40px;
            }
        }
    }
    .header-buttons-wrapper{
        border: 1px solid var(--extra-light-gray);
        border-radius: 10px;
    }
    button{
        padding: 12px 18px;
        color: var(--middle-black);
    }
    button.chosen{
        color: var(--primaryMagenta);
    }
    .moving-component-grid-wrapper{
        display: grid;
        grid-template-rows: 0fr;
        margin-top: -2px;
        position: absolute;
        top: 100%;
        background-color: transparent;
        border: 1px solid transparent;
    }
    .moving-component-content-wrapper{
        grid-row: 1 / span 2;
        overflow: hidden;
        padding: 0 40px;
    }
}
.commmon-transition{
    transition: all 0.3s ease-out;
}
</style>