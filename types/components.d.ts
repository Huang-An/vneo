import { VneoEmpty } from '@/components/common/vneo-empty/type'
import { VneoScroll } from '@/components/common/vneo-scroll/type'
import { VneoSelect } from '@/components/common/vneo-select/type'
import { VneoUploader } from '@/components/common/vneo-uploader/type'

declare global {
  type VneoComponent<P = any, S = any> = {
    new (): {
      $props: P
      $slots: S
    }
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    VneoEmpty: VneoEmpty
    VneoScroll: VneoScroll
    VneoSelect: VneoSelect
    VneoUploader: VneoUploader
  }
}
