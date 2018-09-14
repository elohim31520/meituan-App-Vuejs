<template lang="pug">
    .ratings(ref='ratingsView')
        .ratings-wrapper
            //- 三個評分區塊
            .evaluation-wrapper
                .evaluation-score-shop
                    .score-shop {{ratings.comment_score}}
                    h3 商家評分
                .evaluation-star
                    .star
                        span 口味
                        Star(:score='ratings.comment_score') 
                    .star
                        span 包裝
                        Star(:score='ratings.delivery_score')
                .evaluation-score-deliver
                    .score-deliver {{ratings.delivery_score}}
                    h3 配送評分
            SplitLine

            //- 評價分類
            .comment-btn-wrapper(v-if='ratings.tab')
                div(@click='selectActiveClass("all")', :class='{"active": selectActiveType == "all"}') {{ratings.tab[0].comment_score_title}}
                div(@click='selectActiveClass("pic")', :class='{"active": selectActiveType == "pic"}') {{ratings.tab[1].comment_score_title}}
                div(@click='selectActiveClass("hit")', :class='{"active": selectActiveType == "hit"}') {{ratings.tab[2].comment_score_title}}

            .comment-tag-wrapper
                span(v-for='tag in ratings.labels') {{tag.content}} {{tag.label_count}}

            //- 網友評論
            ul
                li(v-for='(comment,index) in commentsFilter', :key='index')
                    .comment-img-wrapper
                        //- 大頭貼
                        img(:src='comment.user_pic_url' ,v-if='comment.user_pic_url')
                        img(src='./anonymity.png' ,v-if='!comment.user_pic_url')
                    //- 評論
                    .comment-wrapper
                        .comment-header
                            .comment-title {{comment.user_name}}
                            .comment-time {{dateFormat(comment.comment_time)}}
                        .comment-star
                            span 評分
                            Star(:score='comment.order_comment_score')
                        .comment-body
                            p(v-html='changeHashTagStyle(comment.comment)')
                            img(v-for='item in comment.comment_pics' ,:src='item.thumbnail_url',v-if='item' )



</template>

<script>
import Star from '../Star/Star'
import Bscroll from 'better-scroll'

export default {
    data() {
        return {
            ratings: {},
            selectActiveType: 'all'
        }
    },
    async mounted() {
        try{
            // 取得數據
            let response = await this.axios.get("/api/ratings")
            this.ratings = response.data.data
            // Bscroll init
            if(!this.scroll){
                this.scroll = new Bscroll(this.$refs.ratingsView,{
                    scrollY: true,
                    click: true,
                    bounce: {
                        top: true,
                        bottom: true
                    },
                    probeType: 3,
                })
                }else{
                    // 轉換頁面時刷新
                    this.scroll.refresh()
                }
        }catch(err){
            console.log('GET ratings 數據發生錯誤',err)
        }
        
    },
    components: {
        Star
    },
    methods: {
        selectActiveClass(selected) {
            // 根據click 不同btn改變 btn active 樣式
            this.selectActiveType = selected
        },
        dateFormat(time) {
            // timestamp 轉換
            let date =new Date(time * 1000)

            let format ='yyyy.mm.dd'
            if(/(y+)/.test(format)){
                let year = date.getFullYear().toString()
                format = format.replace(RegExp.$1,year)
            }
            if(/(m+)/.test(format)){
                let month = date.getMonth().toString() 
                if(month<10) month = '0' + month
                format = format.replace(RegExp.$1,month)
            }
            if(/(d+)/.test(format)){
                let day = date.getDay()+1
                day.toString()
                if(day<10) day = '0' + day
                format = format.replace(RegExp.$1,day)
            }
            return format
        },
        changeHashTagStyle(tagParagraph){
            // 評論文章裡面的tag 設定樣式
            let regex = /#[^#]+#/g
            return tagParagraph.replace(regex, '<i>$&</i>')
        }
    },
    computed: {
        commentsFilter() {
            // 根據click 不同btn，過濾出評論內容
            if(this.selectActiveType == 'all'){
                return this.ratings.comments
            }
            else if(this.selectActiveType == 'pic') {
                let arr = []
                this.ratings.comments.forEach(comment => {
                    if(comment.comment_pics.length){
                        arr.push(comment)
                    }
                });
                return arr
            }
            else if (this.selectActiveType == 'hit') {
                return this.ratings.comments_dp.comments
            }
        }
    }
}
</script>

<style lang="sass">
.ratings
    position: fixed
    bottom: 0
    top: 218px
    width: 100%
    overflow: hidden

    .evaluation-wrapper
        width: 100%
        color: #666
        display: flex
        text-align: center

        // 商家評價
        .evaluation-score-shop
            flex: 1
            padding: 1rem
            
            .score-shop
                color: #ffb000
                font-size: 46px
                line-height: 46px
            h3
                font-size: 22px
                margin: 0
        // 星星
        .evaluation-star
            flex: 1.5
            display: flex
            flex-direction: column
            justify-content: center
            position: relative
            
            &:before, &:after
                content: ''
                display: block
                background-color: #e4e4e4
                width: 2px
                height: 35px
                position: absolute
            &:after
                right: 0

            span
                margin-right: 11px
            .star
                display: flex
                justify-content: center
                
                &:nth-child(1)
                    margin-bottom: 14px

        // 配送評價
        .evaluation-score-deliver
            flex: 1
            color: #999
            padding: 1rem

            .score-deliver
                font-size: 36px
                

            h3
                font-size: 22px
                margin: 0
    // 評價標籤按鈕
    .comment-btn-wrapper
        width: 90%  
        text-align: center
        border: 2px solid #ffb000
        display: flex
        margin: 1rem auto
        box-sizing: border-box
        height: 3rem
        border-radius: 5px


        div
            width: 100px
            height: 30px
            line-height: 30px
            flex: 1
            height: 100%
            line-height: 3rem
            position: relative
            font-size: 1rem
            color: #ffb000
            font-weight: 700

            // 選取樣式
            &.active
                background-color: #ffb000
                color: #111

            &:nth-child(2)
                &:before, &:after
                    content: ''
                    display: block
                    background-color: #ffb000
                    width: 2px
                    height: calc(3rem - 2px * 2)
                    position: absolute
                &:after
                    top: 0
                    right: 0
            
    // 評價labels
    .comment-tag-wrapper
        width: 100%
        display: flex
        flex-wrap: wrap
        margin: 0 1rem 1rem 1rem
    
        span
            background-color: #f4f4f4
            padding: 12px
            border-radius: 5px
            margin: 6px
            color: #656565
            font-weight: 700

    // 網友評價
    ul
        padding: 0
        li
            display: flex

            .comment-img-wrapper
                flex: 0 0 50px
                margin-left: 1rem
                

                img
                    width: 50px
                    height: 50px
                    border-radius: 50%

                
            .comment-wrapper
                flex: 1
                margin-right: 1.5rem
                margin-bottom: 2rem
                border-bottom: 2px solid #f4f4f4
                padding: 1rem

                .comment-header
                    display: flex

                    .comment-title
                        margin-right: auto
                        font-weight: 700

                    .comment-time
                        color: #999999
                        line-height: 21px

                .comment-star
                    display: flex
                    margin-top: 1rem
                    span
                        margin-right: 1rem
                        color: #999999

                .comment-body
                    color: #444444
                    line-height: 1.5rem

                    i
                        color: #576b95
                img
                    width: 100%
</style>
