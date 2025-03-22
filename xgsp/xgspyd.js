/*
----------------------
-------1.14修复加密---------
*/
const $ = new Env('西瓜视频');
let status;
status = (status = ($.getval("XGSPstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let XGSPhdArr = [], 
    XGSPydhdArr = [], 
    XGSPkbxhdArr = [],
    XGSPzqhdArr = [],
    XGSPzbbxhdArr = [],
    XGSPzyfhdArr = [],
    XGSPcount = ''

//签到
let XGSPurl = ($.isNode() ? process.env.XGSPURL :  $.getdata('XGSPurl')) || '';
let XGSPhd = ($.isNode() ? process.env.XGSPHD :  $.getdata('XGSPhd')) || '';

//阅读
let XGSPydurl = ($.isNode() ? process.env.XGSPYDURL :  $.getdata('XGSPydurl')) || '';
let XGSPydhd = ($.isNode() ? process.env.XGSPYDHD :  $.getdata('XGSPydhd')) || '';

//开宝箱
let XGSPkbxurl = ($.isNode() ? process.env.XGSPKBXURL :  $.getdata('XGSPkbxurl')) || '';
let XGSPkbxhd = ($.isNode() ? process.env.XGSPKBXHD :  $.getdata('XGSPkbxhd')) || '';

//宝箱广告
let XGSPbxggurl = ($.isNode() ? process.env.XGSPBXGGURL :  $.getdata('XGSPbxggurl')) || '';
let XGSPbxgghd = ($.isNode() ? process.env.XGSPBXGGHD :  $.getdata('XGSPbxgghd')) || '';

//宝箱1
let XGSPbx1url = ($.isNode() ? process.env.XGSPBX1URL :  $.getdata('XGSPbx1url')) || '';
let XGSPbx1hd = ($.isNode() ? process.env.XGSPBX1HD :  $.getdata('XGSPbx1hd')) || '';

//宝箱2
let XGSPbx2url = ($.isNode() ? process.env.XGSPBX2URL :  $.getdata('XGSPbx2url')) || '';
let XGSPbx2hd = ($.isNode() ? process.env.XGSPBX2HD :  $.getdata('XGSPbx2hd')) || '';

//广告积分
let XGSPggjfurl = ($.isNode() ? process.env.XGSPGGJFURL :  $.getdata('XGSPggjfurl')) || '';
let XGSPggjfhd = ($.isNode() ? process.env.XGSPGGJFHD :  $.getdata('XGSPggjfhd')) || '';

//西瓜金额
let XGSPjineurl = ($.isNode() ? process.env.XGSPJINEURL :  $.getdata('XGSPjineurl')) || '';
let XGSPjinehd = ($.isNode() ? process.env.XGSPJINEHD :  $.getdata('XGSPjinehd')) || '';

//西瓜直播
let XGSPliveurl = ($.isNode() ? process.env.XGSPLIVEURL :  $.getdata('XGSPliveurl')) || '';
let XGSPlivehd = ($.isNode() ? process.env.XGSPLIVEHD :  $.getdata('XGSPlivehd')) || '';

/*//西瓜直播宝箱
let XGSPzbbxurl = ($.isNode() ? process.env.XGSPZBBXURL : $.getdata('XGSPzbbxurl')) || '';
let XGSPzbbxhd = ($.isNode() ? process.env.XGSPZBBXHD : $.getdata('XGSPzbbxhd')) || '';
let XGSPzbbxbody = ($.isNode() ?process.env.XGSPZBBXBODY :$.getdata('XGSPzbbxbody')) || '';
*/


//开始运行
!(async () => {
  if (typeof $request !== "undefined") {
    await XGSPck()

  } else {
    
    XGSPurlArr = XGSPurl.split('@')
    XGSPhdArr = XGSPhd.split('@')

    XGSPydurlArr = XGSPydurl.split('@')
    XGSPydhdArr = XGSPydhd.split('@')
     
    XGSPkbxurlArr = XGSPkbxurl.split('@')
    XGSPkbxhdArr = XGSPkbxhd.split('@')

    XGSPbxggurlArr = XGSPbxggurl.split('@')
    XGSPbxgghdArr = XGSPbxgghd.split('@')

    XGSPbx1urlArr = XGSPbx1url.split('@')
    XGSPbx1hdArr  = XGSPbx1hd.split('@')

    XGSPbx2urlArr = XGSPbx2url.split('@')
    XGSPbx2hdArr = XGSPbx2hd.split('@')

    XGSPggjfurlArr = XGSPggjfurl.split('@')
    XGSPggjfhdArr = XGSPggjfhd.split('@')

    XGSPjineurlArr = XGSPjineurl.split('@')
    XGSPjinehdArr = XGSPjinehd.split('@')
    
    XGSPliveurlArr = XGSPliveurl.split('@')
    XGSPlivehdArr = XGSPlivehd.split('@')

    console.log(`      ------------- 共${XGSPhdArr.length}个账号-------------\n`)
    for (let i = 0; i < XGSPhdArr.length; i++) {
   
      XGSPurl = XGSPurlArr[i]
      XGSPhd = XGSPhdArr[i]
   
      XGSPydurl = XGSPydurlArr[i]
      XGSPydhd = XGSPydhdArr[i]
      
      XGSPkbxurl = XGSPkbxurlArr[i]
      XGSPkbxhd = XGSPkbxhdArr[i]

      XGSPbxggurl = XGSPbxggurlArr[i]
      XGSPbxgghd = XGSPbxgghdArr[i]

      XGSPbx1url = XGSPbx1urlArr[i]
      XGSPbx1hd  = XGSPbx1hdArr[i]

      XGSPbx2url = XGSPbx2urlArr[i]
      XGSPbx2hd = XGSPbx2hdArr[i]

      XGSPggjfurl = XGSPggjfurlArr[i]
      XGSPggjfhd = XGSPggjfhdArr[i]

      XGSPjineurl = XGSPjineurlArr[i]
      XGSPjinehd = XGSPjinehdArr[i]

      XGSPliveurl = XGSPliveurlArr[i]
      XGSPlivehd = XGSPlivehdArr[i]


      $.index = i + 1;
      
console.log(`\n               开始【西瓜视频${$.index}】\n`)
console.log(`\n\n===============================================            ⏰脚本执行-北京时间(UTC)：${new Date().toLocaleString()}       ===============================================\n   \n`)
      
 
            await xgyhm()
            await $.wait(1000)
            //await xgqd()//你要执行的版块
            //await $.wait(1000)//你要延迟时间1000=1秒
//循环运行多次任务
  for (let c = 0; c < 55; c++) {
           $.index = c + 1
            await xgyd()  
            await $.wait(28000)
      }
            //await xgkbx()
            //await $.wait(10000)
            //await xgbxgg()
            //await $.wait(20000)
            //await xgbx1()
            //await $.wait(5000)
            //await xgbx2()
            //await $.wait(15000)
            //await xgggjf()
            //await $.wait(15000)
            
            //await xglive()
            //await $.wait(5000)
            //await dyzbkbx()
//循环运行多次任务
  for (let c = 0; c < 5; c++) {
           $.index = c + 1            
            //await an dyzq()
            //await $.wait(30000)
      }
            await xgjine()
    }
  }

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


//数据获取
function XGSPck() {
//西瓜签到
        if ($request.url.indexOf("daily_sign_in") > -1) {
        const XGSPurl = $request.url
        if (XGSPurl) $.setdata(XGSPurl, `XGSPurl${status}`)
        $.log(XGSPurl)

        const XGSPhd = JSON.stringify($request.headers)
        if (XGSPhd) $.setdata(XGSPhd, `XGSPhd${status}`)
        $.log(XGSPhd)
        
           $.msg($.name, "", `西瓜${status}获取XGSPhd成功`)//$.msg这段是通知提示信息获取成功

    }



//西瓜阅读
    if ($request.url.indexOf("timer/tick") > -1) {
        const XGSPydurl = $request.url
        if (XGSPydurl) $.setdata(XGSPydurl, `XGSPydurl${status}`)
        $.log(XGSPydurl)

        const XGSPydhd = JSON.stringify($request.headers)
        if (XGSPydhd) $.setdata(XGSPydhd, `XGSPydhd${status}`)
        $.log(XGSPydhd)

        $.msg($.name, "", `西瓜${status}获取XGSPydhd成功`)//$.msg这段是通知提示信息获取成功

    }



//开宝箱
    if ($request.url.indexOf("coin_chest") > -1) {
        const XGSPkbxurl = $request.url
        if (XGSPkbxurl) $.setdata(XGSPkbxurl, `XGSPkbxurl${status}`)
        $.log(XGSPkbxurl)

        const XGSPkbxhd = JSON.stringify($request.headers)
        if (XGSPkbxhd) $.setdata(XGSPkbxhd, `XGSPkbxhd${status}`)
        $.log(XGSPkbxhd)

        $.msg($.name, "", `西瓜${status}获取XGSPkbxhd成功`)

    }    

/*//宝箱看广告     
    if ($request.url.indexOf("chest_ad") > -1) {
        const XGSPbxggurl = $request.url
        if (XGSPbxggurl) $.setdata(XGSPbxggurl, `XGSPbxggurl${status}`)
        $.log(XGSPbxggurl)

        const XGSPbxgghd = JSON.stringify($request.headers)
        if (XGSPbxgghd) $.setdata(XGSPbxgghd, `XGSPbxgghd${status}`)
        $.log(XGSPbxgghd)

        $.msg($.name, "", `西瓜${status}获取XGSPbxgghd成功`)//$.msg这段是通知提示信息获取成功

    }*/
  
    
//宝箱再得广告1
   if ($request.url.indexOf("task/query/ad_watch_daily_again") > -1) {
        const XGSPbx1url = $request.url
        if (XGSPbx1url) $.setdata(XGSPbx1url, `XGSPbx1url${status}`)
        $.log(XGSPbx1url)

        const XGSPbx1hd = JSON.stringify($request.headers)
        if (XGSPbx1hd) $.setdata(XGSPbx1hd, `XGSPbx1hd${status}`)
        $.log(XGSPbx1hd)

        $.msg($.name, "", `西瓜${status}获取XGSPbx1hd成功`)//$.msg这段是通知提示信息获取成功

    }

 
//宝箱再得广告2
    if ($request.url.indexOf("task/done/ad_watch_daily_again") > -1) {
        const XGSPbx2url = $request.url
        if (XGSPbx2url) $.setdata(XGSPbx2url, `XGSPbx2url${status}`)
        $.log(XGSPbx2url)

        const XGSPbx2hd = JSON.stringify($request.headers)
        if (XGSPbx2hd) $.setdata(XGSPbx2hd, `XGSPbx2hd${status}`)
        $.log(XGSPbx2hd)

        const XGSPbx2body = $request.body
        if (XGSPbx2body) $.setdata(XGSPbx2body, `XGSPbx2body${status}`)
        $.log(XGSPbx2body)

        $.msg($.name, "", `西瓜${status}获取XGSPbx2hd成功`)//$.msg这段是通知提示信息获取成功

    }


//看广告赚积分     
    if ($request.url.indexOf("task/done/ad_watch_daily") > -1) {
        const XGSPggjfurl = $request.url
        if (XGSPggjfurl) $.setdata(XGSPggjfurl, `XGSPggjfurl${status}`)
        $.log(XGSPggjfurl)

        const XGSPggjfhd = JSON.stringify($request.headers)
        if (XGSPggjfhd) $.setdata(XGSPggjfhd, `XGSPggjfhd${status}`)
        $.log(XGSPggjfhd)

        $.msg($.name, "", `西瓜${status}获取XGSPggjfhd成功`)//$.msg这段是通知提示信息获取成功

    }

//西瓜金币收益     
    if ($request.url.indexOf("task/page") > -1) {
        const XGSPjineurl = $request.url
        if (XGSPjineurl) $.setdata(XGSPjineurl, `XGSPjineurl${status}`)
        $.log(XGSPjineurl)

        const XGSPjinehd = JSON.stringify($request.headers)
        if (XGSPjinehd) $.setdata(XGSPjinehd, `XGSPjinehd${status}`)
        $.log(XGSPjinehd)

        $.msg($.name, "", `西瓜${status}获取XGSPjinehd成功`)//$.msg这段是通知提示信息获取成功

    }

//看直播赚积分
    if ($request.url.indexOf("live") > -1) {
        const XGSPliveurl = $request.url
        if (XGSPliveurl) $.setdata(XGSPliveurl, `XGSPliveurl${status}`)
        $.log(XGSPliveurl)

        const XGSPlivehd = JSON.stringify($request.headers)
        if (XGSPlivehd) $.setdata(XGSPlivehd, `XGSPlivehd${status}`)
        $.log(XGSPlivehd)

        $.msg($.name, "", `西瓜${status}获取XGSPlivehd成功`)//$.msg这段是通知提示信息获取成功

    }

}//这符号小心不能删掉

//👇以下是任务👇
//西瓜签到
function xgqd(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: XGSPurl,
            headers: JSON.parse(XGSPhd),
            body: `{\n  \"polaris_version\" : \"9.9.9\",\n  \"luckycat_version_name\" : \"9.9.9\",\n  \"luckycat_version_code\" : \"999999\",\n  \"act_common\" : {\n    \"sdk_version\" : \"5.0.1.14-bugfix\",\n    \"act_data\" : \"BiIKqF7lwVFazjufk7vcXqoewz7FPx6MYT0ZxH-RhGyqHglYdOoPoeZVtbjHMAw89QfxKniVJY2XbLsb-dv4ciF4BwIAKyAnPJvV3NQxc-I\",\n    \"settings_version\" : 15,\n    \"act_token\" : \"FJ4bewJhZx6qz1BjWDJSlcNUPvoewzjYpbAYvY2eKFLwArHoUMYXpirkus2b17I41M9g1hx4nJiu6x2szou0nLhsoVznZwE-7lJ4PtUM0m5TFK6yx3gxYCLUDqAbfIhmrEhJwlnKLyKojFBKyHdbB26HnJ4uRig7H73shjlvpQU\",\n    \"act_base\" : \"ufgyDWVt3YbLe3QKzoUKCYH8bJzpgreLpFfOD7aQ5Y6ugpYqufuvGHqkToTMY5ayHAuWg166gLRJBTZT9vCL7YT9lkG6B4hIrIinGctz8teiFSyLFhKQKinCJUxxWvzSBYDh8T5Mb3oeqBNAPYoWLnbh3_F9uQfvxA4n8p9lcSA\"\n  }\n}`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)//返回体

                if (data.err_no == 0) {
            
            console.log(`🎉西瓜视频签到：${data.err_tips}`)//打印返回成功数值
            
                //else是不然的意思
                } else {

            console.log(`❌西瓜视频已签到：${data.date}😿😿`)//打印返回失败数值
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//西瓜阅读
function xgyd(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: XGSPydurl,
            headers: JSON.parse(XGSPydhd),
            body: `{\n  \"is_golden_egg\" : false,\n  \"scene_key\" : \"feed_search\",\n  \"group_id\" : \"0\"\n}`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)//返回体

                if (data.err_no == 0) {
            
            console.log(`🎉阅读获取：${data.data.daily_watch_result.amount}金币`)//打印返回成功数值

                //else是不然的意思
                } else {

            console.log(`❌阅读失败：${data.err_tips}😿😿`)//打印返回失败数值
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//开宝箱
function xgkbx(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: XGSPkbxurl,
            headers: JSON.parse(XGSPkbxhd),
            body: `{\n  \"polaris_version\" : \"9.9.9\",\n  \"luckycat_version_name\" : \"9.9.9\",\n  \"luckycat_version_code\" : \"999999\",\n  \"act_common\" : {\n    \"sdk_version\" : \"5.0.1.14-bugfix\",\n    \"act_data\" : \"BiIKqF7lwVFazjufk7vcXqoewz7FPx6MYT0ZxH-RhGyqHglYdOoPoeZVtbjHMAw89QfxKniVJY2XbLsb-dv4ciF4BwIAKyAnPJvV3NQxc-I\",\n    \"settings_version\" : 15,\n    \"act_token\" : \"FJ4bewJhZx6qz1BjWDJSlcNUPvoewzjYpbAYvY2eKFLwArHoUMYXpirkus2b17I41M9g1hx4nJiu6x2szou0nLhsoVznZwE-7lJ4PtUM0m5TFK6yx3gxYCLUDqAbfIhmrEhJwlnKLyKojFBKyHdbB26HnJ4uRig7H73shjlvpQU\",\n    \"act_base\" : \"ufgyDWVt3YbLe3QKzoUKCYH8bJzpgreLpFfOD7aQ5Y6ugpYqufuvGHqkToTMY5ayHAuWg166gLRJBTZT9vCL7YT9lkG6B4hIrIinGctz8teiFSyLFhKQKinCJUxxWvzSBYDh8T5Mb3oeqBNAPYoWLnbh3_F9uQfvxA4n8p9lcSA\"\n  }\n}`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)//返回体

                if (data.err_no == 0) {
            
            console.log(`🎉开宝箱获取：${data.data.amount}金币`)//打印返回成功数值

                //else是不然的意思
                } else {

            console.log(`❌开宝箱失败：${data.err_tips}😿😿`)//打印返回失败数值
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//宝箱看广告
function xgbxgg(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: XGSPbxggurl,
            headers: JSON.parse(XGSPbxgghd),
            body: `ad_fallback=0`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.err_no == 0) {
    console.log(`🎉宝箱广告金币成功：${data.data.amount}金币`)//打印返回成功數值
           
               } else {
    console.log(`❌宝箱广告金币失败：${data.err_tips}😿😿`)//打印返回失败数值

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//宝箱再得广告1
function xgbx1(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: XGSPbx1url,
            headers: JSON.parse(XGSPbx1hd),
            //body: `XGSPbody`,
        }
        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)//返回體

                if (data.err_no == 0) {
            
            console.log(`🎉再得广告1金币：${data.data.amount}金币`)//打印返回成功數值
                    
                //else是不然的意思
                } else {
                    
     console.log(`❌再得广告1金币失败：${data.err_tips}😿😿`)//打印返回失败数值
            //打印返回失敗數值
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//宝箱再得广告2
function xgbx2(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: XGSPbx2url,
            headers: JSON.parse(XGSPbx2hd),
            body: `ad_fallback=0`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.err_no == 0) {
    console.log(`🎉再得广告2金币：${data.data.amount}金币`)//打印返回成功數值
           
               } else {
    console.log(`❌再得广告2金币失败：${data.err_tips}😿😿`)//打印返回失败数值

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//看广告赚积分
function xgggjf(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: XGSPggjfurl,
            headers: JSON.parse(XGSPggjfhd),
            body: `ad_fallback=0`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.err_no == 0) {
    console.log(`🎉看广告赚积分：${data.err_tips}`)//打印返回成功數值
           console.log(`🎉看广告赚积分收取：${data.data.amount}金币`)
               } else {

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//西瓜用户名
function xgyhm(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: XGSPjineurl,
            headers: JSON.parse(XGSPjinehd),
            //body: 
        }
        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.err_no == 0) {
    
       console.log(`================用户名：${data.data.user_info.name}================`)

       console.log(`🎉我的金额💰：${data.data.income_info.cash_balance}分`)  

       console.log(`🎉我的积分：${data.data.income_info.score_balance}金币`)//打印返回成功數值        
               } else {

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//西瓜金币收益
function xgjine(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: XGSPjineurl,
            headers: JSON.parse(XGSPjinehd),
            //body: 
        }
        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.err_no == 0) {
    console.log(`==============我的积分：${data.data.income_info.score_balance}金币==============`)//打印返回成功數值
               
               } else {

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//看直播赚积分
function xglive(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: XGSPliveurl,
            headers: JSON.parse(XGSPlivehd),
            body: `ad_fallback=0`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.err_no == 0) {
    console.log(`🎉看直播赚积分：${data.data.amount}金币`)//打印返回成功數值
           
               } else {
    console.log(`❌看直播赚积分失败：${data.err_tips}😿😿`)//打印返回失败数值

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
