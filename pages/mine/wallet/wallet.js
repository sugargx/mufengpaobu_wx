var app = getApp();
// pages/mine/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:0,
    page:1,
    recordArr: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  walletMoney:function(){
    var that = this
    wx.request({
      url: app.globalData.url + '/wallet/money/' + app.globalData.Id,
      success:function(res){
        console.log(res)
        that.setData({
          money: res.data.money / 100
        })
      }
    })
  },
  showRecord:function(){
    wx.navigateTo({
      url: 'record/record',
    })
  },
  getWalletRecord: function () {
    var that = this
    wx.request({
      url: app.globalData.url + "/wallet/record/" + app.globalData.Id + "/" + that.data.page,
      success: function (res) {
        console.log(res, "交易记录")
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
  onLoad: function (options) {
    this.walletMoney()
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