<template lang='pug'>
    transition(name='food_detail')
        .food-wrapper(v-show='isViewShow',ref='foodView')
            .bscroll-content-wrapper
                .icon-wrapper
                    //- 關閉按鈕
                    .close-bt.icon-close(@click='closeView')
                    img.icon_img(src='./more.png')
                    img.icon_img(src='./share.png')
                //-圖片 
                .img-wrapper
                    img.food-img(:src='food.picture')
                //- 文字介紹
                .food-content-wrapper
                    h2 {{food.name}}
                    p {{food.month_saled_content}}
                    img.img-recommand(v-if='food.product_label_picture',:src='food.product_label_picture')
                    br(v-if='food.product_label_picture')
                    .span-and-select-btn-wrapper
                        span#red {{food.min_price}}
                        span / {{food.unit}}
                        .CartControl-wrapper
                            CartControl(:food='food')
                        .select-btn(@click='showCarControl',v-show='!food.count') 選擇商品
                SplitLine
                //- 評價頁title
                .rating-title-wrapper(v-if='food.rating')
                    span.rating {{food.rating.title}}
                    span {{food.rating.like_ratio_desc}}
                    span {{food.rating.like_ratio}}
                    span {{food.rating.snd_title}}
                //- 評論ul
                ul(v-if='food.rating.comment_list')
                    li(v-for='(comment,index) in food.rating.comment_list', :key='index')
                        .comment-img-wrapper
                            //- 大頭貼
                            img(:src='comment.user_icon')
                        //- 評論
                        .comment-wrapper
                            .comment-header
                                .comment-title {{comment.user_name}}
                                .comment-time {{comment.comment_time}}
                            .comment-body
                                p {{comment.comment_content}}

</template>


<script>
import CartControl from '../CartControl/CartControl'
import Vue from 'vue'
import Bscroll from 'better-scroll'

export default {
    data() {
        return {
            isViewShow: false
        }
    },
    components: {
        CartControl,
    },
    props: {
        food:{
            type: Object,
            default: ''
        }
    },
    methods: {
        showView() {
            this.isViewShow = true

            this.$nextTick(function(){
                if(!this.scroll){
                this.scroll = new Bscroll(this.$refs.foodView,{
                    scrollY: true,
                    click: true,
                    bounce: {
                        top: true,
                        bottom: true
                    },
                    probeType: 3,
                })
                }else{
                    this.scroll.refresh()
                }
            }) 
        },
        closeView() {
            this.isViewShow = false
        },
        showCarControl() {
            Vue.set(this.food,'count',1)
        }

    }

}
</script>

<style lang='sass'>
@mixin flexCenter
    display: flex
    justify-content: center

.food-wrapper
    position: fixed
    left: 0
    top: 0
    bottom: 51px
    background-color: #fff
    z-index: 90
    width: 100%
    overflow: hidden
    
    // 頂端icon
    .icon-wrapper
        display: flex
        padding: 1rem
        .close-bt.icon-close, .icon_img
            width: 30px
            height: 30px

        .close-bt.icon-close
            text-align: center
            border-radius: 50%
            color: #eee
            background: #7f7f7f
            line-height: 30px
            cursor: pointer
            margin-right: auto

        .icon_img
            margin-right: 0.5rem

    // 商品圖片
    .img-wrapper
        display: flex
        justify-content: center
        
        img.food-img
            width: 100%
            height: 90%
            max-width: 400px    
    // 文字詳情
    .food-content-wrapper
        padding-left: 1rem

        h2, p , span
            margin: 5px
        h2
            color: #333
            font-size: 22px
        p
            color: #9d9d9d
            font-size: 12px
        // 推薦小圖
        .img-recommand
            height: 16px

        .span-and-select-btn-wrapper
            display: flex
            position: relative       
            margin-bottom: 1rem    

            span
                font-size: 12px
                color: #9d9d9d
                &:nth-child(2)
                    margin-right: auto
                &#red 
                    color: #fb4e44
                    font-size: 18px

            .CartControl-wrapper
                position: absolute
                right: 1rem

            .select-btn
                background-color: #ffd161
                width: 75px
                font-size: 12px
                margin-right: 12px
                border-radius: 15px
                color: #fff
                z-index: 20
                text-align: center
                line-height: 2rem
                cursor: pointer
    // 評價title
    .rating-title-wrapper
        width: 100%
        display: flex
        height: 50px
        border-bottom: 1px solid #f4f4f4
        span
            line-height: 50px
            margin-left: 20px
            color: #333
            font-weight: 900

            &:nth-child(2)
                font-size: 12px

            &:nth-child(3)
                margin-right: auto
                color: #fb4e44
                font-size: 12px
            &:nth-child(4)
                font-size: 18px
                color: #9d9d9d
                margin-right: 20px

    ul
        li
            display: flex

            .comment-img-wrapper
                flex: 0 0 75px

                img
                    width: 50px
                    height: 50px
                    border-radius: 50%

                
            .comment-wrapper
                flex: 1
                margin-right: 1.5rem
                margin-bottom: 2rem
                border-bottom: 2px solid #f4f4f4

                .comment-header
                    display: flex

                    .comment-title
                        margin-right: auto

                    

.food_detail-enter-active, .food_detail-leave-active
    transition: 1s
    

.food_detail-enter, .food_detail-leave-to
    transform: translateX(100%)
    opacity: 0 
</style>
