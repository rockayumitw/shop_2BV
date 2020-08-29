export const hiddenClickMixins = {
    mounted (){
        document.body.addEventListener('click', this.HiddenClick)
    },
    methods: {
        HiddenClick(e){
            // console.log(e)
            console.log(e.target.className)
            if(e.target.className == 'comment-area'){
                this.isOpenComment = true
            }
            if(e.target.className == 'video-mask live-video-mask d-flex justify-content-center align-items-center'){
                this.isOpenPanel = false
            }
            // if(e.target.className == 'btn-open-panel' || e.target.className == 'video-tab-panels' || e.target.className == 'courses-title' || e.target.className == 'btn-back' || e.target.className == 'btn btn-login __panels btn-secondary' || e.target.className == 'modal fade __login' || e.target.className == 'modal-body'){
            //     this.isOpenPanel = true
            // }else{
            //      this.isOpenPanel = false
            // }
            
            // this.isOpenListCoursesPanel = false
            // this.isOpenLiveChatPanel = false
            // this.isOpenPanel = false
            // document.body.style.overflow = this.isOverflowHidden ? 'hidden' : ''
        },
    }
}