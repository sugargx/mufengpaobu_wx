var app = getApp();
Page({
  data: {
    openId: '',
    user: [],
    userInfo: {},
    flag: false,
    Point: 0,
    newsFlag:false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  saoTap:function(){
    wx.scanCode({
      onlyFromCamera:true,
      scanType: ['qrCode'],
      success:function(res){
        console.log(res)
        wx.request({
          url: '',
        })
      }
    })
  },
  manageTap: function () {
    wx.navigateTo({
      url: 'manage/manage',
    })
  },
  storyTap:function(){
    wx.navigateTo({
      url: 'myStory/myStory',
    })
  },
  equipmentTap:function(){
    wx.navigateTo({
      url: 'myEquipment/myEquipment',
    })
  },
  checkNew: function () {
    var that = this
    wx.request({
      url: app.globalData.url + "/myManagerGroup/" + app.globalData.Id,
      success: function (res) {
        console.log(res.data.state, "检查跑团的动态")
        if (res.data.state == 1) {
          that.setData({
            newsFlag: true
          }) 
          wx.showTabBarRedDot({
            index: 2,
            success: function () {
              console.log("成功显示小红点")
            }
          })
        } else {
          that.setData({
            newsFlag: false
          })
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
  onLoad: function () {
    app.login()
    this.checkNew()
    console.log('onLoad')
    var that = this
    if (app.globalData.userInfo){
      that.setData({
        hasUserInfo: true
      })
    }
    if (!that.data.canIUse) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log('低版本兼容方法：')
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          app.onLaunch()
        }
      })
    }

    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
    var GroupID=[];
    for (var i = 0; i < app.globalData.MyGroupNum;i++){
      if (app.globalData.Status[i]==1){
        GroupID.push(app.globalData.GroupID[i]);
      }
    }
    if (GroupID) {
      wx.request({
        url: app.globalData.url + '/getMyGroupStateUP',
        data: {
          GroupId: GroupID
        },
        header: {
          'content-type': 'application/json'
        }
        //success: function (res) {
        //   console.log('是否有通知：', res.data),
        //     that.setData({
        //       newsFlag: res.data
        //     })
        // },
      })
    }
    that.setData({
      userInfo: app.globalData.userInfo,
      flag: app.globalData.registerFlag,
      Point: app.globalData.Point
    })
    console.log('用户注册状态????????：', app.globalData.registerFlag)
    // wx.request({
    //   url: app.globalData.url + '/getApplicants',
    //   data: {
    //     GroupId: app.globalData.GroupID
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     if (res.data.length != 0) {
    //       that.setData({
    //         newApply: true,
    //       })
    //     } else {
    //       that.setData({
    //         newApply: false,
    //       })
    //     }
    //   }
    // })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo){
      this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
      app.onLaunch()
    }
    
  },
  onShow: function () {
    var that = this;
    that.onLoad();
  },
  wrapTap1: function () {
    wx.navigateTo({
      url: 'record/record?Id=' + app.globalData.Id + '&NickName=' + app.globalData.NickName,
    })
  },
  wrapTap: function () {
    console.log('11_______1')
    if (app.globalData.MyGroupNum == 0) {
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
        url: '../mine/teamManage/teamManage'
      })
    }

  },
  MyWallet: function () {
    wx.navigateTo({
      url: 'wallet/wallet',
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

