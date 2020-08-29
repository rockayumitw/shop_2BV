import { BIcon } from 'bootstrap-vue'
export const headerMixins =  {
    methods: {
        dropdown (value){
            if(value == 'level_1'){
                this.level.isOpenLevel_1 = !this.level.isOpenLevel_1
            }
            if(value == 'level_2'){
                this.level.isOpenLevel_2 = !this.level.isOpenLevel_2
            }
            if(value == 'login_subMenu'){
                this.level.isOpenLevel_subLoginLevel = !this.level.isOpenLevel_subLoginLevel
            }
        },
    },
    components: {
        BIcon
    }
}