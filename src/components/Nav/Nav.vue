<template lang="pug">
    .nav
        router-link.nav-item(to="/goods") 點菜 
        router-link.nav-item(to="/ratings") 評價({{commentNum}})
        router-link.nav-item(to="/seller") 商家  


</template>

<script>
export default {
    props:['commentNum']
};
</script>

<style lang="sass">
.nav
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    color: #666666
    border-bottom: 2px solid #f4f4f4
    .nav-item
        flex: 1
        text-align: center
        font-size: 13px
        text-decoration: none 
        color: inherit
        position: relative

        &.active
            color: #ffbb22
            &:before
                display: block
                content: ''
                width: 35px
                height: 3px
                background-color: #ffbb22
                position: absolute
                bottom: 0
                right: 50%
                z-index: 5
                transform: translateX(50%)
</style>

