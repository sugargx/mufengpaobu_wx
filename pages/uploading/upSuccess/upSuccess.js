// pages/uploading/upSuccess/upSuccess.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hour:0,
      minute:0,
      second:0,
      url:'',
      long:'',
      dat:'',
      point:'',
      flag:true,
      group:'',
      AdvName:'',
      AdvImg:'',
      // Id:'',
      // GroupId: '',
      TimeAll:'',
      NickName:'',
      TotalPoints:'',
      TotalRun:'',
      LastRank:'',
      ThisRank:'',
      TimeInGroup:'',
      Adv:'',
      d:''
  },
  but:function(){
    wx.switchTab({
      url: '../../mine/mine'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('页面传递信息：', options)
    var that = this
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    });
    console.log('是否上传？', options.flag=='true')
    that.setData({
      hour: parseInt(options.hour),
      minute: parseInt(options.minute),
      second: parseInt(options.second),
      long: parseFloat(options.long),
      url: options.url,
      point: parseInt(options.point),
      // group: options.GroupName,
      TimeAll: options.TimeAll,
      TotalPoints: options.TotalPoints,
      TotalRun: options.TotalRun,
      // LastRank: options.LastRank,
      // ThisRank: options.ThisRank,
      // TimeInGroup: options.TimeInGroup,
      flag: (options.flag==0),
      AdvTitle: options.AdvTitle,
      AdvQRUrl: options.AdvQRUrl,
      NickName: options.NickName
      // Id: options.Id,
      // GroupId: options.GroupID,
    })
    var c = parseInt(Math.random() * 10)
    var d=''
   switch(c){
     case 1: d = "有跑出来的美丽，没有等出来的辉煌"; break;
     case 2: d = "不去尝试永远不会知道自己有多强"; break;
     case 3: d = "时间会证明一切，汗水从不会骗人"; break;
     case 4: d = "Run with an attitude"; break;
     case 5: d = "每件事都能追求到天堂般祟高和完美境界"; break;
     case 6: d = "跑步因为这是生活的象征"; break;
     case 7: d = "生命在于运动--伏尔泰"; break;
     case 8: d = "Your limit is only you!"; break;
     case 9: d = "疲累时加强深呼吸"; break;
   }
   that.setData({
     d: d
  
   })
  },
  previewImage: function (e) {
    var that = this
    // var current = e.target.dataset.src
    wx.previewImage({

      urls: [that.data.url]
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('分享---------------------')
    }
    return {
      title: app.globalData.NickName+'的打卡记录',
      path: '/pages/uploading/upSuccess/upSuccess?hour=' + that.data.hour
      + '&minute=' + that.data.minute
      + '&second=' + that.data.second
      + '&point=' + that.data.point
      + '&long=' + that.data.long
      + '&flag=' + that.data.flag
      + '&url=' + that.data.url
      + '&GroupName=' + that.data.group
      // + '&Id=' + that.data.Id
      // + '&GroupId=' + that.data.GroupId
      + '&NickName=' + that.data.NickName
      + '&TimeAll=' + that.data.TimeAll
      + '&TotalPoints=' + that.data.TotalPoints
      + '&TotalRun=' + that.data.TotalRun
      + '&LastRank=' + that.data.LastRank
      + '&ThisRank=' + that.data.ThisRank
      + '&TimeInGroup=' + that.data.TimeInGroup
      + '&AdvQRUrl=' + that.data.AdvQRUrl
      + '&AdvTitle=' + that.data.AdvTitle,
      success: function (res) {
        console.log('upsuccess分享页面')
        console.log('全局变量：', app.globalData.url)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})