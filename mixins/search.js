export const searchMixins =  {
    data (){
        return {
            openInput: false,
            isOverflowHidden: false,
            isSearchImg: '/_img/btn-search.png',
            searchInput: '',
        }
    },
    mounted (){
        $nuxt.$on('clickInput', () => {
            console.log('')
            this.clickInput()
        })
        document.body.addEventListener('click', this.HiddenClick)
    },
    methods: {
        HiddenClick (e){
            if(e.target.className == 'searchInput'){
                this.openInput = true
                this.isOverflowHidden = true
            } else {
                this.openInput = false
                this.isOverflowHidden = false
            }
            // document.body.style.overflow = this.isOverflowHidden ? 'hidden' : ''
        },
        clickInput (){      // inputFocus
            this.openInput = !this.openInput
            // this.openInput ?  this.$refs.searchInput.focus() :  this.$refs.searchInput.blur()
            this.openInput ?  this.isOverflowHidden = true : this.isOverflowHidden = false
            // document.body.style.overflow = this.isOverflowHidden ? 'hidden' : ''
        },
    },
}