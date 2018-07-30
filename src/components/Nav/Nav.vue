<template lang="pug">
    .nav
        router-link.nav-item(to="/goods") 點菜 
        router-link.nav-item(to="/ratings") 評價 
        router-link.nav-item(to="/seller") 商家  


</template>

<script>
export default {

};
</script>

<style lang="sass">
.nav
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    color: #666666
    .nav-item
        flex: 1
        text-align: center
        font-size: 13px
        text-decoration: none
        
        color: inherit
    .active
        color: #ffbb22    
</style>

