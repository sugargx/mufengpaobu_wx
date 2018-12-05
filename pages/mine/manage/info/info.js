// info.js
var app=getApp();
var info=[];
var flag=false;
var ImgChange=0;
var thisGroupID = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Name:'',
    Content:'',
    ImagUrl:'',
    num:'0'
  },
  change:function(e){
    this.setData({
      num: e.detail.value.length
    })
  },
  onLoad: function (options){
    thisGroupID=options.GroupId
    var that =this
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
    wx.request({
      url: app.globalData.url +'/getGroupInfoUP',
      data: {
        GroupID: thisGroupID
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        info=res.data
        that.setData({
          Name:info[0].GroupName,
          Content:info[0].Introduce,
          ImagUrl:info[0].ImgUrl,
          num: info[0].Introduce.length
        })
        // var downloadUrl = 'https:'+info[0].ImgUrl.split(":")[1]
        // console.log('下载路径：', downloadUrl)
        // wx.downloadFile({
        //   url: downloadUrl,
        //   success: function (res) {
        //     that.setData({
        //       ImagUrl: res.tempFilePath
        //     })
            
        //   }
        // })
        console.log('本地图片下载路径：', that.data.ImagUrl)
      }
    })
    that.WxValidate = app.WxValidate(
    {
        Name: {
          required: true,
          minlength: 3,
          maxlength: 10,
        },
        Content: {
          required: true,
          minlength: 30,
          maxlength: 200,
        }
    }
  , {
        Name: {
          required: '请填写跑团名称',
        },
        Content: {
          required: '请填写跑团介绍',
        }
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album'],//建团不能直接上传拍照的图片，不然会显得不正规
      sizeType: 'compressed',
      count: 1,
      success: function (res) {
        if(res.tempFiles[0].size>280000){ 
          wx.showModal({
          title: '您上传的图片过大，请勿上传原图',
        })
        }else{ 
          that.setData({
          ImagUrl: res.tempFilePaths['0'],
        })
          ImgChange=1//图片修改了
          flag = true
        }
      }
    })
  },
  previewImage: function (e) {
    var that=this
    var current = e.target.dataset.src
    wx.previewImage({

      urls: [that.data.ImagUrl]
    })
  },
  submit:function(e){
    var that=this
    console.log('图片是否修改：', ImgChange);
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList["0"].msg
      // `${error.param} : ${error.msg} `
      console.log(this.WxValidate)
      console.log(this.WxValidate.checkForm(e))
      wx.showModal({
        title: error
      })
    } else{
      wx.showModal({
        title: '是否修改团信息',
        success: function (res) {
          console.log('介绍：', e.detail.value.Content)
          console.log('图片地址：',that.data.ImagUrl)
          if (res.confirm) {
            if (ImgChange==1){
              wx.uploadFile({
                url: app.globalData.url + '/changeGroupInfoUP',
                filePath: that.data.ImagUrl,
                name: 'upInfo',
                formData: {
                  token: app.globalData.token,
                  GroupID: thisGroupID,
                  Content: e.detail.value.Content,
                  ImgChange: ImgChange,
                },
                success: function (res) {
                  console.log('修改团图片返回信息', res.data)
                  if (res.data == "1") {
                    ImgChange = 0//形成闭环
                    wx.showModal({
                      title: '修改成功',
                      content: '是否返回上一页面',
                      success: function (res) {
                        if (res.confirm) {
                          wx.navigateBack({
                          })
                        }
                      }
                    })
                  } else {
                    wx.showModal({
                      title: '信息未修改',
                      showCancel: false,
                    })
                  }
                }
              })
            } else if (ImgChange==0){
              wx.request({
                url: app.globalData.url + '/changeGroupInfoUP',
                data: {
                  token: app.globalData.token,
                  upInfo: that.data.ImagUrl,
                  GroupID: thisGroupID,
                  Content: e.detail.value.Content,
                  ImgChange: ImgChange,
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  console.log('修改团图片返回信息', res.data)
                  if (res.data == "1") {
                    ImgChange = 0//形成闭环
                    wx.showModal({
                      title: '修改成功',
                      content: '是否返回上一页面',
                      success: function (res) {
                        if (res.confirm) {
                          wx.navigateBack({
                          })
                        }
                      }
                    })
                  } else {
                    wx.showModal({
                      title: '信息未修改',
                      showCancel: false,
                    })
                  }
                }
              })
            }
            
          }
        }
      })
      /*
            wx.showModal({
        title: '是否修改团信息',
        success:function(res){
          if(res.confirm){
            that.setData({
              Name: e.detail.value.Name,
              Content: e.detail.value.Content
            })
            wx.request({
              url: app.globalData.url +'/changeGroupInfo1UP',
              data:{
                GroupID: thisGroupID,
                Name: that.data.Name,
                Content: that.data.Content
              },
              success:function(){
                if(flag==true)
                {
                  wx.uploadFile({
                    url: app.globalData.url +'/changeGroupInfo2UP',
                    filePath: that.data.ImagUrl[0],
                    name: 'upInfo',
                    success: function (res) {
                      console.log('修改团图片返回信息：',res.data)
                      if(res.data==true){
                        wx.showModal({
                          title: '修改成功',
                          content: '是否返回上一页面',
                          success: function (res) {
                            if (res.confirm) {
                              wx.navigateBack({
                              })
                            }
                          }
                        })
                      }else{
                        wx.showModal({
                          title: '修改失败',
                          showCancel: false,
                        })
                      }
                    }
                  })
                }
                else{
                  wx.showModal({
                    title: '修改成功',
                    content: '是否返回上一页面',
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack({

                        })
                      }
                    }
                  })
                }
              }
            })
          }
        }
      })
      */
    }
  }
})