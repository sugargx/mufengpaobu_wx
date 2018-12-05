// pages/mine/wallet/record/record.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    recordArr:[]
  },
  getWalletRecord:function(){
    var that = this
    wx.request({
      url: app.globalData.url + "/wallet/record/"+ app.globalData.Id + "/" +that.data.page,
      success:function(res){
        if (res.data.errorcode==1){
          wx.showToast({
            title: '没有更多了！',
          })
          return ;
        }
        console.log(res,"交易记录")
        var resdata = res.data.datas
        var temp = that.data.recordArr
        for (var i = 0; i < resdata.length; i++) {
          temp.push(resdata[i]);
        }
        that.setData({
          recordArr: temp
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWalletRecord()
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
    this.setData({
      page:1,
      recordArr:[],
    })
    this.getWalletRecord()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    that.setData({
      page:that.data.page + 1
    })
    that.getWalletRecord()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})