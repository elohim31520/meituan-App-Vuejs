<template lang='pug'>
    .shopping-cart
        <!--highlight class 為有商品選擇時的樣式改變-->
        .content-left(:class='{"highlight": totalCount}')
            .logo-wrapper(@click='showList')
                .icon-shopping_cart
                .total_num(v-show='totalCount') {{totalCount}}
            .fee_wrapper
                h3(v-if='feeTotal') $ {{feeTotal}}
                p 另須{{poiInfo.shipping_fee_tip}}
        .content-right-btn(:class='{"highlight": totalCount}')
            p {{ totalCount? '去結帳' : poiInfo.min_price_tip }}

        <!--購物車清單頁面-->
        transition(name='showUp')
            .shoppingCart_list(v-show='isShow')
                .list_mist(@click='closeShowing')
                .list_top {{poiInfo.discounts2[0].info}}
                .list_head
                    .pocket 1號清單
                    .clear_all(@click='removeAll') 清空購物車
                        img(src='./ash_bin.png')
                .list(ref='listContent')
                    ul
                        li(v-for='item in selectedFood')
                            h3 {{item.name}}
                            .price 
                                p  $ {{item.min_price}}
                            CartControl(:item='food')
                .list_bottom

</template>

<script>
import CartControl from "../CartControl/CartControl"
import bscroll from 'better-scroll'

export default {
    data(){
        return{
            isShow: false
        }  
    },
    props:{     
        poiInfo:{
            type: Object,
            default: ''
        },
        selectedFood:{
            type: Array
        }
    },
    components:{
        CartControl
    },
    computed:{
        // logo裡面紅色圈圈總數計算
        totalCount(){
            let total=0
            this.selectedFood.forEach((obj) => {
                
                total+= obj.count
            });
            return total
        },
        feeTotal(){
            let total = 0
            this.selectedFood.forEach((food)=>{
                total+= food.count * food.min_price
            })
            return total
        }
    },
    methods:{
        showList(){
                if( this.totalCount !== 0){
                    this.isShow = !this.isShow 
                }
                

            if(this.isShow == true){
                this.$nextTick(()=>{
                    if(!this.listScroll){
                        this.listScroll = new bscroll(this.$refs.listContent,{
                            click: true
                        })
                    }else{
                        this.listScroll.refresh()
                    }
                })
            }
        },
        removeAll(){
            // this.selectedFood = []

            this.selectedFood.forEach((food)=>{
                food.count=0
            })
        },
        closeShowing(){
            this.isShow = false
        }
    }
}
</script>

<style  lang='sass'>
$color_red: #ed3131
$color_yellow: #ffd161
$color_grey: #646158

@mixin size($w,$h:$w)
    width: $w
    height: $h
*
    font-family: sans-serif, "微軟正黑體"

.shopping-cart
    +size(100%,51px)
    background-color: #514f4f
    position: fixed
    bottom: 0
    display: flex

    // 左邊區塊
    .content-left
        display: flex
        align-items: center
        flex: 1
        transition: 0.5s
        z-index: 98
        // 購物車logo
        .logo-wrapper
            +size(51px,100%)
            border-radius: 50%
            background-color: #666
            position: absolute
            left: 10px
            top: -14px
            position: relative
            .icon-shopping_cart
                font-size: 2rem
                text-align: center
                transform: translateY(calc(50% - 0.5rem))
                color: #fff

            //紅色小圈圈-商品總數
            .total_num
                +size(1rem)
                border-radius: 50%
                background-color: $color_red
                position: absolute
                top: 0
                right: -3px
                color: #eee
                font-size: 5px
                text-align: center

        // 有商品選擇時的樣式
        &.highlight
            background-color: #222
            .logo-wrapper
                background-color: $color_yellow
            .fee_wrapper
                h3
                    color: #eee
                    margin: 0
                p
                    color: #eee
                    font-size: 12px
                    margin: 0
            .icon-shopping_cart
                color: #222
            p
                color: #eee
                
        .fee_wrapper
            margin-left: 20px
            p
                font-size: 18px
                color: #bab9b9      
                

    //右邊結帳區塊 
    .content-right-btn
        flex: 0 0 110px
        font-size: 1rem
        color: #bab9b9
        display: flex
        align-items: center
        justify-content: center
        transition: 0.5s
        z-index: 98
        p
            font-size: 18px
            color: #bab9b9      

        // 有商品選擇時的樣式
        &.highlight
            background-color: $color_yellow
            
            p
                color: #222
                font-weight: 900

    .shoppingCart_list
        position: absolute 
        top: 0
        left: 0
        width: 100%
        transform: translateY(-100%)
        z-index: 97

        &.noShow
            display: none

        .list_mist      
            background-color: rgba(7,17,27,0.6)   
            +size(100%,720px)

        .list_top
            +size(100%,30px)
            background-color: #f3e6c6
            font-size: 10px
            color: $color_grey
            text-align: center
            padding-top: 10px

        .list_head
            +size(100%,30px)
            background-color: #f4f4f4
            display: flex
            justify-content: space-between
            color: $color_grey
            .pocket
                flex: 2
                border-left: 4px solid $color_yellow
                padding-top: 5px
                padding-left: 5pxcls

            .clear_all
                flex: 1
                display: flex
                align-items: center
                flex-direction: row-reverse
                // vertical-align: center
                img
                    +size(30px)

        .list
            +size(100%,360px)
            background-color: #fff
            overflow: hidden
            ul
                list-style: none
                margin: 0
                padding: 0
                li
                    +size(100% , 80px)
                    display: flex
                    align-items: center
                    position: relative
                    border-bottom: 1px solid #f4f4f4
                    color: $color_grey
                    h3
                        margin-left: 20px
                        font-size: 1rem
                        flex: 0 0 35%
                    .price 
                        position: absolute
                        left: 40%
                        display: flex
                        align-items: center
                        margin-left: 10%
                        p
                            margin: 0
                            
                        &:before
                            content: ''
                            display: block
                            +size(2px, 20px)
                            background-color:  $color_yellow
                            
.showUp-enter-active, .showUp-leave-active
    transition: all 0.5s
.showUp-enter, .showUp-leave-to
    opacity: 0

</style>
