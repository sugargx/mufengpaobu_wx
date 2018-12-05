// pages/mine/record/record.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  dat:'',
  aa:false,
  GroupName:'',
   LastRank:'',
  ThisRank:'',
  TimeInGroup:'',
  delBtnWidth:'',
   flagg:false,
   bigflag:false,
   
useId:0   
  },
  touchS: function (e) {
    console.log('121212sisisisiis')
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {

    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      if (disX >= 90) {
        this.setData({
          flagg: true
        })

      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;

      var list = this.data.list;
      if (index) {
        list[index].style = txtStyle;

        //更新列表的状态
        this.setData({
          list: list
        });
        console.log(this.data.list)
      }
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      console.log(e);
        list[index].style = txtStyle;
        //更新列表的状态
        this.setData({
          list: list
        });
    }
  },
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
   
    this.setData({
      delBtnWidth: 90
    });
   
  },
  del: function (e) {
    var that = this;
    var index =  e.currentTarget.dataset.index

   
    wx.showModal({
      content: '请问您是否要删除' + that.data.list[index].Date+"的打卡信息？",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/RemoveRunUP',
            data: {
              Id: app.globalData.Id,
              originalDate: that.data.list[index].originalDate,
              Distance: that.data.list[index].Distance
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              if (res.data) {
                wx.showModal({
                  content: '已将' + that.data.list[index].Date + "的打卡信息移除！",
                  showCancel: false,
                })
                var list1 = that.data.list
                for (let i = index; i < list1.length - 1; i++) {

                  list1[i] = list1[i + 1];
                }
               
                list1.pop();
                that.setData({
                  list: list1
                })
              } else {
                wx.showModal({
                  title: '删除失败',
                  showCancel: false,
                })
              }

            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.initEleWidth();
    that.setData({
      useId: options.Id,
      NickName: options.NickName
    })
    if (that.data.useId == app.globalData.Id){
      that.setData({
        bigflag:true
      })
    }
    wx.request({
      url: app.globalData.url + '/getMyRunListUP', 
      data: {
        Id: that.data.useId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
         list:res.data
        })
        console.log(res)
     
      }
    })
  },
  recordTap: function () {
    wx.navigateTo({
      url: '../analysis1/analysis1',
    })
  },
  warp:function(e){
    var Id = parseInt(e.target.id/2);
    var that = this
    console.log(Id)
    wx.request({
      url: app.globalData.url + '/runDetail',
      data: {
        Id: Id
      },
      
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        wx.navigateTo({
          url:
          '../../uploading/upSuccess/upSuccess?hour=' + res.data[0].hour
          + '&minute=' + res.data[0].minute
          + '&second=' + res.data[0].second
          + '&point=' + res.data[0].Point
          + '&long=' + res.data[0].Distance   
          + '&url=' + res.data[0].ImgUrl
          + '&GroupName=' + that.data.GroupName
          + '&NickName=' + res.data[0].NickName
          + '&TimeAll=' + res.data[0].TimeAll
          + '&TotalPoints=' + res.data[0].TotalPoints
          + '&TotalRun=' + res.data[0].TotalRun
          + '&AdvQRUrl=' + res.data[1].AdvQRUrl
          + '&AdvTitle=' + res.data[1].AdvTitle
        })
        
      }
    })
  },
  warp1: function (e) {
    var Id = parseInt(e.target.id / 2);
    var that = this
    that.setData({
      flagg:false
    })
    console.log(Id)
    wx.request({
      url: app.globalData.url + '/runDetail',
      data: {
        Id: Id
      },

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        wx.navigateTo({
          url:
          '../../uploading/upSuccess/upSuccess?hour=' + res.data[0].hour
          + '&minute=' + res.data[0].minute
          + '&second=' + res.data[0].second
          + '&point=' + res.data[0].Point
          + '&long=' + res.data[0].Distance
          + '&url=' + res.data[0].ImgUrl
          + '&GroupName=' + that.data.GroupName
          + '&NickName=' + res.data[0].NickName
          + '&TimeAll=' + res.data[0].TimeAll
          + '&TotalPoints=' + res.data[0].TotalPoints
          + '&TotalRun=' + res.data[0].TotalRun
          + '&AdvQRUrl=' + res.data[1].AdvQRUrl
          + '&AdvTitle=' + res.data[1].AdvTitle
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
  onPullDownRefresh: function (options) {
    var that = this
   
    that.onLoad()
  
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
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('分享---------------------')
    }
    return {
      title: that.data.NickName + '的历史记录',
      path: '/pages/mine/record/record?Id=' + that.data.useId + '&NickName=' + that.data.NickName,
      success: function (res) {
        console.log('历史记录')
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})