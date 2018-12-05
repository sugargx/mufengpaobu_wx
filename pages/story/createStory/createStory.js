var app = getApp()

Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    images : [],
    imgNum : 0,
    num: 0,
    storyId: 0,
    AddGroupFlag:true,
    checkboxItems:[]
  },
  delImage: function (e) {
    console.log(e.target.dataset.url)
    var url = e.target.dataset.url
    var IMG = []
    for (var i = 0; i < this.data.images.length; i++) {
      if (this.data.images[i].ImgUrl != url) {
        IMG.push(this.data.images[i])
      } else {
        console.log("删除")
      }
    }
    this.setData({
      images: IMG,
      imgNum: IMG.length
    })
    console.log(this.data.images)
  },
  change: function (e){
    this.setData({
      num: e.detail.value.length
    })
  },
  uploadImages: function (){
    var that = this
    var imgs = this.data.images
    for(var i = 0;i<imgs.length;i++){
      console.log("id",that.data.storyId)
      console.log('图片',imgs[i])
      wx.uploadFile({
        url: app.globalData.url + "/image",
        filePath: imgs[i].ImgUrl,
        name: 'image',
        formData: {
          id: that.data.storyId
        },
        header: {
          'content-type': 'application/json',
          'enctype': 'multipart/form-data'
        },

        success: function (res) {
          //console.log('(跑步img)：', res.data)
        }
      })
    }
  },
  formSubmit: function (e){
    console.log(e,"所有提交内容")
    console.log(e.detail.value.group,"团队编号")
    var that = this
    var storyName = e.detail.value.StoryName;
    var content = e.detail.value.Content;
    var formid = e.detail.formId 
    console.log(storyName)
    console.log(content)
    if(storyName.length==0){
      wx.showToast({
        title: '请输入文章题目',
      })
      return ;
    }
    if (storyName.length > 30) {
      wx.showToast({
        title: '题目过长',
      })
      return;
    }

    if (content.length==0){
      wx.showToast({
        title: '请输入文章内容',
      })
      return;
    }
    if (content.length > 1000) {
      wx.showToast({
        title: '内容过长',
      })
      return;
    }
    if (!e.detail.value.group){
      wx.showToast({
        title: '请选择审核团队',
      })
      return ;
    }
    console.log(app.globalData.GroupID[0])
    var groupid = e.detail.value.group
    wx.request({
      method: "POST",
      url: app.globalData.url + "/api/story",
      data:{
        storyName: storyName,
        content: content,
        writerName: app.globalData.NickName,
        groupId: groupid,
        UserMainID: app.globalData.Id,
        formid: formid
      },
      success: function (e){
        console.log(e)
        console.log(formid,"formid")
        that.setData({
          storyId: e.data.id
        })
        that.uploadImages()
        wx.navigateBack({
          
        })
        wx.showModal({
          title: '文章已保存!',
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.ImgUrl
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album'],//建团不能直接上传拍照的图片，不然会显得不正规
      sizeType: 'compressed',
      count: 1,
      success: function (res) {
        console.log(res)
       
        var img = "images[" + that.data.imgNum + "]"
        console.log(img)
        that.setData({
          imgNum: that.data.imgNum + 1,
          [img] : { ImgUrl: res.tempFilePaths[0]},
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.url + "/myGroup/" + app.globalData.Id,
      success: function (res){
        console.log(res.data,"我的跑团")
        that.setData({
          checkboxItems: res.data
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