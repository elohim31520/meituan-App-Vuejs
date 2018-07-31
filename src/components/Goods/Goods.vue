<template lang="pug">
    .goods-wrapper
        <!--左邊菜單menu-->
        .menu 
            ul
                li
                    img(:src='container.tag_icon' v-if='container.tag_icon')
                    p {{container.tag_name}}

                li(v-for='item in goods')
                    img(:src='item.icon' v-if='item.icon')
                    p {{item.name}}
                        
        <!--右邊商品列表-->
        .goods
            ul
                <!--專場圖片-->
                li.sell-pic
                    div(v-for='item in container.operation_source_list')
                        img(:src='item.pic_url')

                <!--商品分類-->
                li(v-for='item in goods')
                    h3.main {{item.name}}
                    ul
                        li(v-for='food in item.spus').category
                            <!--左商品圖片-->
                            .food-pic(:style='bg_gen(food.picture)')
                            <!--右商品資訊-->
                            .food-content
                                h3 {{food.name}}
                                p(v-if='food.description') {{food.description}}
                                .extra
                                    .saled {{food.month_saled_content}}
                                    .praise {{food.praise_content}}
                                img(:src='food.product_label_picture' v-if='food.product_label_picture')
                                div
                                    .text ¥{{food.min_price}} / 
                                    .unit {{food.unit}} 


</template>

<script>
import bscroll from 'better-scroll'

export default {
    data(){
        return{
            container:{},
            goods:[]
        }
        
    },
    mounted(){//發起異步請求獲取數據
        var vobj = this;    

        this.axios.get('/api/goods')
        .then((res)=>{
                let dataSource= res.data
            if(res.status == 200){
                vobj.container = dataSource.data.container_operation_source;
                vobj.goods= dataSource.data.food_spu_tags
                
            };
        
        }).catch((err)=>{console.log(err+'失敗')});
    },
    methods:{
        bg_gen(imgName){
            return `background-image: url('${imgName}')`
        }
    }
};
</script>

<style lang="sass">
@mixin size($w,$h:$w)
    width: $w
    height: $h
@mixin flexCenter
    display: flex
    align-items: center
    justify-content: center    

.goods-wrapper
    display: flex
    width: 100%
    position: absolute
    top: 211px
    bottom: 51px
    overflow: hidden
    .menu
        flex: 0 0 85px
        background-color: #f4f4f4
        ul
            padding: 0
            margin: 0
        li
            display: flex
            align-items: center
            margin: 0
            border-bottom: 1px solid #e4e4e4
            padding: 16px 23px 15px 10px
            img
                +size(15px)
            p 
                color: #333
                font-size: 13px
                line-height: 17px
                -webkit-line-clamp: 2
                display: -webkit-box
                -webkit-box-orient: vertical
                overflow: hidden
    .goods
        flex: 1
        ul
            margin: 0
            padding: 0
        li
            list-style: none
            padding: 11px
            &.sell-pic
                margin-bottom: 11px
                border-bottom: 1px solid #e4e4e4
                

                img
                    width: 100%
            h3
                font-size: 13px
                line-height: 14px
                &.main  
                    display: flex
                    align-items: center
                    &:before
                        display: block
                        content: ''
                        +size(5px,20px)
                        background-color: #F7BF58
                        margin-right: 7px  
            &.category
                display: flex
                padding: 0
                margin-bottom: 1.5rem
                align-items: center
                .food-pic
                    flex: 0 0 65px
                    background-position: center center
                    background-size: 120% 100%
                    height: 75px
                    margin-right: 11px
                .food-content
                    flex: 1
                    h3
                        color: #333
                        font-size: 16px
                        line-height: 21px
                    .extra
                        display: flex
                        font-size: 10px
                        color: #bfbfbf
                        .saled
                            margin-right: 14px
                            margin-bottom: 7px
                    img
                        width: 5rem
                        margin-bottom: 6px
                    div
                        display: flex
                        align-items: center
                        .text
                            color: #fb4e44
                            line-height: 14px
                            font-size: 1.2rem

            
</style>
