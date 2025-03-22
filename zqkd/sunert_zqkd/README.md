中青看点极速版本：2.0.2

  [toc]  

 # <center> 中青看点使用说明 </center>

 [跳转至底部](#注意事项)  ----  [回到主页](https://github.com/XWF888/Task/tree/Main/zqkd/sunert_zqkd)

### IOS配置教程
 ```
[MITM]
hostname = kd.youth.cn, kandian.wkandian.com 
 ```

#### Quantumult X:
   * [中青ck远程重写配置](https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/qxck_rewite.txt)
```  
[rewrite_remote]
https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/qxck_rewite.txt
```  
   * [中青阅读远程重写配置](https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/qxread_rewite.txt)
```  
[rewrite_remote]
https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/qxread_rewite.txt
```
   * 中青ck本地重写配置
```
[rewrite_local]
https:\/\/kd\.youth\.cn\/WebApi\/NewTaskIos\/getTaskList url script-request-header https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/youth.js

https:\/\/ios\.baertt\.com\/v5\/article\/info\/get\.json url script-request-header https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/youth.js

https:\/\/ios\.baertt\.com\/v5\/user\/stay\.json url script-request-body https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/youth.js

https:\/\/ios\.baertt\.com\/v5\/task\/browse_start\.json url script-request-body https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/youth_gain.js

https:\/\/ios\.baertt\.com\/v5\/Nameless\/adlickstart\.json url script-request-body https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/youth_gain.js

https:\/\/ios\.baertt\.com\/v5\/\w+\/withdraw\d?\.json url script-request-body https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/youth.js
```
   * 中青阅读本地重写配置
```
[rewrite_local]
https:\/\/ios\.baertt\.com\/v5\/article\/info\/get\.json url script-request-header https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/Youth_Read.js

https:\/\/ios\.baertt\.com\/v5\/user\/stay\.json url script-request-body https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/Youth_Read.js
```
   * 本地任务配置
```
[task_local]
1 */5 * * * https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/youth.js, enabled=true, tag=中青看点

10 */20 * * * https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/Youth_Read.js, enabled=true, tag=中青阅读

30 6,12 * * * https://raw.githubusercontent.com/XWF888/Task/Main/zqkd/sunert_zqkd/youth_gain.js,enabled=true, tag=中青看看赚
```
###  获取Cookie方法
  * 打开极速版APP，进去我的"任务中心"，提示获取Cookie
  - 打开一篇短文资讯，提示获取阅读请求
  * 多阅读几篇短文，随机获取阅读时长请求(至少1分钟左右，增加时长有关)
  - 正常提现一次，获取提现请求(可选，AC无添加)
  
 >>> [回到顶部](#IOS配置教程)

 
### 注意事项:
 - __提现金额需该请求一致，只更改提现金额无效，默认30元__
 
 * __惊喜红包已下架，现所有请求均采用IOS新版APP任务__
