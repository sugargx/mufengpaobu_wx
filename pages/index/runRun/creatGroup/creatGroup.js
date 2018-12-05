// creatGroup.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,//是否完善个人信息
    GroupName:'',
    TotalDistance:'',
    PeopleCount:'',
    ImgUrl:'', 
    Introduce:'',
    Img:{},
    NameExist:false,
	  num:''
  },
  checkName: function (e) {
    var that = this
    wx.request({
      url: app.globalData.url +'/checkName',
      data: {
        GroupName: e.detail.value,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data!=0){
          that.setData({
            NameExist: true
          })
        } else if (res.data == 0){
          that.setData({
            NameExist: false
          })
        }
      }
    })
  },
  change:function(e){
    this.setData({
      num: e.detail.value.length
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //表单验证
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    });
    this.WxValidate = app.WxValidate(
      {
        GroupName: {
          required: true,
          minlength: 3,
          maxlength: 10,
        },
        Introduce: {
          required: true,
          minlength: 30,
          maxlength: 200,
        },
        PeopleCount: {
          required: true,
          number:true,
        },
        TotalDistance: {
          required: true,
          number: true,
        },
      }
      , {
        GroupName: {
          required: '请填写跑团名',
        },
        Introduce: {
          required: '请填写团队介绍',
        },
        PeopleCount: {
          required: '请填写线下跑团人数',
        },
        TotalDistance: {
          required: '请填写线下跑团跑量',
        }
      }
    )
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album'],//建团不能直接上传拍照的图片，不然会显得不正规
      sizeType: 'compressed',
      count: 1,
      success: function (res) {
        console.log(res)
        that.setData({
          ImgUrl: res.tempFilePaths,
          Img:res,
          flag: "true",
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
  formSubmit: function (e) {
    var that=this
    // console.log('this',this)
    if (that.data.NameExist){
      wx.showModal({
        title: '请修改团名称',
        showCancel: false,
      })
    }else if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList["0"].msg
      // `${error.param} : ${error.msg} `
      console.log(this.WxValidate)
      console.log(this.WxValidate.checkForm(e))
      wx.showModal({
        title: error
      })
    } else if ((JSON.stringify(that.data.Img).length == 2)){
      wx.showModal({
        title: '请选择图片',
        showCancel: false,
      })
    }else{
      var formID = e.detail.formId;
      var that = this
      console.log(e.detail.value);
      wx.showModal({
        title: '确认创建跑团？',
        content: '创建了跑团,您需要时刻关注团内建设,做一个负责的团长！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            console.log('表单数据：', e.detail.value.PeopleCount)
            console.log('openid的Id', app.globalData.Id)
            //获取跑团位置
            wx.getLocation({
              type: 'wgs84',
              success: function (res) {
                console.log(res)
                var Jd = res.longitude
                var Wd = res.latitude
                console.log('经度：', res.longitude)
                console.log('纬度：', res.latitude)
                wx.uploadFile({
                  url: app.globalData.url +'/creatGroupUP', 
                  filePath: that.data.Img.tempFilePaths["0"],
                  name: 'file',
                  formData: {
                    'Jd': Jd,
                    'Wd': Wd,
                    'GroupName': e.detail.value.GroupName,
                    'Introduce': e.detail.value.Introduce,
                    'PeopleCount': e.detail.value.PeopleCount,
                    'TotalDistance': e.detail.value.TotalDistance,
                    //团长的地址就是团所在的地址
                    'Province': app.globalData.Province,
                    'City': app.globalData.City,
                    'District': app.globalData.District,
                    'DetailedAddr': app.globalData.DetailedAddr,
                    'Id': app.globalData.Id,
                    'openid': app.globalData.OpenId,
                    'formid': formID
                  },
                  success: function (res) {
                    console.log(res.data);
                    //把用户信息Status从0改到1,把跑团ID存入GroupID
                    // app.globalData.Status = 1
                    // app.globalData.GroupID = parseInt(res.data)
                    // app.globalData.GroupState=0
                    // app.globalData.GroupName = e.detail.value.GroupName
                    // console.log('我的信息：', app.globalData)
                    wx.showModal({
                     content: '建团信息已提交,等待管理员审核！',
                      showCancel: false,
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                          app.onLaunch()
                          wx.navigateBack({
                            delta: 2
                          })
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                })
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
    wx.stopPullDownRefresh()
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