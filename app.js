//app.js
import wxValidate from 'utils/wxValidate'
var showPoint = true//给用户一些提示，但只用提示一次
App({
  
  //表单验证
  WxValidate: (rules, messages) => new wxValidate(rules, messages),
  checkNew: function () {
    var that = this
    wx.request({
      url: that.globalData.url + "/myManagerGroup/" + that.globalData.Id,
      success: function (res) {
        console.log(res.data.state, "检查跑团的动态")
        if (res.data.state == 1) {
          wx.showTabBarRedDot({
            index: 2,
            success: function () {
              console.log("成功显示小红点")
            }
          })
        } else {
          wx.hideTabBarRedDot({
            index: 2,
            success: function () {
              console.log("成功消除小红点")
            }
          })
        }
      }
    })
  },
  onLaunch: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        //localhost:8000
        //test12345
        console.log('手机型号', res.model)
        console.log('微信版本号', res.version)
        console.log('客户端基础库版本', res.SDKVersion)
        console.log('版本比较：', res.SDKVersion <= '1.5.0')
        if (res.SDKVersion <= '1.4.0' && showPoint) {
          wx.showModal({
            title: '提示',
            content: '为了您能享受更优质的服务，请将的微信升级为最新版本',
          })
          showPoint = false;
        } else {
          console.log('已经提示过了？', showPoint == false)
        }
      }
    })
    that.login();
    wx.setTopBarText({
      text: '沐风跑步',
      success: function () {
      }
    })
    
  },
  getunionid:function(){
    var that = this
    wx.request({
      url: that.globalData.url + "/getUnionid/" + that.globalData.OpenId,
    })
  },
  login: function (callback) {
    var that = this
      wx.login({
        success: function (res) {
          //console.log('登录成功', res)
          if (res.code) {
            wx.getUserInfo({
              withCredentials: true,
              success: function (re) {
                //console.log('获取的用户信息', re)
                that.globalData.userInfo = re.userInfo
                that.globalData.HeadImgUrl = re.userInfo.avatarUrl
                that.globalData.NickName = re.userInfo.nickName
                //发起网络请求

                wx.request({
                  url: that.globalData.url + '/getopenidUP',
                  data: {
                    code: res.code,
                    HeadImgUrl: that.globalData.HeadImgUrl,
                    NickName: that.globalData.NickName,
                  },
                  success: function (res) {

                    //console.log('服务器返回的结果', res);
                    that.globalData.OpenId = res.data["0"].openid
                    that.globalData.Addlimit = res.data[1].addlimit
                    that.globalData.Id = res.data["0"].Id
                    for (var i = 0; i < res.data[1].addlimit; i++) {
                      that.globalData.GroupID[i] = 0;
                      that.globalData.GroupName[i] = 0;
                      that.globalData.GroupState[i] = 0;
                      that.globalData.Status[i] = 0;
                    }
                    if (res.data[1].registerFlag) {
                      that.globalData.Age = res.data[1]["0"].Age
                      that.globalData.Name = res.data[1]["0"].Name
                      that.globalData.Sex = res.data[1]["0"].Sex
                      that.globalData.Tel = res.data[1]["0"].Tel
                      that.globalData.Speed = res.data[1]["0"].Speed
                      that.globalData.Province = res.data[1]["0"].Province
                      that.globalData.City = res.data[1]["0"].City
                      that.globalData.District = res.data[1]["0"].District
                      that.globalData.DetailedAddr = res.data[1]["0"].DetailedAddr
                      that.globalData.registerFlag = true
                      that.globalData.Point = res.data[1]["0"].TotalPoints
                      that.globalData.MyGroupNum = res.data[1]["0"].GroupNum
                    }
                    for (var i = 0; i < res.data["0"].MyGroup.length; i++) {
                      that.globalData.GroupID[i] = res.data["0"].MyGroup[i].GroupID
                      that.globalData.GroupName[i] = res.data["0"].MyGroup[i].GroupName
                      that.globalData.GroupState[i] = res.data["0"].MyGroup[i].GroupState
                      that.globalData.Status[i] = res.data["0"].MyGroup[i].Type
                    }
                    //console.log('全局变量：', that.globalData)
                    // that.removedatebase()
                    console.log("callback测试");
                    typeof callback == "function" && callback(that.globalData.registerFlag, that.globalData.MyGroupNum)
                    that.checkNew()
                    //that.getunionid()
                    wx.request({
                      url: that.globalData.url + "/getUnionid/" + that.globalData.Id,
                      data:{
                        encryptedData:re.encryptedData,
                        iv:re.iv,
                        session_key: res.data.session_key
                      },
                      success:function(out){
                        //console.log(re,"哈哈哈")
                      }
                    })
                  }
                })
              },
              fail: function (res) {
                console.log('wx.getUserInfo调用失败')
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    
  },
  //版本数据迁移
  removedatebase: function () {
    var that = this
    console.log('数据迁移？');
    wx.request({
      url: 'https://www.mufengpaobu.com/removeDatebaseUP',
      data: {
        Id: that.globalData.Id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data) {
          console.log('数据迁移成功');
        }
      }
    })
  },
  globalData: {//全局变量
  flag:0,
    userInfo: null,
    HeadImgUrl: null,//头像地址
    NickName: null,//昵称
    OpenId: null,//用户唯一标识
    Name: null,//姓名
    Age: null,//年龄
    Sex: null,//性别
    Tel: null,//电话
    Speed: null,//最佳配速
    Province: '山东省', //系统默认山东省淄博市张店区
    City: '淄博市',
    District: '张店区',
    DetailedAddr: null,//详细地址
    registerFlag: false,//是否完善个人信息？
    Id: 0,//OpenId等信息所在表的主键

    Addlimit: 1,
    MyGroupNum: 0,
    MyGroup: [],
    GroupID: [],
    GroupName: [],
    GroupState: [],
    Status: [],//用户身份：0个人1团长2商家3待审4禁用
    // uploadFlag:0,//当天是否打过卡
    Point: 0,//我的积分
    url:'https://www.mufengpaobu.com',
    //url: 'http://localhost',
    token: 'NMNbXh1prAg5nHGNpdoNE4sDC4gPKmkkGSpoXyfG',
  }
})
