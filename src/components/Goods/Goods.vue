<template lang="pug">
    .goods-wrapper
        <!--左邊菜單menu-->
        .menu(ref='menuScroll')
            ul
                <!--分類-->
                li(:class='{"click_active": currentIndex === 0 }', @click="scrollToEl(0)")
                    img(:src='container.tag_icon' v-if='container.tag_icon')
                    p {{container.tag_name}}

                li(v-for='(item,i) in goods' ,:class='{"click_active": currentIndex === i+1 }', @click="scrollToEl(i+1)")
                    img(:src='item.icon' v-if='item.icon')
                    p {{item.name}}
                    
                    <!--類別裡的紅色圈圈商品總數-->
                    .block_total_num(v-show='calcTotal(item.spus)') {{calcTotal(item.spus)}}
                        
        <!--右邊商品列表-->
        .goods(ref='goodsScroll')
            ul
                <!--專場圖片-->
                li.goodsInitHeight#sell-pic
                    div(v-for='item in container.operation_source_list')
                        img(:src='item.pic_url')

                <!--商品分類 goods為大分類，裡面又有細項分類-->
                li.goodsInitHeight(v-for='(item,i) in goods' )
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
                                div.tip
                                    .text ¥{{food.min_price}} / 
                                    .unit {{food.unit}}

                            <!--商品加減數量的組件-->
                            CartControl(:food='food')
        <!--購物車組件-->
        ShoppingCart(:shipping_fee_tip="poiInfo.shipping_fee_tip" , :min_price_tip="poiInfo.min_price_tip", :selectedFood='selectfood')




</template>

<script>
import bscroll from 'better-scroll'
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import CartControl from "../CartControl/CartControl";

export default {
    data(){
        return{
            container:{},
            goods:[],
            listHeight: [],
            menuScroll: {},
            goodsScroll: {},
            scrollY: 0,
            poiInfo:{}
        }
        
    },
    components:{
        ShoppingCart,
        CartControl
    },
    mounted(){//發起異步請求獲取數據
        var vobj = this;    

        this.axios.get('/api/goods')
        .then((res)=>{
                let dataSource= res.data
            if(res.status == 200){
                vobj.container = dataSource.data.container_operation_source;
                vobj.goods= dataSource.data.food_spu_tags
                vobj.poiInfo= dataSource.data.poi_info
                //調用bscroll初始
                // that.initscroll()
                //但DOM還沒渲染會有問題
                // 改寫到下方，忘記是接收的參數是promise，所以出了一個大BUG，改寫再arrow func 裡就正常了
            };
        
        }).then(()=>{
            vobj.$nextTick(()=>{
                    // DOM已更新
                    vobj.initScroll()
                    vobj.calcHeight()
                })
        }).catch((err)=>{console.log(err+'失敗')});
    },
    computed:{
        // 計算區塊對應區間高度的index，並比對v-for的index，來跳轉至商品位置
        currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
                let heightA=this.listHeight[i]
                let heightB= this.listHeight[i+1]
                let Y = Math.abs(this.scrollY)
                
                if((Y>=heightA && Y<heightB)  || !heightB ){
                    return i
                }
                
                
            }
        },
        // 計算被選的商品總數，並傳遞到購物車組件(子組件)
        selectfood(){
            let foods=[]
            this.goods.forEach((item)=>{
                item.spus.forEach((food)=>{
                    if(food.count>0){
                        foods.push(food)
                    }
                })
            })
            return foods
        }   
    },
    methods:{
        //回傳圖片url，computed無法傳參
        bg_gen(imgName){
            return `background-image: url('${imgName}')`
        },
        //設置滾動
        initScroll(){ 
            this.menuScroll = new bscroll(this.$refs.menuScroll,{
                                scrollY: true,
                                click: true,
                                bounce: {
                                    top: true,
                                    bottom: true
                                },
                                click: true
                            })
            this.goodsScroll = new bscroll(this.$refs.goodsScroll,{
                                    scrollY: true,
                                    click: true,
                                    bounce: {
                                        top: true,
                                        bottom: true
                                    },
                                    probeType: 3,
                                    click: true
                                })

            this.goodsScroll.on('scroll',(pos)=>{
                // console.log(pos.y)
                this.scrollY = pos.y
                
            })  
        },
        // 計算每個商品列表累加高度
        calcHeight(){
            //通過$ref獲取特定元素，並轉成類陣列
            let foodlist =this.$refs.goodsScroll.getElementsByClassName('goodsInitHeight')
            // console.log(foodlist)
            // console.log(foodlist.length)
            // let foodArr = Array.from( foodlist)
            // console.log(foodArr)
            let height=0
            this.listHeight.push(height)
            for(let i=0; i<foodlist.length; i++){
                let item = foodlist[i]
                height+= item.clientHeight
                // console.log(height)
                this.listHeight.push(height)
            }

        },
        scrollToEl(i){
            let foodlist =this.$refs.goodsScroll.getElementsByClassName('goodsInitHeight')
            // console.log(i)
            // 根據點擊，滾動到對應商品列表
            let el = foodlist[i]
            this.goodsScroll.scrollToElement(el,300)
        },
        calcTotal(foodObj){
            let total= 0

            foodObj.forEach((food)=>{
                if(food.count){
                    total += food.count
                }                
            })
            return total
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
            position: relative
            &.click_active
                background-color: #fff
                font-weight: bold
                margin-top: -1px
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
            // 紅色圈圈-商品總數
            .block_total_num
                width: 16px
                height: 16px
                background-color: #ed3131
                position: absolute
                top: 5px
                right: 5px
                border-radius: 50%
                color: #eee
                text-align: center
                font-size: 5px
                

    .goods
        flex: 1
        ul
            margin: 0
            padding: 0
        li
            list-style: none
            padding: 11px
            position: relative
            &#sell-pic
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
                border-top: 1px solid #e4e4e4
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
                    p
                        -webkit-line-clamp: 1
                        display: -webkit-box
                        -webkit-box-orient: vertical
                        overflow: hidden
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
                    .tip
                        width: 50%
                        margin: 0
                        display: flex
                        align-items: center
                        .text
                            color: #fb4e44
                            line-height: 14px
                            font-size: 1.2rem
                    

            
</style>
