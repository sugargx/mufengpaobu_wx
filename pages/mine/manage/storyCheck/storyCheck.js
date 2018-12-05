var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    GroupId:0,
    storyList:[],
    none:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getList: function (){
    this.setData({
      storyList:[]
    })
    var that = this
    console.log(that.data.GroupId,"跑团id")
    wx.request({
      url: app.globalData.url + "/storyCheck/" + that.data.GroupId,
     
      success:function (res){
        console.log(res.data)
        that.setData({
          storyList:res.data,
          none: res.data.length
        })
      }
    })
  },
  showStory: function (e){
    console.log(e.target.dataset.id)
    wx.navigateTo({
      url: '../../../story/storyDisplay/storyDisplay?id=' + e.target.dataset.id,
    })
  },
  accept: function (e){
    var that = this
    console.log(e.target.dataset.id)
    wx.request({
      method: "POST",
      url: app.globalData.url + "/storyCheck",
      data:{
        openid: e.target.dataset.openid,
        storyId: e.target.dataset.id,
        option: "accept",
      },
      success:function(res){
        that.getList()
        console.log(res,"审核返回信息!")
      }
    })
    
  },
  refuse: function (e) {
    var that = this
    wx.request({
      method: "POST",
      url: app.globalData.url + "/storyCheck",
      data: {
        storyId: e.target.dataset.id,
        option: "refuse",
        formid: e.detail.formId,
        openid: e.target.dataset.openid,
      },
      success: function () {
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