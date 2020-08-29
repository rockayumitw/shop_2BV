<template>
  <div class='go-top sticky-go-top' :class="isStickyClass.isGoTopClass" @click.prevent="goTop()" >
    <img src="../assets/_img/_btn/btn-go_top.png" alt="">
  </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { stickyMixins } from '../mixins/sticky'
gsap.registerPlugin(ScrollToPlugin)

export default {
  mixins:[stickyMixins],
  name: '',
  title: '',
  head:{
    // script: [
    //   { src: 'gsap/TweenMax.min.js' },
    //   { src: 'gsap/MorphSVGPlugin.min.js' },
    //   { src: 'gsap/SplitText.min.js' },
    //   { src: 'gsap/DrawSVGPlugin.min.js' },
    //   { src: 'gsap/GSDevTools.min.js' }
    // ]
  },
  mounted () {
    
  },
  methods: {
    goTop (){
      gsap.to(window, {duration: 0.5, scrollTo: 0})
    },
  },
  components: {
  }
}
</script>