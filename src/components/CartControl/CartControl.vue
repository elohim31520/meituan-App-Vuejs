<template lang='pug'>
    .cartControl
        transition(name='scrollToFade')
            .cart-decrease.icon-remove_circle_outline(@click='decreaseCount', v-show='food.count')
        .cart-count {{food.count}}
        .cart-add.icon-add_circle(@click='addCount')
</template>

<script>
import Vue from 'vue'

export default {
    props:{
        food:{
            type: Object

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
    position: absolute
    bottom: -5px 
    right: -5px  
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
    transform: translateX(52px) rotate(180deg)

</style>
