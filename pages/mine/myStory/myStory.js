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
    loadflag: true
  },
  getStoryList: function (){  
    var that = this
    wx.request({
      url: app.globalData.url + "/myStory/"+ app.globalData.Id + "/" + this.data.page,
      success: function (e){
        console.log(e.data)
        that.setData({
          storys: e.data,
          loadflag: false
        })
      }
    })
  },
  submitCheck:function(e){
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
      title: '您确定要提交审核吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + "/submitCheck"  ,
            data:{
              id: e.currentTarget.dataset.id
            },
            success: function (e) {
              console.log(e.data)
              that.onLoad()
            },
            complete:function(){
              that.onLoad()
            }
          })
        } else if (res.cancel) {

        }
      }
    })

  },
  delStory:function(e){
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
      title: '您确定要删除这篇文章吗？',
      content: '',
      success:function(res){
        if(res.confirm){
          wx.request({
            method: "DELETE",
            url: app.globalData.url + "/api/story/" + e.currentTarget.dataset.id,
            success: function (e) {
              console.log(e.data)
              that.onLoad()
            }
          })
        }else if(res.cancel){
          
        }
      }
    })
    
    
  },
  editStory:function(e){
    wx.navigateTo({
      url: 'myStoryEdit/myStoryEdit?id=' + e.currentTarget.dataset.id,
    })
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
      url: app.globalData.url + "/findMyStory",
      data: {
        name: that.data.inputVal,
        UserMainID:app.globalData.Id
      },
      success: function (e){
        console.log("查询结果",e.data)
        if(e.data.length==0){
          wx.showToast({
            title: '未查到匹配文章',
          })
        }else{
          wx.showToast({
            title: "成功查到" + e.data.length + "篇文章",
          })
          that.setData({
            storys: e.data
          })
        }
      }
    })
  },
  addStory: function (){
    console.log("添加跑步故事");
    wx.navigateTo({
      url: '../../story/createStory/createStory',
    })
  },
  showStory: function (e){
    console.log(e,"查看文章")
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../story/storyDisplay/storyDisplay?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    this.onLoad()
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

  
    wx.request({
      url: app.globalData.url + "/myStory/" + app.globalData.Id + "/" + this.data.page,
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