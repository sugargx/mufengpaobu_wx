// info.js

var app=getApp();
Page({
  data:{
    pic1:false,
    pic2:false,
    ImagUrl:'',
    QRUrl:'',
    id:"",
    num:'0'
  },
  change:function(e){
    this.setData({
      num: e.detail.value.length
    })
  },
  chooseImage: function () {
    var that=this
    wx.chooseImage({
      sourceType: 'album',
      sizeType: 'compressed',
      count: 1,
      success: function (res) {
        that.setData({
          ImagUrl: res.tempFilePaths,
          pic1:true
        })
      }
    })
  },
  chooseQR: function () {
    var that = this
    wx.chooseImage({
      sourceType: 'album',
      sizeType: 'compressed',
      count: 1,
      success: function (res) {
        that.setData({
          QRUrl:res.tempFilePaths,          
          pic2: true
        })
      }
    })
  },
  previewImage: function (e) {
    var that=this
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: that.data.ImagUrl
    })
  },
  previewQR: function (e) {
    var that = this
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: that.data.QRUrl
    })
  },
  submit:function(e){  
    var that=this
    if (e.detail.value.Name==""){
      wx.showModal({
        title: '请填写广告标题',
        content: '',
        showCancel:false,
      })
    }
    else if (e.detail.value.Name.length>40){
      wx.showModal({
        title: '标题最多可输入40个字',
        content: '',
        showCancel: false,
      })
    }
    else if (e.detail.value.Content==""){
      wx.showModal({
        title: '请填写广告详情',
        content: '',
        showCancel: false,
      })
    }
    else if (e.detail.value.Content.length>200){
      wx.showModal({
        title: '广告详情最多可输入200字',
        content: '',
        showCancel: false,
      })
    }
    else if (e.detail.value.time==""){
      wx.showModal({
        title: '请填写广告在位时间',
        content: '',
        showCancel: false,
      })
    }
    else if (e.detail.value.time<1){
      wx.showModal({
        title: '广告最少在线一天',
        content: '',
        showCancel: false,
      })
    }
    else if (that.data.pic1==false) {
      wx.showModal({
        title: '请放入一张广告图片',
        content: '',
        showCancel: false,
      })
    }
    else if (that.data.pic2==false) {
      wx.showModal({
        title: '请放入一张二维码',
        content: '',
        showCancel: false,
      })
    }
    else {
      wx.showModal({
        title: '是否提交',
        content: '',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.url +'/creatAdv1',
              data: {
                GroupID: app.globalData.GroupID,
                Name: e.detail.value.Name,
                Content: e.detail.value.Content,
                day: e.detail.value.Content.time
              },
              success: function (res) {
                that.setData({
                  id:res.data.Id
                })
                wx.uploadFile({
                  url: app.globalData.url +'/creatAdv2',
                  filePath: that.data.ImagUrl[0],
                  name: 'ad',
                  formData:{
                    id: that.data.id
                  },
                  success: function () {
                    wx.uploadFile({
                      url: app.globalData.url +'/creatAdv3',
                      filePath: that.data.QRUrl[0],
                      name: 'ad',
                      formData:{
                        id: that.data.id
                      },
                      success: function () {
                        wx.showModal({
                          title: '提交成功',
                          content: '',
                          showCancel: false,
                          success: function (e) {
                            if (e.confirm) {
                              wx.navigateBack({

                              })
                            }
                          }
                        })
                      }

                    })

                  }
                })
              }
            })
          }
        }
      })
    
    }
  }
})