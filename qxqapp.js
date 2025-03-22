/*
软件名：趣星球
[rewrite_local]
https://api.xqustar.com/api/user/loginByPassword url script-request-header https://gitee.com/gossh520/script/raw/master/qxqapp.js
hostname = api.xqustar.com
食用方法：重新登录趣星球即可获取
10 8 * * * https://gitee.com/gossh520/script/raw/master/qxqapp.js
*/

const $ = new Env('趣星球');
const notify = $.isNode() ? require('./sendNotify') : '';
let status;
status = (status = ($.getval("qxqstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
const qxqhdArr = [],
    qxqbodyArr = [],
    qxqcount = ''
let qxqhd = $.isNode() ? (process.env.qxqhd ? process.env.qxqhd : "") : ($.getdata('qxqhd') ? $.getdata('qxqhd') : "");
let qxqbody = $.isNode() ? (process.env.qxqbody ? process.env.qxqbody : "") : ($.getdata('qxqbody') ? $.getdata('qxqbody') : "");
let qxqhds = ''
let qxqbodys = ''
let times = new Date().getTime();
let tz = ($.getval('tz') || '1');
let arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
let host=`https://api.xqustar.com`;
$.message = ''
!(async () => {
    if (typeof $request !== "undefined") {
        qxqck()
    } else {
        if (!$.isNode()) {
        qxqhdArr.push($.getdata('qxqhd'))
        qxqbodyArr.push($.getdata('qxqbody'))
        let qxqcount = ($.getval('qxqcount') || '1');
        for (let i = 2; i <= qxqcount; i++) {
            qxqhdArr.push($.getdata(`qxqhd${i}`))
            qxqbodyArr.push($.getdata(`qxqbody${i}`))
        }
        console.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`
        );
        console.log(`=================== 共${qxqhdArr.length}个账号 ==================\n`)
        for (let i = 0; i < qxqhdArr.length; i++) {
            if (qxqhdArr[i]) {
                qxqhd = qxqhdArr[i];
                qxqbody = qxqbodyArr[i];
                $.index = i + 1;
                console.log(`\n【 趣星球 账号${$.index} 】`)
                await byxiaopeng()
            }
        }
        } else {
            if (process.env.qxqhd && process.env.qxqhd.indexOf('@') > -1) {
                qxqhdArr = process.env.qxqhd.split('@');
                qxqbodyArr = process.env.qxqbody.split('@');
                console.log(`您选择的是用"@"隔开\n`)
            } else {
                qxqhds = [process.env.qxqhd]
                qxqbodys = [process.env.qxqbody]
            };
            Object.keys(qxqhds).forEach((item) => {
                if (qxqhds[item]) {
                    qxqhdArr.push(qxqhds[item])
                }
            })
            console.log(`共${qxqhdArr.length}个账号`)
            for (let k = 0; k < qxqhdArr.length; k++) {
                qxqhd = qxqhdArr[i];
                qxqbody = qxqbodyArr[i];
                $.index = k + 1;
                console.log(`\n开始【趣星球账户 ${$.index}】`)
                await byxiaopeng()
            }
        }
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

//要执行的代码
async function byxiaopeng() {
    await dutang() 
    await $.wait(2000)
    await loginByPassword()
    await $.wait(2000)
    message() //通知
  }

function qxqck() {
    if ($request.url.indexOf("api/user/loginByPassword") > -1) {

        const qxqhd = JSON.stringify($request.headers)
        if (qxqhd) $.setdata(qxqhd, `qxqhd${status}`)
        $.log(qxqhd)
        const qxqbody = $request.body
        if (qxqbody) $.setdata(qxqbody, `qxqbody${status}`)
        $.log(qxqbody)
        $.msg($.name, "", `趣星球${status}headers获取成功`)
    }
}

//登录
function loginByPassword(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/user/loginByPassword`,
            headers: JSON.parse(qxqhd),
            body: qxqbody,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    uid = result.data.uid
                    token = result.data.token
                    hd = qxqhd.replace(/"Authorization":""/g, `"Authorization":"${token}"`)
                    $.log(`\n登录成功`)
                    await $.wait(2000)
                    await indexInfo()
                } else {
                    $.log(`\n登录失败`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//个人信息
function indexInfo(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/user/v2/indexInfo`,
            headers: JSON.parse(hd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`\n【欢迎吊毛用户】：${result.data.nickname}`)
                    $.log(`\n【你的邀请码】：${result.data.inviteCode}`)
                    $.message += `\n【欢迎吊毛用户】：${result.data.nickname}`
                    $.message += `\n【你的邀请码】：${result.data.inviteCode}`
                    await $.wait(2000)
                    await signin()
                } else {
                    $.log(`\n【获取个人信息失败】：${result.message}`)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//签到
function signin(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/task/signin`,
            headers: JSON.parse(hd),
            body: `{"sm":{"shuMeiDeviceId":"","appVersion":"","os":"","guestId":""}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`\n【签到】：${result.message}\n`)
                    $.message += `\n【签到】：${result.message}\n`
                    await $.wait(2000)
                    await signinDouble() //签到奖励领取
                    await $.wait(2000)
                    await share() //分享
                    await $.wait(2000)
                    await share() //分享
                    await $.wait(2000)
                    await share() //分享
                    await $.wait(2000)
                    await products() //夺宝
                    await $.wait(38000)
                    await products() //夺宝
                    await $.wait(38000)
                    await products() //夺宝
                    await $.wait(38000)
                    await products() //夺宝
                    await $.wait(38000)
                    await products() //夺宝
                    await $.wait(3000)
                    await startAll(arr)//幸运大转盘
                    await $.wait(2000)
                    //await haggleproducts() //砍价
                    //await $.wait(2000)
                    for (let p = 0; p < 10; p++) {
                        $.index = p + 1
                        $.log(`\n【开始第${p + 1}个看创意视频任务!】\n等待30秒开始看创意视频任务`)
                        $.message += `\n【开始第${p + 1}个看创意视频任务!】\n等待30秒开始看创意视频任务`
                        await watchVideo()
                        await $.wait(30000)
                    }
                    await $.wait(2000) 
                    await choujiang() 
                    await $.wait(2000)
                    //await kanjia() 
                    //await $.wait(2000)
                    await withdrawpage()  //提现
                    await $.wait(2000)
                    await diamondNumber() //账户星钻详细
                } else {
                    $.log(`\n【签到失败】：${result.message}`)
                    await $.wait(2000)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//每日毒鸡汤
function dutang(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `https://api.oick.cn/dutang/api.php`,
            headers: {
                'Accept': 'application/json',
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
            },
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = data
                if (result.length != 0) {
                    $.log(`\n【今日鸡汤】：${result}`)
                    $.message += `\n【今日鸡汤】：${result}`
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//签到奖励领取
function signinDouble(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/task/signinDouble`,
            headers: JSON.parse(hd),
            body: `{"sm":{"shuMeiDeviceId":"","appVersion":"","os":"","guestId":""}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【签到奖励领取】：${result.message}\n`)
                    $.message += `【签到奖励领取】：${result.message}\n`
                } else {
                    $.log(`【签到奖励领取失败】：${result.message}\n`)
                    $.message += `【签到奖励领取失败】：${result.message}\n`
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}


//分享任务
function share(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/task/share`,
            headers: JSON.parse(hd),
            body: `{"sm":{"shuMeiDeviceId":"","appVersion":"","os":"","guestId":""}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【分享任务】：${result.message}\n`)
                    $.message += `【分享任务】：${result.message}\n`
                    await $.wait(2000)
                    await sharejl()
                } else {
                    $.log(`【分享任务失败】：${result.message}\n`)
                    $.message += `【分享任务失败】：${result.message}\n`
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}


//分享奖励领取
function sharejl(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/task/v2/receiveDiamond`,
            headers: JSON.parse(hd),
            body: `{"taskcode":"share","double":false}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【分享奖励领取】：${result.message}\n`)
                    $.message += `【分享奖励领取】：${result.message}\n`
                } else {
                    $.log(`【分享奖励领取失败】：${result.message}\n`)
                    $.message += `【分享奖励领取失败】：${result.message}\n`
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//抽奖领取
function choujiang(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/task/v2/receiveDiamond`,
            headers: JSON.parse(hd),
            body: `{"taskcode":"lotto","double":false}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`\n【抽奖领取】：${result.message}`)
                    $.message += `\n【抽奖领取】：${result.message}`
                } else {
                    $.log(`\n【抽奖领取失败】：${result.message}`)
                    $.message += `\n【抽奖领取失败】：${result.message}`
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//砍价领取
function kanjia(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/task/v2/receiveDiamond`,
            headers: JSON.parse(hd),
            body: `{"taskcode":"haggle","double":false}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`\n【砍价领取】：${result.message}`)
                    $.message += `\n【砍价领取】：${result.message}`
                } else {
                    $.log(`\n【砍价领取失败】：${result.message}`)
                    $.message += `\n【砍价领取失败】：${result.message}`
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//看创意视频
function watchVideo(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/task/watchVideo`,
            headers: JSON.parse(hd),
            body: `{"sm":{"shuMeiDeviceId":"","appVersion":"","os":"","guestId":""},"taskcode":"watchappads"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【看创意视频】：${result.message}\n`)
                    await $.wait(2000)
                    await watchVideojl()
                } else {
                    $.log(`【看创意视频失败】：${result.message}\n`)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//创意视频领取
function watchVideojl(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/task/v2/receiveDiamond`,
            headers: JSON.parse(hd),
            body: `{"taskcode":"watchappads","double":false}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【领取创意视频星钻】：${result.message}\n`)
                } else {
                    $.log(`【领取创意视频星钻失败】：${result.message}\n`)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//砍价信息获取
function haggleproducts(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/haggle/v2/products?pn=1&ps=10`,
            headers: JSON.parse(hd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    pid = result.data.productList[0].pid
                    $.log(`【商品信息】：${result.data.productList[0].title}\n`)
                    $.log(`【价格信息】：${result.data.productList[0].price}\n`)
                    await $.wait(2000)
                    await haggle()
                } else {
                    $.log(`【砍价信息获取失败】：${result.message}\n`)
                    $.message += `【砍价信息获取失败】：${result.message}\n`
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//商品页面
function haggle(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/app/wxshareconfig?type=haggle&id=${pid}`,
            headers: JSON.parse(hd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【访问商品信息】：${result.message}\n`)
                    await $.wait(2000)
                    await list()
                } else {
                    $.log(`【访问商品信息】：${result.message}\n`)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//收获地址
function list(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/userAddress/list?pn=1&ps=20`,
            headers: JSON.parse(hd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    addressid = result.data.id
                    $.log(`【访问地址信息】：${result.message}\n`)
                    await $.wait(2000)
                    await hagglepartake()
                } else {
                    $.log(`【访问地址信息】：${result.message}\n`)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//砍价
function hagglepartake(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/haggle/partake`,
            headers: JSON.parse(hd),
            body: `{"source":"app","pid":"${pid}","plat":"app","target":"4b07e825-dedc-4c4f-a359-bab0f018f625","seconds":"","addressid":"${addressid}","type":"video","sm":{"shuMeiDeviceId":"","appVersion":"","os":"","guestId":""}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【砍价成功】砍价金额：${result.data.cuttedMoney}\n`)
                    $.message += `【砍价成功】砍价金额：：${result.data.cuttedMoney}\n`
                } else {
                    $.log(`【砍价失败】：${result.message}\n`)
                    $.message += `【砍价失败】：${result.message}\n`
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//抽奖信息获取
function products(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/lotto/v2/products?catid=recommend&pn=1&ps=10`,
            headers: JSON.parse(hd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    ppid = result.data[0].pid
                    $.log(`【获取到抽奖信息】：${result.data[0].desc}\n`)
                    $.log(`【参与人数】：${result.data[0].joinnum}\n`)
                    $.message += `【抽奖信息】：${result.data[0].desc}\n`
                    $.message += `【参与人数】：${result.data[0].joinnum}\n`
                    await $.wait(2000)
                    await partake()
                } else {
                    $.log(`【抽奖信息获取失败】：${result.message}\n`)
                    $.message += `【抽奖信息获取失败】：${result.message}\n`
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//免费夺宝
function partake(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/lotto/v2/partake`,
            headers: JSON.parse(hd),
            body: `{"seconds":"","pid":"${ppid}","plat":"app","inviterid":"","type":"video","sm":{"shuMeiDeviceId":"","appVersion":"","os":"","guestId":""}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【免费抽奖成功】获得抽奖码：${result.data.code}\n`)
                    $.message += `【免费抽奖成功】获得抽奖】：${result.data.code}\n`
                } else {
                    $.log(`【免费抽奖失败】：${result.message}\n`)
                    $.message += `【免费抽奖失败】：${result.message}\n`
                    await $.wait(1000)
                    await partake2() //消费抽奖
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//消费夺宝
function partake2(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/lotto/v2/partake`,
            headers: JSON.parse(hd),
            body: `{"seconds":"","pid":"${ppid}","plat":"app","inviterid":"","type":"diamond","sm":{"shuMeiDeviceId":"","appVersion":"","os":"","guestId":""}}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【消费抽奖成功】获得抽奖码：${result.data.code}\n`)
                    $.message += `【消费抽奖成功】获得抽奖码：${result.data.code}\n`
                } else {
                    $.log(`【消费抽奖失败】：${result.message}\n`)
                    $.message += `【消费抽奖失败】：${result.message}\n`
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//幸运大转盘 10次
async function startAll(Array) {
    for (const i of Array) {
      await start(i)
      await $.wait(3000)
    }
  }
//幸运大转盘
function start(num) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/turntable/start`,
            headers: JSON.parse(hd),
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【幸运大转盘】 剩余次数：` + num)
                    $.log(`【大转盘获得】：${result.data.number}星钻\n`)
                    if (result.data.number != 0) {
                        adid=result.data.id
                        await $.wait(32000)
                        await startDouble()
                    }
                } else {
                    $.log(`【幸运大转盘】：${result.message}\n`)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, 0)
    })
}
//大转盘双倍领取
function startDouble(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/turntable/double`,
            headers: JSON.parse(hd),
            body: `{"id":"${adid}"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`【大转盘双倍领取】：${result.message}\n`)
                    $.message += `【大转盘双倍领取】：${result.message}\n`
                } else {
                    $.log(`【大转盘双倍领取】：${result.message}\n`)
                    $.message += `【大转盘双倍领取】：${result.message}\n`
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//提现
function withdrawpage(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/withdraw/withdrawpage`,
            headers: JSON.parse(hd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    if (result.data.activeList[3].amount == 0) {
                        console.log(`\n【金额未到88星钻，未解锁提现】`)
                        $.message += `\n【金额未到88星钻，未解锁提现】`
                    } else {
                        console.log(`【查询到每日提现金额】：${result.data.activeList[3].amount}\n`)
                        amt = result.data.activeList[3].amount
                        await $.wait(2000)
                        await apply()
                    }
                } else {
                    console.log(`【查询每日提现金额失败】：${result.message}\n`)

                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//星钻明细
function diamondNumber(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/task/diamondNumber`,
            headers: JSON.parse(hd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    $.log(`\n【今日获得星钻】：${result.data.today}\n`)
                    $.log(`\n【账户总星钻】：${result.data.total}\n`)
                    $.log(`\n【累计提现】：${result.data.totalwithdraw}元`)
                    $.message += `\n【今日获得星钻】：${result.data.today}`
                    $.message += `\n【账户总星钻】：${result.data.total}`
                    $.message += `\n【累计提现】：${result.data.totalwithdraw}元`
                } else {
                    $.log(`【查询星钻失败】：${result.message}\n`)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//提现
function apply(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/withdraw/apply`,
            headers: JSON.parse(hd),
            body: `{
                "amount": ${amt},
                "withdrawtype": "random",
                "ac": {}
              }`,

            //{"amount":${amt},"withdrawtype":"random","ac":{"brand":"Apple","model":"iPhone6s Plus","oaid":"","os":"ios","imei":" ","imsi":[],"idfv":"8EB9B076-2913-4983-AE70-1D059A13D4E1","aid":""}}
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 200) {
                    console.log(`\n【提现】：${result.message}`)
                    $.message += `\n【提现】：${result.message}`
                } else {
                    console.log(`\n【提现失败】：${result.message}`)
                    $.message += `\n【提现失败】：${result.message}`

                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//通知
async function message() {
    if (tz == 1) {
        $.msg($.name, "", $.message)
    }
    if ($.isNode()) {
        await notify.sendNotify($.name, $.message)
    }
  }

function RT(X, Y) {
    do rt = Math.floor(Math.random() * Y);
    while (rt < X)
    return rt;
}
//Env.min.js  来源https://raw.fastgit.org/chavyleung/scripts/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
