## 使用
```uts
import { ComponentPublicInstance } from 'vue'

(this.$refs['messageRef'] as ComponentPublicInstance).$callMethod('error', '文字')
```