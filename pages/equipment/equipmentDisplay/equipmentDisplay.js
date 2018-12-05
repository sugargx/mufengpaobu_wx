var app = getApp()
// pages/equipment/equipmentdisplay/equipmentdisplay.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    introduce:"",
    name:"", 
    phone:"",
    price:0,
    time:"",
    brand:"",
    images:[],
    comments: [],
    hiddenmodalput: true,
    commentId: 0,
    replayVal: "",
    id:0,
    num:0,
    options:[],
    textarea:false
  },
  reply: function (e) {
    this.setData({
      hiddenmodalput: false,
      commentId: e.currentTarget.dataset.id,
      replyValue:"",
      textarea:true
    })
    console.log(e.currentTarget.dataset.id)
  },
  replyInput: function (e) {
    this.setData({
      replayVal: e.detail.value
    })
    console.log(e.detail.value,"回复的内容")
    
  },
  change: function (e) {
    this.setData({
      num: e.detail.value.length
    })
  },
  confirm: function () {
    var that = this
    this.setData({
      hiddenmodalput: true,
      textarea:false
    })
    if (that.data.replayVal.length<10){
      wx.showModal({
        title: '回复内容不得少于10个字符！',
        content: '',
      })
      return ;
    }
    wx.request({
      url: app.globalData.url + "/reply",
      method: "POST",
      data: {
        name: app.globalData.NickName,
        'type': "equipment",
        commentId: that.data.commentId,
        content: that.data.replayVal,
        'HeadImgUrl': app.globalData.HeadImgUrl
      },
      success:function(){
        wx.showToast({
          title: '回复成功！',
        })
        var options = { id: that.data.id }
        that.onLoad(options)
        this.setData({
          replayVal: e.detail.value
        })
      }
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      textarea:false
    })
  },
  formSubmit: function (e) {
    var that = this
    console.log(e.detail.value, "提交评论表单",)
    if (e.detail.value.Content.length<10){
      wx.showModal({
        title: '评论不得少于10个字符！',
        content: '',
      })
      return ;
    }
    wx.request({
      url: app.globalData.url + "/comment",
      method: "POST",
      data: {
        id: that.data.id,
        "type": "equipment",
        'name': app.globalData.NickName,
        content: e.detail.value.Content,
        'HeadImgUrl': app.globalData.HeadImgUrl
      },
      success:function(){
        var options = { id: that.data.id}
        that.onLoad(options)
        that.setData({
          areaValue:""
        })
        wx.showToast({
          title: '评论成功！',
        })
      }
    })
  },
  getComment: function () {
    var that = this
    wx.request({
      url: app.globalData.url + "/comment/" + that.data.id + "/equipment",
      success: function (res) {
        console.log(res.data, "文章回复")
        that.setData({
          comments: res.data,
          haveConment: res.data.length
        })
      }
    })
  },
  previewImage: function (e){
    var that = this;
    console.log(e.currentTarget.dataset.url)
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: that.data.images,
    })
  },
  getEquipment: function (id) {
    var that = this
    wx.request({
      method: "GET",
      url: app.globalData.url + "/api/equipment/" + id,
      success: function (e) {
        console.log(e)
        that.setData({
          introduce: e.data.introduce,
          name:e.data.name,
          phone:e.data.phone,
          price:e.data.price,
          time:e.data.created_at.split(' ')[0],
          images:e.data[0],
          brand: e.data.brand
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id:options.id,
      options:options      
    })
    this.getEquipment(options.id)
    this.getComment()
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
    this.onLoad(this.data.options)
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