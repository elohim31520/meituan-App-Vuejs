<template lang='pug'>
    .star
        .starItem(v-for='star in star_items',:class='star') 
</template>

<script>
const LENGTH = 5;
const cls_on = 'on';
const cls_half= 'half';
const cls_off = 'off'

export default {
    props:{
        score:{
            type: Number
        }
    },
    computed:{
        star_items(){
            let result = [];
            let score = Math.floor(this.score*2)/2;
            let hasDecimal= this.score%1 !=0; //半星控制
            let integer = Math.floor(this.score); 
            //全星
            for(var i=0;i<integer;i++){
                result.push(cls_on)
            }
            //半星
            if(hasDecimal){
                result.push(cls_half)
            }
            //補灰星
            while(result.length<LENGTH){
                result.push(cls_off)
                
            }
            return result;
        }
    }
}
</script>

<style lang='sass'>
.star
    display: flex
    align-items: center
.starItem   
    width: 15px
    height: 15px
    margin-right: 3px
    background-repeat: no-repeat
    background-size: 10px 10px
    &:last-child
        margin-right: 0
    &.on
        background-image: url('./star24_on@2x.png')
    &.half
        background-image: url('./star24_half@2x.png')
    &.off
        background-image: url('./star24_off@2x.png')
</style>
