// pages/index/runRun/teamIntroduce/rankList/rankList.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var i = 0;
    // wx.showToast({
    //   title: '数据加载中',
    //   icon: 'loading',
    //   duration: 1000
    // });
    var Id = options.Id;
    wx.request({
      url: app.globalData.url + '/rankListUP',
      data: {
        teamId: Id
      },
      success: function (res) {
        console.log('今日打卡列表', res)
        that.setData({
          dat: res,
        })
      }
    })

  },
  userTap: function (e) {
    var Id = e.currentTarget.dataset.index
    console.log('用户名？', e.currentTarget.dataset);
    console.log(Id, '121212122222')
    wx.navigateTo({
      url: '../../../../mine/record/record?Id=' + Id,
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})