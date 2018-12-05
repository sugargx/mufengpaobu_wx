// runGroup/runGroup/runGroup.js
var app = getApp()
Page({
  data: {
  },

  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  wrapTap: function (e) {
    wx.navigateTo({
      url: '../../index/runRun/teamIntroduce/teamIntroduce?Id=' + e.currentTarget.dataset.index,
    })
  },
  createGroup: function () {
    if (app.globalData.Addlimit > app.globalData.MyGroupNum) {
      if (app.globalData.registerFlag == false) {
        wx.showModal({
          title: "您的信息未完善，请先完善您的信息后再来创建跑团",
          confirmText: "去完善 ",
          cancelText: "再看看",
          success: function (e) {
            if (e.confirm) {
              wx.navigateTo({
                url: '../userinfo/userinfo',
              })
            }
          }
        })
      } else {
        wx.redirectTo({
          url: '../../index/runRun/creatGroup/creatGroup',
        })
      }
    } else {
      wx.showModal({
        title: '警告',
        content: '每人最多可加入' + app.globalData.Addlimit + '个跑团',
      })
    }

  },
  recordTap:function (e){
    console.log('管理', e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../manage/manage?Id=' + e.currentTarget.dataset.index,
    })
  },
  onLoad: function () {
    var that=this
    if (app.globalData.Addlimit > app.globalData.MyGroupNum)//检测个人是否还有建团的资格
      that.setData({
        showCreate: true
      })
    wx.request({
      url: app.globalData.url + '/getMyGroupListUP',
      data: {
        GroupId: app.globalData.GroupID,
        Status: app.globalData.Status,
        GroupState: app.globalData.GroupState
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('app.globalData.GroupID', app.globalData.GroupID)
        console.log('app.globalData.Status', app.globalData.Status )
        console.log('app.globalData.GroupState', app.globalData.GroupState)
        console.log('我加入的跑团：',res)
        that.setData({
          dat: res.data,
          loadflag: false
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    app.onLaunch()
    that.onLoad()
    console.log('show我的跑团')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that=this
    app.onLaunch()
    that.onLoad()
    app.onLaunch()
    that.onLoad()
    wx.stopPullDownRefresh()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    GetList(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})