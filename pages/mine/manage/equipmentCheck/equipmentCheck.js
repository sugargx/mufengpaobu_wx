var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    GroupId: 0,
    equipmentList: [],
    none: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getList: function () {
    this.setData({
      equipmentList: []
    })
    var that = this
    console.log(that.data.GroupId, "跑团id")
    wx.request({
      url: app.globalData.url + "/equipmentCheck/" + that.data.GroupId,

      success: function (res) {
        console.log(res.data,"需要审核的装备")
        that.setData({
          equipmentList: res.data,
          none: res.data.length
        })
      }
    })
  },
  showStory: function (e) {
    console.log(e.target.dataset.id)
    wx.navigateTo({
      url: '../../../equipment/equipmentDisplay/equipmentDisplay?id=' + e.target.dataset.id,
    })
  },
  accept: function (e) {
    var that = this
    console.log(e.target.dataset.id)
    wx.request({
      method: "POST",
      url: app.globalData.url + "/equipmentCheck",
      data: {
        equipmentId: e.target.dataset.id,
        option: "accept",
        openid: e.target.dataset.openid,
        formid: e.detail.formId,
      },
      success:function (res){
        console.log(res,"审核结果")
        that.getList()
      }
    })
    
  },
  refuse: function (e) {
    var that = this
    wx.request({
      method: "POST",
      url: app.globalData.url + "/equipmentCheck",
      data: {
        equipmentId: e.target.dataset.id,
        option: "refuse",
        openid: e.target.dataset.openid,
        formid: e.detail.formId,
      },
      success: function(){
        that.getList()
      }
    })
    
  },
  onLoad: function (options) {
    this.setData({
      GroupId: options.GroupId
    })
    this.getList()
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
    this.getList()
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