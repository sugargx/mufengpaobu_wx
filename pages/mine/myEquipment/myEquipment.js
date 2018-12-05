var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: '',
    equipments: [],
    page: 1, 
    loadflag: false,
    inputShowed: false
  },
  editEquipment: function (e) {
    wx.navigateTo({
      url: 'myEquipmentEdit/myEquipmentEdit?id=' + e.currentTarget.dataset.id,
    })
  },
  delEquipment: function (e) {
    var that = this
    wx.showModal({
      title: '你确定删除这个装备吗？',
      content: '',
      success:function(res){
        if(res.confirm){
          wx.request({
            method: "DELETE",
            url: app.globalData.url + "/api/equipment/" + e.currentTarget.dataset.id,
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
  getEquipmentList: function () {
    this.setData({
      loadflag:true
    })
    var that = this
    wx.request({
      url: app.globalData.url + "/myEquipment/" + app.globalData.Id + "/" + this.data.page,
      success: function (e) {
        console.log(e.data)
        that.setData({
          equipments: e.data,
          loadflag: false
        })
      }
    })
    this.setData({
      loadflag: false
    })
  },
  showEquipment: function (e){
    console.log('你点击了',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../equipment/equipmentDisplay/equipmentDisplay?id=' + e.currentTarget.dataset.id,
    })
  },
  hidefind: function (){
    var that = this
    wx.request({
      method: "POST",
      url: app.globalData.url + "/findMyEquipment",
      data: {
        name: that.data.inputVal,
        UserMainID:app.globalData.Id
      },
      success: function (e) {
        console.log("查询结果", e.data)
        if (e.data.length == 0) {
          wx.showToast({
            title: '未查到匹配装备',
          })
        } else {
          wx.showToast({
            title: "查到" + e.data.length + "个结果",
          })
          that.setData({
            equipments: e.data
          })
        }
      }
    })
  },
  hideInput: function (){
    this.setData({
      inputShowed: false
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    })
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  addStory: function () {
    console.log("添加跑步故事");
    wx.navigateTo({
      url: '../../equipment/createEquipment/createEquipment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      page: 1,
    })
    this.getEquipmentList()
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
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触发底部事件")
    var that = this
    this.setData({
      page: this.data.page + 1,
      loadflag: true
    })
    var url = "/equipmentPage/"
    wx.request({
      url: app.globalData.url + url + this.data.page,
      success: function (e) {
        if (e.data.length == 0) {
          wx.showToast({
            title: '没有更多装备啦',
          })
        } else {
          var equipments = that.data.equipments;
          console.log(e.data)
          console.log('quipments', equipments)
          var addData = e.data;
          for (var i = 0; i < addData.length; i++) {
            equipments.push(addData[i]);
          }

          that.setData({
            loadflag: false,
            equipments: equipments
          })
        }
      },
      complete: function () {
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