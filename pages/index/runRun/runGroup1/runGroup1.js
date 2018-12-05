// runGroup/runGroup/runGroup.js
var app = getApp()
var Jd = 0;
var Wd = 0;
var page = 1;
var url = app.globalData.url +'/runGroup';
var GetList = function (that) {
  page++;
  console.log('下拉caozuo ')
  wx.request({
    url: url,
    data: {
      Jd: Jd,
      Wd: Wd,
      page: page,
    },
    success: function (res) {
      console.log('下拉加载res', res)
      var dat = that.data.dat;
      for (var i = 0; i < res.data.length; i++) {
        dat.push(res.data[i]);
      }
      that.setData({
        dat: dat,
        loadflag: (res.data.length != 0)
      });

      that.setData({
        hidden: true
      });
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dat: [],
    loadflag: false,
    inputShowed: false,
    inputVal: ""
  },
  hidefind: function () {
    var that = this
    if (that.data.inputVal.length > 10) {
      wx.showModal({
        title: '抱歉,未找到跑团',
        // content: '',

        success: function (res) {
        }
      })
    }
    else {
      wx.request({
        url: app.globalData.url +'/find', //仅为示例，并非真实的接口
        data: {
          key: that.data.inputVal,


        },

        success: function (res) {

          that.setData({
            dat: res.data,

          })
          if (res.data.length == '0') {
            wx.showModal({
              title: '抱歉,未找到跑团',
              // content: '',

              success: function (res) {


              }
            })
          }
        }
      })
    }
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    var that = this
    that.setData({
      inputVal: "",
      inputShowed: false
    });
    that.onLoad();
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  wrapTap: function (e) {
    var teamId = e.currentTarget.dataset.index
    console.log(teamId);
    wx.navigateTo({
      url: '../teamIntroduce/teamIntroduce?Id=' + e.currentTarget.dataset.index,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  changeTap: function () {
    wx.redirectTo({
      url: '../runGroup/runGroup',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // wx.showToast({
    //   title: '数据加载中',
    //   icon: 'loading',
    //   duration: 1000
    // });
    that.setData({
      loadflag: true
    })
    page = 1;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       scrollHeight: res.windowHeight
    //     });
    //   }
    // });
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     Jd = res.longitude
    //     Wd = res.latitude
    //     var latitude = res.latitude
    //     var longitude = res.longitude
        
    //   }
    // })
    wx.request({
      url: app.globalData.url + '/allGroup', //仅为示例，并非真实的接口
      data: {
        // City: app.globalData.City,
        page: page
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.length)
        that.setData({
          dat: res.data,
          loadflag: false
        })
        if (res.data.length == '0') {
          wx.showModal({
            title: '抱歉,未找到跑团',
            // content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '../runRun'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })

  },
  // bindDownLoad: function () {
  //   var that = this;
  //   GetList(that);
  // },

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
    var that = this;
    GetList(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})