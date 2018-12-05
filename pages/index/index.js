//index.js
//获取应用实例
var app = getApp()
// var tempFilePath1 = null, tempFilePath2 = null, tempFilePath3 = null
Page({
  data: {
    flag:false,
    flag1:1,
    totalRun:0,
    RunWan:0,
    RunYi:0,
    totalPeople:0,
    myRun:'--',
    myRunWan:'--',
    myci:'--'
  },
  teamTap:function(){

    wx.navigateTo({
      url: 'runRun/runGroup/runGroup',
    })
  
  },

  storyTap: function () {
    wx.navigateTo({
      url: '../story/story',
    })
  },
  equipmentTap: function (){
    wx.navigateTo({
      url: '../equipment/equipment',
    })
  },
  contact:function(){
    wx.showModal({
      title: '联系方式',
      content: '合作咨询:13561669366',
    })
  },
  no: function () {
    wx.showModal({
      title: '该功能尚未上线，敬请期待',
      content: '',
      showCancel: false,
      cancelText: '',
      cancelColor: '',
      confirmText: '',
      confirmColor: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onShow: function () {
  },
  onLoad: function (options) {
    // sleep(1)
    var that = this
    wx.showLoading({
      title: '数据加载中',
    })
    console.log('index已经开始执行');
    wx.request({
      url: app.globalData.url+'/getIndexUP', 
      data: {
      },
      success: function (res) {
        that.setData({
          totalRun: (res.data[0]).toFixed(2),
          totalPeople: res.data[1],
        })
        if (that.data.totalRun>=10000){
          that.setData({
            RunWan: (res.data[0] / 10000).toFixed(2),
          })
        } else if (that.data.totalRun >= 100000000) {
          that.setData({
            RunYi: (res.data[0] / 100000000).toFixed(2),
          })
        }
      }
    })
////////////////////////////
if (app.globalData.Id!=0){//如果我的app在index之前加载完
  console.log('app.globalData.registerFlag', app.globalData.registerFlag)
  console.log('app.globalData.MyGroupNum', app.globalData.MyGroupNum)
  console.log('app.globalData.Id', app.globalData.Id)
  that.setData({
    flag: app.globalData.registerFlag,
    flag1: app.globalData.MyGroupNum
  })
  
  console.log('入团数量app.globalData.MyGroupNum', that.data.flag1)
  if (that.data.flag1) {
    wx.request({
      url: app.globalData.url + '/getMyUP',
      data: {
        Id: app.globalData.Id,
        token: app.globalData.token
      },
      success: function (res) {
        that.setData({
          myRun: (res.data[0]).toFixed(2),
          myci: res.data[1]
        })
        if (res.data[0] >= 10000) {
          that.setData({
            myRunWan: (res.data[0] / 10000).toFixed(2),
          })
        }
      }
    })
  }
  wx.hideLoading()
}else{
  app.login(function (registerFlag, MyGroupNum) {
    that.setData({
      flag: registerFlag,
      flag1: MyGroupNum
    })
    if (MyGroupNum) {
      wx.request({
        url: app.globalData.url + '/getMyUP',
        data: {
          Id: app.globalData.Id,
          token: app.globalData.token
        },
        success: function (res) {
          that.setData({

            myRun: (res.data[0]).toFixed(2),
            myci: res.data[1]
          })
          if (res.data[0] >= 10000) {
            that.setData({
              myRunWan: (res.data[0] / 10000).toFixed(2),
            })
          }
          console.log(res.data, '11111111111111111111124444')
          wx.hideLoading()
        }
      })
    } else {
      wx.hideLoading()
    }
  })

}
    
///////////////////////////
    
  },
  onShow:function (){
    this.onLoad()
    console.log('onshow111111111')
  },
  joinTap: function () {


    wx.navigateTo({
      url: 'runRun/runGroup/runGroup',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  creatTap: function () {
    if (this.data.flag == false) {
      wx.showModal({
        title: "您的信息未完善，请先完善您的信息后再来创建跑团",
        confirmText: "去完善 ",
        cancelText: "再看看",
        success: function (e) {
          if (e.confirm) {
            wx.navigateTo({
              url: '../mine/userinfo/userinfo',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        }
      })
    }
    else {
      wx.navigateTo({
        url: 'runRun/creatGroup/creatGroup',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  onPullDownRefresh: function () {
    var that = this
    that.onLoad()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: function () {

  }
})
// {
//   "text": "发现",
//     "pagePath": "pages/find/find",
//       "iconPath": "images/find1.png",
//         "selectedIconPath": "images/find2.png"
// },