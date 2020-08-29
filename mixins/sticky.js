import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export const stickyMixins =  {
    data (){
        return {
            stickyPos: 500,
            limitPos: 1000,
            scrolled: false,
            lastPos: 0,
            isActive: false,        // 判斷卷軸滑道位置
            isGoTop: false, 
            isTabsActive: false, 
            isStickyClass: {
                isGoTopClass:'',
                isSearchClass:'',
                isPriceBoxClass:'',
                isRightBoxAreaClass:'',
            },       
            isGoTopClass: '',
            isDev:'',      
        }
    },
    mounted(){
        this.Resize()
    },
    methods: {
        Resize (){
            // $('body').css('overflow','auto')
            // lg | md | sm | xs
            if(window.innerWidth > 992 ){
                this.openInput = false
                this.isDev = 'lg'
            }
            if(window.innerWidth < 992 && window.innerWidth > 767){
                this.isDev = 'md'
                this.isOpenShareBtn = true
            }
            if(window.innerWidth < 767 && window.innerWidth > 575){
                this.openInput = false
                this.isDev = 'sm'
            }
            if(window.innerWidth < 575 && window.innerWidth > 321){
                this.openInput = false
                this.isDev = 'xs'
            }
            if(window.innerWidth < 321){
                this.openInput = false
                this.isDev = 'xxs'
            }
            this.stickyButtonPos()
            // this.stickyPriceBox()
        },
        ScrollAnimation (){
            // console.log('tst')
            this.scrollY = window.scrollY;
            this.stickyButtonPos()
            if (window.scrollY > 100) {
                this.isActive = true;
            }
            if (window.scrollY < 100) {
                this.isActive = false;
            }
            if (this.lastPos < window.scrollY && this.stickyPos < window.scrollY) {
                this.isActive = true;
            }
            if (this.lastPos < window.scrollY && this.limitPos < window.scrollY) {
                if (window.innerWidth < 992 ) {
                    return false;
                }
                this.scrolled = true;
            }
            if (this.lastPos > window.scrollY) {
                this.scrolled = false;
            }
            this.lastPos = window.scrollY;
        },
        stickyButtonPos (){
            if(location.pathname == '/'){  // 為首頁
                let footerTopPos = $(".section-feature").offset().top / 2
                let footerBottomPos = $(".footer-bottom").offset().top / 2 
                let footerPrivcyPos = $('.footer-privcy').offset().top  / 1.5 

                if (this.isDev == 'lg'){
                    footerTopPos = footerTopPos + 50
                    if(window.scrollY > footerTopPos){
                        this.isStickyClass.isGoTopClass = '__pc'
                    }else{
                        this.isStickyClass.isGoTopClass = ''
                    }
                }

                if(this.isDev == 'md'){
                    if(window.scrollY > footerBottomPos){
                        this.isStickyClass.isGoTopClass = '__md'
                        this.isStickyClass.isSearchClass = '__md'
                    }else{
                        this.isStickyClass.isGoTopClass = ''
                        this.isStickyClass.isSearchClass = ''
                    }
                }

                if(this.isDev == 'sm'){
                    footerBottomPos = footerBottomPos + 200
                    if(window.scrollY > footerBottomPos){
                        this.isStickyClass.isSearchClass = '__xs'
                    } else {
                        this.isStickyClass.isSearchClass = ''
                    }
                    this.isStickyClass.isGoTopClass = '__mb'
                }

                if(this.isDev == 'xs'){
                    footerBottomPos = footerBottomPos + 500
                    if(window.scrollY > footerBottomPos){
                        this.isStickyClass.isSearchClass = '__xs'
                    } else {
                        this.isStickyClass.isSearchClass = ''
                    }
                    this.isStickyClass.isGoTopClass = '__mb'
                }
                if(this.isDev == 'xxs'){
                    footerBottomPos = footerBottomPos + 800
                    if(window.scrollY > footerBottomPos){
                        this.isStickyClass.isSearchClass = '__xs'
                    } else {
                        this.isStickyClass.isSearchClass = ''
                    }
                    this.isStickyClass.isGoTopClass = '__mb'
                }
            }else if(location.pathname == '/live') {  /// for inner-page
                let tabsPos = $('.tabs').offset().top
                let windowInnerHeight = window.innerHeight // 可視高度
                let windowScrollTotalHeight = document.getElementById('__layout').scrollHeight // 總卷軸高度
                let UnknownHeight = windowScrollTotalHeight - windowInnerHeight // 變化後卷軸高度
                let footerAreaHeight = document.getElementById('footer').offsetHeight
                // let tabsAreaHeight = document.getElementById('tabs').children[0].offsetHeight

                // console.log('tabsHeight:'+tabsAreaHeight)

                // console.log('目前卷軸位置:'+window.scrollY)
                // console.log('卷軸總高度:'+windowScrollTotalHeight)
                // console.log('UnknownHeight:'+UnknownHeight)

                if(this.isDev == 'lg'){
                    if(window.scrollY>tabsPos){
                        this.isStickyClass.isRightBoxAreaClass = '__fixed-top-ft-65'
                        if(this.scrolled == true){
                            this.isStickyClass.isRightBoxAreaClass = '__fixed-top-ft-10'
                        }
                    } else {
                        this.isStickyClass.isRightBoxAreaClass = '__sticky'
                    }
                    let footerTopPos = UnknownHeight - footerAreaHeight // 定位點
                    if(window.scrollY > footerTopPos){
                        this.isStickyClass.isGoTopClass = '__lg-inner-sticky'
                    }else{
                        this.isStickyClass.isGoTopClass = ''
                    }
                }
                if(this.isDev == 'md'){
                    let footerTopPos = UnknownHeight - footerAreaHeight
                    this.isStickyClass.isRightBoxAreaClass = ''
                    if(window.scrollY > footerTopPos){
                        this.isStickyClass.isPriceBoxClass = '__sticky'
                        this.isStickyClass.isSearchClass = '__md-inner-sticky'
                        this.isStickyClass.isGoTopClass = '__md-inner-sticky'
                    } else {
                        this.isStickyClass.isPriceBoxClass = '__fixd-bottom'
                        this.isStickyClass.isSearchClass = '__md-inner-fixed'
                        this.isStickyClass.isGoTopClass = '__md-inner-fixed'
                    }
                }
                if(this.isDev == 'sm'){
                    let footerTopPos = UnknownHeight - footerAreaHeight
                    this.isStickyClass.isRightBoxAreaClass = ''
                    if(window.scrollY > footerTopPos){
                        this.isStickyClass.isPriceBoxClass = '__sticky'
                        this.isStickyClass.isSearchClass = '__sm-inner-sticky'
                        this.isStickyClass.isGoTopClass = '__sm-inner-sticky'
                    } else {
                        this.isStickyClass.isPriceBoxClass = '__fixd-bottom'
                        this.isStickyClass.isSearchClass = '__sm-inner-fixed'
                        this.isStickyClass.isGoTopClass = '__sm-inner-fixed'
                    }
                }
                if(this.isDev == 'xs' || this.isDev == 'xxs'){
                    // console.log(this.isDev)
                    let footerTopPos = UnknownHeight - footerAreaHeight
                    // console.log('footerAreaPos(news):'+footerAreaPos)
                    this.isStickyClass.isRightBoxAreaClass = ''
                    if(window.scrollY > footerTopPos){
                        this.isStickyClass.isPriceBoxClass = '__sticky'
                        this.isStickyClass.isSearchClass = '__xs-inner-sticky'
                        this.isStickyClass.isGoTopClass = '__xs-inner-sticky'
                    } else {
                        this.isStickyClass.isPriceBoxClass = '__fixd-bottom'
                        this.isStickyClass.isSearchClass = '__xs-inner-fixed'
                        this.isStickyClass.isGoTopClass = '__xs-inner-fixed'
                    }
                }
            }
        },
        stickyPriceBox (){
            // gsap.to('.price-box' ,{
            //     scrollTrigger: {
            //         trigger: '.footer-area',
            //             // endTrigger: '.footerPrivcy',
            //         markers: true,
            //         onEnter: function (){
            //             // console.log('enter')
            //             $('.price-box').attr('class','price-box pt-xl-4 pt-lg-4 p-2 d-flex align-items-baseline justify-content-between __sticky')
            //         },
            //         onLeaveBack: function (){
            //             $('.price-box').attr('class','price-box pt-xl-4 pt-lg-4 p-2 d-flex align-items-baseline justify-content-between __fix-bottom')
            //         }
            //     }
            // })

            // gsap.to('.box-area' ,{
            //     scrollTrigger: {
            //         trigger: '.tabs',
            //             // endTrigger: '.footerPrivcy',
            //         markers: true,
            //         onEnter: function (){
            //             // console.log('enter')
            //             $('.box-area').css('background','red')
            //             $('.box-area').attr('class','box-area pl-xl-5 pl-lg-2 __fixed-top')
            //         },
            //         onLeaveBack: function (){
            //             $('.box-area').css('background','white')
            //             $('.box-area').attr('class','box-area pl-xl-5 pl-lg-2 __sticky')
            //         }
            //     }
            // })

            // console.log('tt')
            // switch(dev) {
            //     case 'pc':
            //         gsap.to('.goTop' ,{
            //             scrollTrigger: {
            //             trigger: '.footer-top',
            //             start:'top bottom',
            //             markers: true,
            //                 onEnter: function (){
            //                     $('.goTop').attr('class','goTop sticky-go-top __pc')
            //                 },
            //                 onLeaveBack: function (){
            //                     $('.goTop').attr('class','goTop sticky-go-top')
            //                 }
            //             }
            //         })
            //         console.log('pc')
                    
            //         break;
            //     case 'tablet':
            //     gsap.to('.btn-search>img' ,{
            //         scrollTrigger: {
            //         trigger: '.footer-bottom',
            //         markers: true,
            //         onEnter: function (){
            //           console.log('enter')
            //           $('.btn-search>img').attr('class','__tablet')
            //         //   $('.goTop').attr('class','goTop sticky-go-top __tablet')
            //         },
            //         onLeaveBack: function (){
            //           console.log('leave')
            //           $('.btn-search>img').attr('class','')
            //         //   $('.goTop').attr('class','goTop sticky-go-top')
            //         }
            //       }
            //     })
              
            //     break;
            //   case 'mb':
            //       console.log('mb')
            //     gsap.to('.btn-search>img' ,{
            //         scrollTrigger: {
            //         trigger: '.footerPrivcy',
            //         endTrigger: '.footerPrivcy',
            //         markers: true,
            //         onEnter: function (){
            //           console.log('enter')
            //         //   $('.goTop').attr('class','goTop sticky-go-top __mb')
            //         },
            //         onLeaveBack: function (){
            //         //   $('.goTop').attr('class','goTop sticky-go-top')
            //         }
            //       }
            //     })
            //     break;
            // }
        }
    },
    created (){
        if (process.client) {
            window.addEventListener("scroll", this.ScrollAnimation);
            window.addEventListener("resize", this.Resize);
        }
    },
    destroyed (){
        if (process.client) {
            window.addEventListener("scroll", this.ScrollAnimation);
            window.addEventListener("resize", this.Resize);
            // window.removeEventListener("scroll", this.ScrollAnimation);
        }
    },
}