var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    user: [],
    userInfo: {},
    flag: false,
    Point: 0,
    status: false,//是否为正常运作跑团的团长
    statu1: false,
    statu3: false,
    newApply: false
  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      flag: app.globalData.registerFlag,
      Point: app.globalData.Point
    })
    that.onLoad()
    console.log('用户注册状态????????：', that.data.flag)
    wx.stopPullDownRefresh()
  },
  info: function () {
    wx.navigateTo({
      url: 'userinfo/userinfo',
    })
  },

  manageTap: function () {
    wx.navigateTo({
      url: 'manage/manage',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
    if (app.globalData.GroupID) {
      wx.request({
        url: app.globalData.url + '/getMyGroupState',
        data: {
          GroupId: app.globalData.GroupID,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {

          app.globalData.GroupState = res.data
          that.setData({
            status: (res.data == '1' && app.globalData.Status == 1),//正常运作跑团团长
            statu2: ((res.data == '0' && app.globalData.Status == 1)),//建团待审团长
            statu3: (app.globalData.Status == 3)//入团待审个人
          })
          console.log('我的跑团状态', that.data.status)
        },
      })
    }

    that.setData({
      userInfo: app.globalData.userInfo,
      flag: app.globalData.registerFlag,
      Point: app.globalData.Point
    })
    console.log('用户注册状态????????：', app.globalData.registerFlag)
    wx.request({
      url: app.globalData.url + '/getApplicants',
      data: {
        GroupId: app.globalData.GroupID
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.length != 0) {
          that.setData({
            newApply: true,
          })
        } else {
          that.setData({
            newApply: false,
          })
        }
      }
    })
  },
  onShow: function () {
    var that = this;
    that.onLoad();
  },
  wrapTap1: function () {
    wx.navigateTo({
      url: 'record/record',
    })
  },
  wrapTap: function () {
    console.log('11_______1')
    if (app.globalData.GroupID == 0) {
      wx.showModal({
        title: '主人，加入个跑团先！',
        confirmText: "去加入 ",
        cancelText: "再看看",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../index/runRun/runGroup/runGroup'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../mine/teamManage/teamManage?Id=' + app.globalData.GroupID,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

  },
  MyWallet: function () {
    wx.showModal({
      title: '主人，钱包空空！',
      showCancel: false,
    })
  },
  GroupWallet: function () {
    if (app.globalData.GroupID) {
      wx.showModal({
        title: '主人，团钱包空空！',
        showCancel: false,
      })
    } else {
      wx.showModal({
        title: '需加入跑团才可使用！',
        confirmText: "去加入 ",
        cancelText: "再看看",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../index/runRun/runGroup/runGroup'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  }
})

