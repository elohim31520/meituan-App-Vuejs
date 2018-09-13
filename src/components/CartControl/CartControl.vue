<template lang='pug'>
    .cartControl
        transition(name='scrollToFade')
            //- @click.stop.prevent 防止事件冒泡
            .cart-decrease.icon-remove_circle_outline(@click.stop.prevent='decreaseCount', v-if='food.count')
        .cart-count(v-show='food.count') {{food.count}}
        .cart-add.icon-add_circle(@click.stop.prevent='addCount')
</template>

<script>
import Vue from 'vue'

export default {
    props:{
        food:{
            type: Object,
            default: ''

        }
    },
    methods:{
        decreaseCount(){
            this.food.count--
        },
        addCount(){
            if(!this.food.count){
                Vue.set(this.food,'count',1)
            }else{
                this.food.count++
            }
        }
    }
}
</script>

<style lang='sass'>
$color_yellow: #ffd161

.cartControl
    display: flex
    justify-content: space-between
    align-items: center
    .cart-decrease, .cart-count, .cart-add
        width: 26px
        height: 26px
        line-height: 26px
        font-size: 26px
    .cart-decrease
        color: #b4b4b4
    .cart-add
        color: $color_yellow
        
    .cart-count
        font-size: 16px
        text-align: center


.scrollToFade-enter-active, .scrollToFade-leave-active
    transition: all 0.5s

.scrollToFade-enter, .scrollToFade-leave-to
    transform: translateX(100%) rotate(180deg)

</style>
