// userinfo.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Name:'',
    Age: '',
    Sex: '',
    Tel: '',
    Speed:'',
    region: ['山东省', '淄博市', '张店区'],
    DetailedAddr:'山东理工大学',
    operate:'提 交',
    minute:0,
    seconde:0
  },
  onPullDownRefresh: function () {
    var that = this
    that.onLoad()
    wx.stopPullDownRefresh()
  },
  formSubmit: function (e) {
    var that=this
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList["0"].msg
      // `${error.param} : ${error.msg} `
      console.log(this.WxValidate)
      console.log(this.WxValidate.checkForm(e))
      wx.showModal({
        title: error
      })
    } else {
      console.log("提交了：：：：", e.detail.value)
      wx.showModal({
        title: '确认提交？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            console.log('app.globalData.OpenId：', app.globalData.OpenId)
            app.globalData.Name = e.detail.value.Name
            app.globalData.Age = e.detail.value.Age
            app.globalData.Sex = e.detail.value.Sex
            app.globalData.Tel = e.detail.value.Tel
            app.globalData.Speed = parseInt(e.detail.value.minute)*60 + parseInt(e.detail.value.seconde)
            app.globalData.Province = e.detail.value.region[0]
            app.globalData.City = e.detail.value.region[1]
            app.globalData.District = e.detail.value.region[2]
            app.globalData.DetailedAddr = e.detail.value.DetailedAddr
            console.log('全局的Speed：', parseInt(e.detail.value.seconde))
            wx.request({
              url: app.globalData.url +'/uploaduserinfo',
              data: {
                openid: app.globalData.OpenId,
                Name: e.detail.value.Name,
                Age: e.detail.value.Age,
                Sex: e.detail.value.Sex,
                Tel: e.detail.value.Tel,
                Speed: parseInt(e.detail.value.minute) * 60+parseInt(e.detail.value.seconde),
                Province: e.detail.value.region[0],
                City: e.detail.value.region[1],
                District: e.detail.value.region[2],
                DetailedAddr: e.detail.value.DetailedAddr,
              },
              success: function (resu) {
                console.log('request？', resu.data)
                
                var pages = getCurrentPages();
                var currPage = pages[pages.length - 1];
                var prevPage = pages[pages.length - 2];
                prevPage.setData({
                  flag: true
                })
                if (resu.data){
                  app.globalData.registerFlag = true
                  wx.showModal({
                    title: '恭喜',
                    content:'信息提交成功,是否返回原来页面?',
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack({
                          delta: 1
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                  that.setData({
                    operate: '修 改'
                  })
                }else{
                  wx.showModal({
                    title: '数据未修改！',
                    showCancel: false
                  })
                }
                
              }
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
    //表单验证
    this.WxValidate = app.WxValidate(
      {
        Name: {
          required: true,
          minlength: 2,
          maxlength: 50,
        },
        Age: {
          required: true,
        },
        Sex: {
          required: true,
        },
        Tel: {
          required: true,
          tel:true
        },
        minute: {
          required: true,
          number: true
        },
        seconde: {
          required: true,
          number: true
        },
        DetailedAddr: {
          required: true,
          minlength: 2,
          maxlength: 20,
        }
      }
      , {
        Name: {
          required: '请填写您的姓名',
        },
        Age: {
          required: '请填写您的年龄',
        },
        Sex: {
          required: '请选择您的性别',
        },
        Tel: {
          required: '请填写您的手机号',
        },
        minute: {
          required: '请填写完整配速',
        },
        seconde: {
          required: '请填写完整配速',
        },
        DetailedAddr: {
          required: '请输入您的详细地址',
        }
      }
    ),
    that.setData({
      Name: app.globalData.Name, 
      Age: app.globalData.Age,
      Sex: app.globalData.Sex,
      Tel: app.globalData.Tel,
      minute: parseInt(app.globalData.Speed / 60) == 0 ? '' : parseInt(app.globalData.Speed / 60),
      seconde: (parseInt(app.globalData.Speed) % 60) == 0 ? '' : (parseInt(app.globalData.Speed) % 60),
      region: [app.globalData.Province, app.globalData.City, app.globalData.District],
      DetailedAddr: app.globalData.DetailedAddr
    })
    if (app.globalData.registerFlag)
      that.setData({
        operate:'修 改'
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  submit:function(e){
    var user=e.detail.value;
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
  
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})