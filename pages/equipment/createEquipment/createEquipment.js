var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    imgNum: 0,
    equipmentId:0,
    num:0,
    AddGroupFlag:true,
    checkboxItems:[]
  },
  delImage: function (e){
    console.log(e.target.dataset.url)
    var url = e.target.dataset.url
    var IMG = []
    for (var i = 0; i < this.data.images.length;i++){
      if (this.data.images[i].ImgUrl != url){
        IMG.push(this.data.images[i])
      }else{
        console.log("删除")
      }
    }
    this.setData({
      images: IMG,
      imgNum: IMG.length
    })
    console.log(this.data.images)
  },
  uploadImages: function () {
    var that = this
    var imgs = this.data.images
    for (var i = 0; i < imgs.length; i++) {
      console.log("id", that.data.storyId)
      console.log('图片', imgs[i])
      wx.uploadFile({
        url: app.globalData.url + "/equipmentImage",
        filePath: imgs[i].ImgUrl,
        name: 'image',
        formData: {
          id: that.data.equipmentId
        },
        header: {
          'content-type': 'application/json',
          'enctype': 'multipart/form-data'
        },

        success: function (res) {
          console.log('(装备img)：', res.data)
        }
      })
    }
  },
  change: function (e) {
    this.setData({
      num: e.detail.value.length
    })
  },
  formSubmit: function (e){
    var that = this
    console.log('发送的数据',e)
    
    if (e.detail.value.EquipmentName.length==0){
      wx.showToast({
        title: '请输入装备名称！',
      })
      return ;
    } 
    if (e.detail.value.EquipmentBrand.length == 0) {
      wx.showToast({
        title: '请输入装备品牌',
      })
      return;
    }
    if (e.detail.value.EquipmentPrice == 0) {
      wx.showToast({
        title: '请输入装备价格',
      })
      return;
    }
    if (e.detail.value.Phone.length == 0) {
      wx.showToast({
        title: '请输入联系方式',
      })
      return;
    }
    if (e.detail.value.EquipmentIntroduce.length==0){
      wx.showToast({
        title: '请输入装备介绍！',
      })
      return;
    }
    if (this.data.images.length<=0){
      wx.showToast({
        title: '请选择一张图片！',
      })
      return;
    }
    if (this.data.images.length >5 ) {
      wx.showToast({
        title: '选择图片过多！',
      })
      return;
    }
    var moneyReg = new RegExp("^[0-9]+(.[0-9]{1,3})?$", 'g')
    if (!moneyReg.test(e.detail.value.EquipmentPrice)){
      wx.showToast({
        title: '价格不合法！',
      })
      return ;
    }
    var phoneReg = new RegExp("^1[34578]\\d{9}$",'g')
    if (!phoneReg.test(e.detail.value.Phone)) {
      wx.showToast({
        title: '手机号不合法！',
      })
      return;
    }
    // if (!e.detail.value.group) {
    //   wx.showToast({
    //     title: '请选择审核跑团',
    //   })
    //   return;
    // }
    console.log(this.data.images.length)
    // console.log(e.detail.value.group[0],"提交至")
    // var groupid = e.detail.value.group[0]
    wx.request({
      url: app.globalData.url + "/api/equipment",
      method: 'POST',
      data:{
        EquipmentName: e.detail.value.EquipmentName,
        EquipmentIntroduce: e.detail.value.EquipmentIntroduce,
        EquipmentPrice: e.detail.value.EquipmentPrice,
        Phone: e.detail.value.Phone,
        EquipmentBrand: e.detail.value.EquipmentBrand,
        groupId: e.detail.value.group,
        UserMainID: app.globalData.Id
      },
      success: function (e){
        console.log("当前装备的id",e.data.id)
        that.setData({
          equipmentId: e.data.id
        })
        that.uploadImages()
        wx.showToast({
          title: '发布成功！',
        })
        wx.navigateBack({
          
        })
        wx.showModal({
          title: '发布成功!',
        })
      }
    })
  },
  chooseImage: function () {
    console.log(this.data.images)
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
          [img]: { ImgUrl: res.tempFilePaths[0] },
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
      success: function (res) {
        console.log(res.data, "我的跑团")
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