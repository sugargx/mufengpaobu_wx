var app = getApp()
var WxParse = require('../../../wxParse/wxParse.js');
// pages/story/storyDisplay/storyDisplay.js
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    id: 0,
    zanNum:0,
    storyName:"",
    content:"",
    writerName:"",
    created_at:0,
    images: [],
    comments:[],
    hiddenmodalput:true,
    commentId:0,
    replayVal: "",
    num:0,
    hiddenShang:true,
    haveConment:false,
    dispalyWay:1,
    array:[1.0,2.0,6.0,10.0],
    index:0,
    money:0,
    textarea:true,
    options:[]
  },
  changeMoney:function(e){
    console.log(e.target.dataset.money)
    this.setData({
      money: e.target.dataset.money
    })
  },
  inputMoney:function(e){
    console.log(e.detail.value,"输入的金额")
    this.setData({
      money: e.detail.value
    })
  },
  shangCancle:function(){
    this.setData({
      hiddenShang: true,
      textarea: true
    })
  },
  shangConfirm: function () {
    var that = this
    var moneyReg = new RegExp("^\\d+(\\.\\d{1,2})?$", 'g')
    if (!(moneyReg.test(this.data.money))){
      wx.showToast({
        title: '打赏金额不合法！',
      })
      return ;
    }
    if (that.data.writerID == app.globalData.Id){
      wx.showToast({
        title: '不可打赏自己！',
      })
      return;
    }
    
    wx.request({
      url: app.globalData.url + '/WxPay',
      method: "POST",
      data: {
        'storyId': that.data.id,
        'openid': app.globalData.OpenId,
        'money': that.data.money*100,
        "jieshou_id": that.data.writerID,
        "dashang_id": app.globalData.Id,
      },
      success: function (res) {
        console.log(res.data)
        var jsapi = res.data.data.jsapi
        wx.requestPayment({
          timeStamp: jsapi.timeStamp,
          nonceStr: jsapi.nonceStr,
          package: jsapi.package,
          signType: jsapi.signType,
          paySign: jsapi.paySign,
          success: function () {
            wx.request({
              url: app.globalData.url + "/WxPaySuccess",
              method: "POST",
              data: {
                order_id: res.data.data.order
              },
              success:function(){
                wx.showToast({
                  title: '打赏成功！',
                })
                that.setData({
                  hiddenShang: true,
                  textarea: true
                })
              }
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '打赏失败！',
            })
            that.setData({
              hiddenShang:true,
              textarea: true
            })
            console.log("打赏失败")
          }
        })
      }
    })
  },
  daShang:function(){
    var that = this
    // wx.showModal({
    //   title: '该功能尚未上线，敬请期待！',
    //   content: '',
    // })
    // return ;
   
    
    this.setData({
      hiddenShang:false,
      textarea:false
    })
  },
  reply:function(e){
    this.setData({
      hiddenmodalput: false,
      commentId: e.currentTarget.dataset.id,
      textarea: false
    })
    console.log(e.currentTarget.dataset.id)
  },
  replyInput:function(e){
    console.log(e.detail.value,"回复内容")
    this.setData({
      replayVal: e.detail.value
    })
  },
  change:function(e){
    this.setData({
      num: e.detail.value.length
    })
  },
  confirm:function(){
    var that = this
    this.setData({
      hiddenmodalput: true
    })
    if (that.data.replayVal.length<10){
      wx.showModal({
        title: '回复不得少于10个字符！',
        content: '',
      })
      return ;
    }
    wx.request({
      url: app.globalData.url + "/reply",
      method:"POST",
      data:{
        name: app.globalData.NickName,
        'type':"story",
        commentId: that.data.commentId,
        content: that.data.replayVal,
        'HeadImgUrl': app.globalData.HeadImgUrl
      },
      success: function () {
        var options = { id: that.data.id }
        that.onLoad(options)
        that.setData({
          textarea: true,
          clear:""
        })
      },
      complete:function(){
        that.setData({
          textarea: true
        })
        wx.showToast({
          title: '回复成功！',
        })
      }
    })
  },
  cancel:function(){
    this.setData({
      hiddenmodalput: true,
      textarea: true
    })
  },
  formSubmit: function(e){
    var that = this
      console.log(e.detail.value,"提交评论表单")
      if (e.detail.value.Content.length<10){
        wx.showModal({
          title: '评论内容不得少于10个字符！',
          content: '',
        })
        return ;
      }
      wx.request({
        url: app.globalData.url + "/comment",
        method:"POST",
        data:{
          id:that.data.id,
          "type":"story",
          'name': app.globalData.NickName,
          content: e.detail.value.Content,
          'HeadImgUrl': app.globalData.HeadImgUrl
        },
        success: function () {
          var options = { id: that.data.id }
          that.onLoad(options)
          that.setData({
            clear:""
          })
          wx.showToast({
            title: '评论成功！',
          })
        }
      })
  },
  getComment:function(){
    var that = this
    wx.request({
      url: app.globalData.url + "/comment/" + that.data.id + "/story",
      success:function(res){
        console.log(res.data,"文章回复")
        if(res.data.length>0){
          that.setData({
            haveConment: true
          })
        }
        that.setData({
          comments: res.data
        })
      }
    })
  },
  getStory: function (){
    var that = this
    wx.request({
      method: "GET",
      url: app.globalData.url + "/api/story/" +that.data.id+"?userid="+app.globalData.Id,
      success: function (e){
        //console.log(e,"获取到的文章")
        that.setData({
          storyName: e.data.storyName,
          created_at: e.data.created_at.split(' ')[0],
          writerName: e.data.writerName,
          content: e.data.content,
          images: e.data[0],
          zanNum: e.data.zanNum,
          writerID: e.data.UserMainID,
          dispalyWay:e.data.type,
          pageview:e.data[1].pageview
        })
        if (that.data.dispalyWay == 1) {
          //console.log("开始解析html", that.data.content)
          WxParse.wxParse('article', 'html', that.data.content, that, 5);
        }
      }
    })
  },
  getZanAndDaShang:function(){
    var that = this
    wx.request({
      url: app.globalData.url + "/zanAndDaShang/" + that.data.id,
      success:function(res){
        console.log(res.data,"打赏和赞")
        that.setData({
          zanNames: res.data.zanNames,
          zanNums: res.data.zanNum,
          daShangNames: res.data.rewardNames,
          rewardNum: res.data.rewardNum
        })
      }
    })
  },
  zanTap: function (){
    var that = this
    wx.request({
      method:"GET",
      url: app.globalData.url + "/zanNum/" + that.data.id +"/" + app.globalData.Id,
      success:function(res){
        console.log(res)
        that.setData({
          zanNum: res.data.num
        })
        that.getZanAndDaShang()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options,"收到的数据")
    this.setData({
      options: options,
      id: options.id,
      money:that.data.array[that.data.index]
    })
    this.getStory()
    this.getZanAndDaShang()
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