<template lang='pug'>
    .shopping-cart
        <!--highlight class 為有商品選擇時的樣式改變-->
        .content-left(:class='{"highlight": totalCount}')
            .logo-wrapper
                .icon-shopping_cart
                .total_num(v-show='totalCount') {{totalCount}}
            p 另須{{shipping_fee_tip}}
        .content-right-btn(:class='{"highlight": totalCount}')
            p {{ totalCount? '去結帳' :min_price_tip }}

</template>

<script>
export default {
    props:{
        shipping_fee_tip:{
            type: String,
            default: ''
        },
        min_price_tip:{
            type: String,
            default: ''
        },
        selectedFood:{
            type: Array
        }
    },
    computed:{
        // logo裡面紅色圈圈總數計算
        totalCount(){
            let total=0
            this.selectedFood.forEach((obj) => {
                
                total+= obj.count
            });
            return total
            }
    }
}
</script>

<style  lang='sass'>
$color_red: #ed3131
$color_yellow: #ffd161

.shopping-cart
    width: 100%
    height: 51px
    background-color: #514f4f
    position: fixed
    bottom: 0
    z-index: 50
    display: flex

    // 左邊區塊
    .content-left
        display: flex
        align-items: center
        flex: 1
        transition: 0.5s

        // 購物車logo
        .logo-wrapper
            height: 100%
            width: 51px
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
                width: 1rem
                height: 1rem
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
            .icon-shopping_cart
                color: #222
            p
                color: #eee
                
        // 這個P是另須配送費的區塊
        p
            margin-left: calc(61px + 1rem)
            font-size: 18px
            color: #bab9b9      
            font-family: "微軟正黑體"

    //右邊結帳區塊 
    .content-right-btn
        flex: 0 0 110px
        font-size: 1rem
        color: #bab9b9
        display: flex
        align-items: center
        justify-content: center
        transition: 0.5s
        p
            font-size: 18px
            color: #bab9b9      
            font-family: "微軟正黑體"

        // 有商品選擇時的樣式
        &.highlight
            background-color: $color_yellow
            
            p
                color: #222
                font-weight: 900
                
</style>
