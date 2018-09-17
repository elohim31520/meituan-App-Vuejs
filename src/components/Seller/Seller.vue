<template lang='pug'>
    .seller
        //-滾動層 
        .seller-wrapper
            SplitLine
            //- 賣家詳情
            .seller-wrapper-detail
                .seller-address 
                    .seller-address-location
                    .seller-address-text {{seller.address}}
                    .seller-address-phone

                .seller-pic(ref='picView')
                    ul(v-if='seller.poi_env', ref='picList')
                        li(v-for='pic in seller.poi_env.thumbnails_url_list',ref='picItems')
                            img(:src="pic")

                .seller-safe
                    .seller-safe-logo
                    .seller-safe-text 察看食品安全檔案

            SplitLine   
            //- 外送區塊
            .tip-wrapper
                .tip-delivery
                    .tip-logo1
                    .tip-text 配送服務 : {{seller.app_delivery_tip}}
                .tip-shipping
                    .tip-logo2
                    .tip-text 配送時間 : {{seller.shipping_time}}

            SplitLine
            //- 商家服務區塊
            .server-wrapper
                .server(v-for='item in seller.poi_service')
                    .server-logo
                    .server-text 商家服務 
                    img(:src="item.icon")
                    span {{item.content}}

                .server-discount(v-for='item in seller.discounts2')
                    img(:src='item.icon_url')
                    .server-discount-text {{item.info}}

            SplitLine.bottom

</template>

<script>
import Bscroll from 'better-scroll'

export default {
    data() {
        return {
            seller: {}
        }
    },
    async mounted() {
        let response = await this.axios.get('/api/seller')
        this.seller = response.data.data

        // init Bscroll
        let vobj =this
        this.$nextTick(() => {
            let imgWidth =  vobj.$refs.picItems[0].clientWidth
            let marginRight = 16
            let width = (imgWidth + marginRight) *  vobj.seller.poi_env.thumbnails_url_list.length
            vobj.$refs.picList.style.width = width+'px'

            if(!vobj.scroll){
                vobj.scroll = new Bscroll(vobj.$refs.picView,{
                    scrollX: true,
                    click: true,
                    bounce: {
                        left: true,
                        right: true
                    },
                    probeType: 3,
                })
            }else{
                vobj.scroll.refresh()
            }
        })
        
    }
};
</script>

<style lang='sass'>
@mixin bgiCenter
    background-size: 14px 16px
    width: 40px
    height: 40px
    background-repeat: no-repeat
    background-position: center


.seller
    position: absolute
    left: 0
    top: 214px
    width: 100%
    bottom: 0px
    font-size: 14px

    .seller-wrapper
        width: 100%
        position: relative

        .seller-wrapper-detail
            margin: 1rem
            

            .seller-address
                width: 100%
                display: flex
                margin: 1rem 0

                .seller-address-location
                    flex: 0 0 40px
                    background-image: url('./address.png')
                    +bgiCenter
                    
                
                .seller-address-text
                    flex: 1
                    line-height: 19px

                .seller-address-phone
                    flex: 0 0 60px
                    background-image: url('./phone.png')
                    +bgiCenter
                    background-size: 18px 18px
                    
            // 圖片列表
            .seller-pic
                overflow: hidden

                ul
                    padding: 0
                    display: inline-flex
                    list-style: none

                    li
                        width: 95px
                        height: 75px
                        margin-right: 1rem

                        img
                            width: 100%
                            height: 100%
                            border-radius: 2px

            .seller-safe
                display: flex

                .seller-safe-logo
                    flex: 0 0 40px
                    background-image: url('./safety.png')
                    +bgiCenter

                .seller-safe-text
                    flex: 1
                    line-height: 40px
                    color: #666
                    position: relative

                    &:after
                        display: block
                        content: '>'
                        position: absolute
                        right: 0
                        top: 0
                        transform: scaleY(1.5)
                        color: #666
        // 配送區塊
        .tip-wrapper
            margin: 1rem

            .tip-delivery
                display: flex

                .tip-logo1
                    flex: 0 0 40px
                    background-image: url('./delivery.png')
                    +bgiCenter

                .tip-text
                    color: #666
                    line-height: 40px
                    flex: 1

            .tip-shipping
                display: flex

                .tip-logo2
                    flex: 0 0 40px
                    background-image: url('./delivery.png')
                    +bgiCenter

                .tip-text
                    color: #666
                    line-height: 40px
                    flex: 1

        // 服務區塊
        .server-wrapper
            margin: 1rem

            .server
                display: flex
                align-items: center
                border-bottom: 1px solid #f4f4f4

                .server-logo
                    flex: 0 0 40px
                    background-image: url('./server.png')
                    +bgiCenter

                .server-text
                    line-height: 40px
                    margin-right: 1rem

                img
                    width: 14px
                    height: 14px
                    margin-right: 11px

            .server-discount
                margin: 1rem 0 2rem 0
                display: flex


                img
                    width: 14px
                    height: 14px
                    margin-right: 11px
                
                .server-discount-text
                    color: #666
                    flex: 1

        .bottom
            height: 100px
</style>
