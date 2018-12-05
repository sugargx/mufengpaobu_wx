var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: '',
    storys: [],
    page: 1,
    loadflag: true,
    sortMode: 1
  },
  change: function (){
    this.setData({
      sortMode: !this.data.sortMode
    })
    this.onLoad()
  },
  getStoryList: function (){
    var url = "";
    if(this.data.sortMode==1){
      url = "/storyPage/"
    }else{
      url = "/storyPageReDu/"
    }
    var that = this
    wx.request({
      url: app.globalData.url + url + this.data.page,
      success: function (e){
        console.log(e.data,"加载到的文章")
        that.setData({
          storys: e.data,
          loadflag: false
        })
        for(var i = 0;i<e.data.length;i++){
          var storyindex = "storys[" + i + "].content"
          that.setData({
            [storyindex]:that.delHtmlTag(that.data.storys[i].content)
          })
          //that.data.storys[i].content = that.delHtmlTag(that.data.storys[i].content);
        }
      }
    })
  },
  delHtmlTag:function (str)
  {
    str = str.replace(/<[^>]+>/g, "")
    str = str.replace(/&nbsp;/g, "");
    str = str.replace(/&quot;/g, "")
    str = str.replace(/&apos;/g, "")
    str = str.replace(/&lt;/g, "")
    str = str.replace(/&gt;/g, "")
    return str;//去掉所有的html标记
  },
  showInput: function (){
    this.setData({
      inputShowed:true
    })
  },
  hideInput: function () {
    var that = this
    that.setData({
      inputVal: "",
      inputShowed: false
    });
    that.onLoad();
  },
  inputTyping: function (e){
    this.setData({
      inputVal: e.detail.value
    })
  },
  hidefind :function (){
    var that = this
    wx.request({
      method: "POST",
      url: app.globalData.url + "/findStory",
      data: {
        name: that.data.inputVal
      },
      success: function (e){
        console.log("查询结果",e.data)
        if(e.data.length==0){
          wx.showToast({
            title: '未查到匹配文章',
          })
        }else{
          wx.showToast({
            title: "查到" + e.data.length + "篇文章",
          })
          that.setData({
            storys:e.data
          })
          for (var i = 0; i < e.data.length; i++) {
            var storyindex = "storys[" + i + "].content"
            that.setData({
              [storyindex]: that.delHtmlTag(that.data.storys[i].content)
            })
            //that.data.storys[i].content = that.delHtmlTag(that.data.storys[i].content);
          }
        }
      }
    })
  },
  addStory: function (){
    console.log("添加跑步故事");
    wx.navigateTo({
      url: 'createStory/createStory',
    })
  },
  showStory: function (e){
    console.log(e,"查看文章")
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'storyDisplay/storyDisplay?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      page:1
    })
    this.getStoryList()
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
      page:1
    })
    this.getStoryList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触发底部事件")
    var that = this
    this.setData({
      page:this.data.page+1,
      loadflag: true
    })
    var url = ""
    if(this.data.sortMode==1){
      url = "/storyPage/"
    }else{
      url = "/storyPageReDu/"
    }
    wx.request({
      url: app.globalData.url + url + this.data.page,
      success: function (e) {
        if(e.data.length==0){
          wx.showToast({
            title: '没有更多文章啦',
          })
        }else{
          var storys = that.data.storys;
          console.log(e.data)
          var addData = e.data;
          for (var i = 0; i < addData.length; i++) {
            addData[i].content = that.delHtmlTag(addData[i].content)
          }
          for (var i = 0; i < addData.length; i++) {
            storys.push(addData[i]);
          }

          that.setData({
            loadflag: false,
            storys: storys
          })
        }
      },
      complete: function(){
        that.setData({
          loadflag: false
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})