<template lang='pug'>
    .header
        // 頂部
        .top-wrapper
            .back-wrapper
                span.icon-arrow_lift
            //*搜尋欄
            .serch-wrapper
                .serch-icon
                input(type='text',placeholder="搜索店內商品") 
            //更多按鍵ooo    
            .more-wrapper 
                a.spelling-bt(href='#') 拼單
                .more-bt
                    i.s-radius
                    i.s-radius
                    i.s-radius
        //麥當勞圖標 收藏欄            
        .content-wrapper
            .icon( :style='head_bg')
            .name
                h3 {{poiInfo.name}}
            .collect
                img(src='./star.png')
                h4 收藏

        //公告欄        
        .bulletin-wrapper
            img(v-if='poiInfo.discounts2[0].icon_url' ,:src='poiInfo.discounts2[0].icon_url')
            p {{poiInfo.discounts2[0].info}}
            .detail(@click='showBulletin()') {{poiInfo.discounts2.length}}個活動
            span.icon-keyboard_arrow_right(@click='showBulletin()')
        //header滿版背景圖片    
        .bg-wrapper( :style='content_bg')
        // 滿版詳情頁
        transition(name='detail')
            .bulletin-detail(v-show='isShow')
                .detail-wrapper 
                    .main-wrapper(:style='detail_bg')
                        .icon(:style='head_bg')
                        h3 {{poiInfo.name}}
                        .score
                            Star(:score='poiInfo.wm_poi_score')
                            span {{poiInfo.wm_poi_score}}
                        .tip 
                            p {{poiInfo.shipping_fee_tip}} |
                            p {{poiInfo.min_price_tip}} |
                            p {{poiInfo.delivery_time_tip}}
                        p.time 配送時間{{poiInfo.shipping_time}}  
                        .discounts
                            img(v-if='poiInfo.discounts2[0].icon_url' ,:src='poiInfo.discounts2[0].icon_url')
                            p {{poiInfo.discounts2[0].info}}
                    .close-wrapper(@click='showBulletin()')
                        .icon-close



</template>

<script>
//導入star組件
// import Star from '../Star/Star';
import Star from '../Star/Star';

export default {
    data(){
        return {
            isShow: false,
        }
    },
    components:{
        Star
    },
    props:{
        poiInfo :{
            type: Object,
            default: () => []

        }        
    },
    computed:{
        content_bg(){
            return `background-image: url(${this.poiInfo.head_pic_url})` ;
        },
        head_bg(){
            return `background-image: url(${this.poiInfo.pic_url})` ;
        },
        detail_bg(){
            return `background-image: url(${this.poiInfo.poi_back_pic_url})` ;
        }
    },
    methods:{
        showBulletin(){
            this.isShow = !this.isShow;
        }
    }
};
</script>

<style lang="sass">
@import url('../../common/styles/icon.css')

@mixin size($w,$h:$w)
    width: $w
    height: $h
@mixin flexCenter
    display: flex
    align-items: center
    justify-content: center    
html,body
    position: relative
    +size(100%)
    margin: 0
    padding: 0

.header
    // height: 160px
    padding-top: 20px
    .top-wrapper
        width: 100%
        display: flex
        align-items: center
        .back-wrapper
            +size(50px,31px)
            text-align: center
            line-height: 31px           
            .icon-arrow_lift
                color: #fff
                               
        .serch-wrapper
            width: 100%
            height: 31px
            padding: 0 24px 0 21px
            box-sizing: border-box
            // flex: 1
            .serch-icon
                width: 28px
                height: 31px
                background: url('./titans_h5_search@2x.png') no-repeat 11px center
                position: absolute
                background-size: 13px
            input
                width: 100%
                height: 31px
                border: 0
                background-color: #cdcdcc
                border-radius: 25px
                padding-left: 28px
                outline: none
                
        .more-wrapper
            // float: right
            +size(100px,31px)
            padding: 7px 10px 0 24px
            display: flex
            align-items: center
            .spelling-bt
                // color: white
                width: 30px
                height: 17px
                border: 1px solid #eee
                text-align: center
                text-decoration: none
                font-size: 10px
                color: #eee
                // padding: 5px
            .more-bt
                width: 20px
                height: 24px
                margin-left: 13px
                
                .s-radius
                    width: 3px
                    height: 3px
                    border-radius: 50%
                    border: 1px solid #eee
                    display: inline-block
                    text-align: center

    // 設置背景圖片 
    .bg-wrapper
        position: absolute
        +size(100%,160px)
        top: 0
        left: 0
        z-index: -1        
        background-size: 100% 135%
        background-position: center -12px
        
    .content-wrapper
        height: 50px
        padding: 17px 0px 11px 10px 
        display: flex
        color: white
        .icon
            +size(50px)
            background-size: 135% 100%
            background-position: center 
            border-radius: 5px
            
        .name
            padding: 0 18px
            flex: 8
            h3
                font-size:  16px
                font-weight: bold
                // color: white
        .collect          
            display: flex
            flex-direction: column
            align-items: center
            flex: 2
            img
                +size(25px)
            h4
                margin: 0
                padding: 5px
                font-size: 14px
    .bulletin-wrapper
        height: 16px
        padding: 0 
        display: flex
        align-items: center
        color: #eee  
        img
            +size(16px)
            margin-right: 3px
        p ,.detail ,.icon-keyboard_arrow_right
            font-size: 12px
            text-align: center
            margin-right: 12px
        .detail
            margin-right: 0 
            cursor: pointer     
    //滿版的公告欄        
    .bulletin-detail
        +size(100%)
        position: absolute
        background-color: rgba(98,98,98,0.8)
        top: 0        
        color: #eee
        
        .detail-wrapper 
            +size(100%)
            box-sizing: border-box           
            padding: 43px 20px 115px
            display: flex
            flex-direction: column
            align-items: center
            .main-wrapper
                +size(100%)
                background-size: 100% 100%
                display: flex
                flex-direction: column
                align-items: center
                border-radius: 5px
                //星星組件
                .score
                    display: flex
                    span
                        margin-left: 3px
                .tip
                    width: 100%
                    display: flex
                    justify-content: center
                    p 
                        margin-right: 7px
                .icon
                    +size(60px)
                    background-size: 135% 100%
                    background-position: center
                    border-radius: 5px
                    margin-top: 40px
                p
                    font-size: 15px
                    margin-top: 13px
                    color: #bababc
                .discounts
                    margin-top: 20px
                    padding-top: 10px
                    border-top: 1px solid #eee
                    display: flex
                    align-items: center
                    img
                        +size(16px)
                    p 
                     font-size: 11px
                     line-height: 16px 
                     margin-left: 10px   
            .close-wrapper
                +size(40px,45px)
                box-sizing: border-box
                border-radius: 50%
                border: 1px solid rgba(140,140,140,0.9)
                background-color: rgba(118,118,118,0.7)
                +flexCenter
                margin: 20px
                cursor: pointer
                .icon-close
                    font-size: 18px
//transition效果
.detail-enter-active,  .detail-leave-active                       
    transition: 0.5s all
    
.detail-enter,  .detail-leave-to 
    opacity: 0
    transform: scale(0.1)
// .detail-enter-to,  .detail-leave
//     opacity: 1                     
</style>