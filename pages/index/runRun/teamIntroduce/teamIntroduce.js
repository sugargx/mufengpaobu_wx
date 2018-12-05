// logs/runGroup/teamIntroduce/teamIntroduce.js
var advFlag=false;
// var information= false;
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
    ],
    thisExamine:false,
    groupIDnow:0,//当前跑团id
    myInThisGroup:false,//我是否在这个跑团
    GroupStatenow:0,//我此刻跑团状态
    Statusnow:0,//我在此刻跑团的身份状态
    oprator: false,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    changeflag:false,
    manageflag:false,
    tId:0,
    upLoad:false,
    // detialFlag:false,

    imgUrls1: [
    ],
    adveImageurl: [
    ],

    advQrurl:[
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
    ],
    runUrl:[],
    dat:[],
    RunWan:0,
    RunYi:0,
  },
  actionSheetTap: function () {
    var that = this

    wx.showActionSheet({
      itemList: ['退出跑团'],
      success: function (e) {

        if (e.tapIndex == 0) {
          wx.showModal({
            title: "确认退出" + that.data.dat.data["0"]["0"].GroupName + "?",
            confirmText: "确定",
            cancelText: "取消",
            success: function (e) {
              if (e.confirm) {
                wx.request({
                  url: app.globalData.url + '/quitGroupUP',
                  data: {
                    Id: app.globalData.Id,
                    GroupId: that.data.groupIDnow
                  },
                  success: function (res) {
                    console.log(res)
                    if (res.data) {
                      wx.showToast({
                        title: '退团成功',
                        icon: 'success',
                        duration: 3000,
                        success:function (){
                          that.setData({
                            thisExamine: false,
                            upLoad: false,
                            oprator: false
                          })
                          app.onLaunch()
                          var options = {}
                          options.Id = that.data.groupIDnow
                          that.onLoad(options)
                          setTimeout(function(){
                            wx.navigateBack({
                              delta: 1
                            })
                          },1000)
                        }
                      });
                    }
                    else {
                      wx.showModal({
                        title: "退出跑团失败！请重试",
                        showCancel: false
                      })
                    }
                  }
                })

              } else if (e.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }

      }
    })

  },
  dismiss: function () {
    var that = this

    wx.showActionSheet({
      itemList: ['解散跑团'],
      success: function (e) {
        if (e.tapIndex == 0) {
          wx.showModal({
            title: "确认解散" + that.data.dat.data["0"]["0"].GroupName + "?",
            confirmText: "确定",
            cancelText: "取消",
            success: function (e) {
              if (e.confirm) {
                wx.request({
                  url: app.globalData.url + '/dismissGroupUP',
                  data: {
                    Id: app.globalData.Id,
                    GroupId: that.data.groupIDnow
                  },
                  success: function (res) {
                    console.log(res)
                    if (res.data) {
                      wx.showToast({
                        title: '解散成功',
                        icon: 'success',
                        duration: 3000,
                        success: function () {
                          app.onLaunch();
                          setTimeout(function () {
                            wx.navigateBack({
                              delta: 1
                            })
                          }, 1000)
                        }
                      });
                    }
                    else {
                      wx.showModal({
                        title: "解散跑团失败！请重试",
                        showCancel: false
                      })
                    }
                  }
                })

              } else if (e.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }

      }
    })

  },
   onShareAppMessage: function (res) {
     var that=this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('分享---------------------')
    }
    console.log('that.dat:', that.data.dat.data["0"]["0"].GroupName)
    return {
      title: that.data.dat.data["0"]["0"].GroupName,
      path: '/pages/index/runRun/teamIntroduce/teamIntroduce?Id=' + that.data.groupIDnow,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
//    detialFlagTap:function(e){  
//      var that=this
//      console.log('打卡个人id:',e)
//      wx.request({//获取用户打卡状态
//        url: app.globalData.url +'/getRunImg', 
//        data: {
//          Id: app.globalData.Id,
//          GroupId: app.globalData.GroupID
//        },
//        success: function (res) {
//          that.setData({
//            detialFlag: true,
//            runUrl:res.data
//         })
//       }
//     })
// } ,
//   detialFlagTap1:function(){
//     this.setData({
//       detialFlag:false
//     })
//   },
upLoadTap:function(){
    // if (app.globalData.uploadFlag==0){
      wx.switchTab({
        url: '../../../uploading/uploading',
        success: function (res) {
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    // }else{
    //   wx.showModal({
    //     title: '每天只能打一次卡哦，歇一歇，明天再来吧！',
    //     showCancel:false,
    //   })
    // }
  },
itemTap0: function (e) {
  var that = this
  wx.navigateTo({
    url: 'advertising/advertising?Id=' + that.data.groupIDnow,
  })

},
  closeTap:function () {

    this.setData({
      advFlag: false
    }
    );  
  },
  analysisTap:function() {
    var that=this
    wx.navigateTo({
      url: 'analysis/analysis?Id=' + that.data.groupIDnow,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  joinTap:function(e){
    var formID = e.detail.formId;
    console.log('用户所在的跑团ID：', app.globalData.GroupID)
    console.log('用户身份状态：', app.globalData.Status)
    console.log('用户所在跑团的状态：', app.globalData.GroupState)
    console.log('加入跑团的formId:::::::::', formID)
    if (app.globalData.MyGroupNum >= app.globalData.Addlimit) {
      wx.showModal({
        title: "每人只能加入" + app.globalData.Addlimit + "个跑团！",
      })
    }
    //  else if (that.data.myInThisGroup && that.data.Statusnow==3) {//如果已经提交申请，但审核暂未通过
    // var that=this
    //   wx.showModal({
    //     title: '友情提示:',
    //     content: '您有一入团申请待审核，本次申请将覆盖上一次申请？',
    //     // showCancel: false, 
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.request({
    //           url: app.globalData.url +'/applyGroup', //仅为示例，并非真实的接口地址
    //           data: {
    //             GroupID: that.data.groupIDnow,
    //             ID: app.globalData.Id,
    //             formid: formID,
    //             openid: app.globalData.OpenId,
    //           },
    //           success: function (res) {
    //             console.log(res)
    //             if (res.data) {
    //               app.globalData.GroupID = that.data.groupIDnow
    //               app.globalData.Status = 3
    //             }
    //             wx.showToast({
    //               title: '加入成功等待团长审核',
    //               icon: 'success',
    //               duration: 3000
    //             });
    //             // wx.showModal({
    //             //   title: '加入成功等待团长审核',
    //             //   showCancel: false,
    //             //   success: function (res) {
    //             //     if (res.confirm) {
    //             //       console.log('用户点击确定')
    //             //     } else if (res.cancel) {
    //             //       console.log('用户点击取消')
    //             //     }
    //             //   }
    //             // })
    //           }
    //         })
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }
    else{
      if (app.globalData.registerFlag == false) {//如果未完善信息
        wx.showModal({
          title:'信息未完善',
          content: "您的信息未完善，请先完善您的信息后再次申请加入",
          confirmText: "确定",
          cancelText: "取消",
          success: function (e) {
            if (e.confirm) {
              wx.navigateTo({
                url: '../../../mine/userinfo/userinfo',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            } else {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        //填写加入跑团的代码
        var that = this
        wx.showModal({
          title: '确认加入该跑团？',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.request({
                url: app.globalData.url +'/applyGroupUP',
                data: {
                  GroupID: that.data.groupIDnow,
                  ID: app.globalData.Id,
                  formid: formID,
                  openid: app.globalData.OpenId,
                },
                success: function (res) {
                  console.log(res)
                  if (res.data) {
                    app.onLaunch()
                  }
                  wx.showToast({
                    title: '加入成功等待团长审核',
                    icon: 'success',
                    duration: 3000,
                    success:function(){
                      that.setData({
                        thisExamine:true,
                        upLoad:false,
                        oprator: false
                      })
                      app.onLaunch()
                      // var options = {}
                      // options.Id = that.data.groupIDnow
                      // that.onLoad(options)
                    }
                  });
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })      
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var i = 0;
    // wx.showToast({
    //   title: '数据加载中',
    //   icon: 'loading',
    //   duration: 1000
    // });
    var Id=options.Id;
    that.setData({
      tId:Id
    })
    for (; i < app.globalData.MyGroupNum;i++){
      if (options.Id == app.globalData.GroupID[i]) {
        console.log('找到啦，我在',i,'跑团')
        that.setData({
          groupIDnow: app.globalData.GroupID[i],//当前跑团id
          myInThisGroup: true,//我是否在这个跑团
          GroupStatenow: app.globalData.GroupState[i],//此刻跑团状态
          Statusnow: app.globalData.Status[i],//我在此刻跑团的身份状态
        })
        console.log('groupIDnow:', that.data.groupIDnow)
        console.log('myInThisGroup:', that.data.myInThisGroup)
        console.log('GroupStatenow:', that.data.GroupStatenow)
        console.log('Statusnow:', that.data.Statusnow)
        break;
      }else{
        console.log('不是ID:', i)
      }
    }
    console.log('跑团ID的索引值：',i)
    that.setData({
      groupIDnow: options.Id,//把当前页面的ID存起来
      GroupStatenow: app.globalData.GroupState[i],//我此刻跑团状态
      Statusnow: app.globalData.Status[i],//我在此刻跑团的身份状态
      // manageNum: (app.globalData.Status[i] == 1) && (app.globalData.GroupID[i] == that.data.groupIDnow),
      upLoad: (that.data.myInThisGroup) && (that.data.GroupStatenow==1),
      thisExamine: (that.data.myInThisGroup) && (that.data.GroupStatenow == 0 || that.data.Statusnow == 3),
      oprator: (that.data.myInThisGroup)&&(app.globalData.Status[i] == 0) && (app.globalData.GroupID[i] == that.data.groupIDnow) && (app.globalData.MyGroupNum>0),
    })
    
    wx.request({
      url: app.globalData.url +'/teamIntroduceUP', 
      data: {
        teamId:Id 
      },
      success: function (res) {
        console.log('今日打卡列表',res)
        that.setData({
          dat: res,
        })
        // that.setData({
        //   "dat.data[0][0].TotalDistance": (that.data.dat.data["0"]["0"].TotalDistance).toFixed(2),
        // })
        if (that.data.dat.data["0"]["0"].TotalDistance>=10000){
          that.setData({
            RunWan: (that.data.dat.data["0"]["0"].TotalDistance/10000).toFixed(2),
          })
        } else if (that.data.dat.data["0"]["0"].TotalDistance >= 100000000){
          that.setData({
            RunYi: (that.data.dat.data["0"]["0"].TotalDistance / 100000000).toFixed(2),
          })
        }
        // console.log(res[0])
      }
    })
    
  },
  rankList:function(e){
    var that=this
    wx.navigateTo({
      url: 'rankList/rankList?Id=' + that.data.tId,
    })
  },
  userTap:function(e){
    var Id = e.currentTarget.dataset.index
    var nickName = e.currentTarget.dataset.username
    console.log('Id', Id)
    console.log('昵称：：：：',nickName)
    wx.navigateTo({
      url: '../../../mine/record/record?Id=' + Id + '&NickName=' + nickName
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
    var that=this
    
    // i=0;
    // that.onLoad(that.data.groupIDnow)
    // console.log("OnShow");
    // var that = this
    // wx.request({//获取用户打卡状态
    //   url: app.globalData.url +'/getMyUploadFlag', //获取当天是否已经打过卡
    //   data: {
    //     Id: app.globalData.Id
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
        
    //     app.globalData.uploadFlag = res.data
    //     console.log('我今天打卡状态：', app.globalData.uploadFlag)
    //   }
    // })
    // wx.request({
    //   url: app.globalData.url + '/getMyState', //获取我的入团状态
    //   data: {
    //     Id: app.globalData.Id,
    //     token: app.globalData.token
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     app.globalData.GroupName = res.data["0"].GroupName
    //     app.globalData.GroupID = res.data["0"].GroupID
    //     app.globalData.Status = res.data["0"].Type
    //   }
    // })
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
    var that = this
    var options={}
    options.Id = that.data.groupIDnow
    that.onLoad(options)
    wx.stopPullDownRefresh()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

})