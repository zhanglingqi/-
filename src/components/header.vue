<template>
    <x-header class="lg-header" @click.native="backNative">水电表抄录</x-header>
</template>

<script>
import { XHeader } from 'vux'
export default {
    components: {
        XHeader
    },
    methods:{
        backNative () {
            window.webkit.messageHandlers.backNative.postMessage(null)
        }
    }
}
</script>

<style lang="scss">
.lg-header{
    background-color: #26a2ff !important;
    .vux-header-left a{
        color: #fff !important;
    } 
}
</style>