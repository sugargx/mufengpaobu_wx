// uploading.js
// var util=require("../../utils/util");
var flag = false;//是否同步
var clicks=false;
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [[
      '0 时', '1 时', '2 时', '3 时', '4 时', '5 时', '6 时', '7 时', '8 时', '9 时',
      '10 时', '11 时', '12 时', '13 时', '14 时', '15 时', '16 时', '17 时', '18 时', '19 时',
      '20 时', '21 时', '22 时', '23 时', '24 时', '25 时', '26 时', '27 时', '28 时', '29 时',
      '30 时', '31 时', '32 时', '33 时', '34 时', '35 时', '36 时', '37 时', '38 时', '39 时',
      '40 时', '41 时', '42 时', '43 时', '44 时', '45 时', '46 时', '47 时', '48 时', '49 时',
      '50 时', '51 时', '52 时', '53 时', '54 时', '55 时', '56 时', '57 时', '58 时', '59 时',
      '60 时', '61 时', '62 时', '63 时', '64 时', '65 时', '66 时', '67 时', '68 时', '69 时',
      '70 时', '71 时', '72 时', '73 时', '74 时', '75 时', '76 时', '77 时', '78 时', '79 时',
      '80 时', '81 时', '82 时', '83 时', '84 时', '85 时', '86 时', '87 时', '88 时', '89 时',
      '90 时', '91 时', '92 时', '93 时', '94 时', '95 时', '96 时', '97 时', '98 时', '99 时'
    ],
    [
      '0 分', '1 分', '2 分', '3 分', '4 分', '5 分', '6 分', '7 分', '8 分', '9 分', '10 分',
      '11 分', '12 分', '13 分', '14 分', '15 分', '16 分', '17 分', '18 分', '19 分', '20 分',
      '21 分', '22 分', '23 分', '24 分', '25 分', '26 分', '27 分', '28 分', '29 分', '30 分',
      '31 分', '32 分', '33 分', '34 分', '35 分', '36 分', '37 分', '38 分', '39 分', '40 分',
      '41 分', '42 分', '43 分', '44 分', '45 分', '46 分', '47 分', '48 分', '49 分', '50 分',
      '51 分', '52 分', '53 分', '54 分', '55 分', '56 分', '57 分', '58 分', '59 分', '60 分'
    ], [
      '0 秒', '1 秒', '2 秒', '3 秒', '4 秒', '5 秒', '6 秒', '7 秒', '8 秒', '9 秒',
      '10 秒', '11 秒', '12 秒', '13 秒', '14 秒', '15 秒', '16 秒', '17 秒', '18 秒', '19 秒',
      '20 秒', '21 秒', '22 秒', '23 秒', '24 秒', '25 秒', '26 秒', '27 秒', '28 秒', '29 秒',
      '30 秒', '31 秒', '32 秒', '33 秒', '34 秒', '35 秒', '36 秒', '37 秒', '38 秒', '39 秒',
      '40 秒', '41 秒', '42 秒', '43 秒', '44 秒', '45 秒', '46 秒', '47 秒', '48 秒', '49 秒',
      '50 秒', '51 秒', '52 秒', '53 秒', '54 秒', '55 秒', '56 秒', '57 秒', '58 秒', '59 秒', '60 秒']],
    index1: [0, 0, 0],
    hour: 0,
    minute: 0,
    second: 0,
    speed: '',
    // time:[0,0,0],
    Img: {},
    checkG:[],
    checkm: [1,2],
    ImagUrl: '',
    // uploadFlag:false,//今日是否上传
    check: [],//是否同步跑团
    statue: 0,//加入跑团的id
    GroupName: '',
    AddGroupFlag: false,
    checkboxItems: [
      { }
    ],
    checkboxItems1: [
      { name: 'USA', value: '美国', checked: 'true' }
    ],
  },
  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value[0])
    that.setData({
      index1: e.detail.value,

      hour: parseInt(e.detail.value[0]),
      minute: parseInt(e.detail.value[1]),
      second: parseInt(e.detail.value[2]),
    })
    that.checktime()
  },
  checkboxChange: function (e) {
    var that = this
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    
     
 
    }
    this.setData(changed) 
    

    console.log('结果：', that.data.check)
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: 'compressed',
      count: 1,
      success: function (res) {

        console.log(res)
        that.setData({
          ImagUrl: res.tempFilePaths["0"],
          Img: res,
          flag: "true"
        })
        console.log(that.data.Img, 'imgimg')
      }
    })
    console.log(flag);
  },
  previewImage: function (e) {
    var that = this
    // var current = e.target.dataset.src
    wx.previewImage({
      urls: [that.data.ImagUrl]
    })
  },
  checktime: function () {
    wx.request({
      url: app.globalData.url + '/checkTime', //检测是否频繁上传，时间间隔3小时
      data: {
        Id: app.globalData.Id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('点击页面检查频繁提交')
        if (res.data != true) {
          wx.showModal({
            title: '不可频繁打卡',
            content: '请' + res.data + '后重试',
            showCancel: false,
          })
        }else{
          clicks=false;
        }
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    console.log(that.data.Img, '图片')
    that.setData({
      checkG:[]
    })
    var m=0;
    console.log(that.data.checkboxItems,'rigoule')
    for (var j = 0; j < app.globalData.MyGroupNum;j++)
    {
      if ((app.globalData.Status[j] != 3) && (app.globalData.GroupID[j] != 0) && (app.globalData.GroupState[j] == 1))
      m++;
    }
    console.log(that.data.checkboxItems, 'tiaoshitiaoshi2222222222',m)
    for (var i = 0; i<m; i++) { 
      if (that.data.checkboxItems[i].checked==true) {
        var t = that.data.checkboxItems[i].id
        that.setData({
          checkG: that.data.checkG.concat(t) 
        })   
         console.log(this.data.checkG, 'tiaoshitiaoshi')
      }
     


    }

    var that = this
    wx.request({
      url: app.globalData.url + '/checkTime', //检测是否频繁上传，时间间隔3小时
      data: {
        Id: app.globalData.Id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data == true) {
          // console.log(that.data.hour, that.data.minute, that.data.second, '111')
          console.log('选择的图片：', JSON.stringify(that.data.Img).length);//等于2说明为空，没有选择照片
          var chooseImgFlag = (JSON.stringify(that.data.Img).length == 2)
          // if (app.globalData.uploadFlag ==0){
          if (chooseImgFlag) {
            wx.showModal({
              title: '请选择图片',
              showCancel: false,
            })
          } else {
            //跑步时长，以秒为单位
            var TimeLong = that.data.hour * 3600 + that.data.minute * 60 + that.data.second * 1
            //跑步距离，以公里为单位
            console.log('跑步时间：', that.data.hour)
            console.log(typeof that.data.hour)
            console.log(typeof that.data.minute)
            console.log(typeof that.data.second)
            var Distance = e.detail.value.distance
            if (TimeLong < 60) {//时间太短，小于一分钟的不上传
              wx.showModal({
                title: '时间太短，无法上传!',
                showCancel: false,
              })
            } else if (Distance < 0.2) {//距离太短，小于0.5公里的不上传
              wx.showModal({
                title: '距离太短，无法上传!',
                showCancel: false,
              })
            } else if (TimeLong < Distance * 96.9) {//在北京奥运会男子100米比赛中，尤塞恩·博尔特以9秒69的成绩打破了自己保持的世界纪录
              wx.showModal({
                // title: '',
                content: '您已经超过博尔特的速度了,小沐存不下这么大的数据啦!',
                showCancel: false,
              })
            } else {
             
             wx.showModal({
                title: '确认上传本次打卡信息？',
                success: function (res) {
                  if (res.confirm) {
                    if (clicks == false) {
                      clicks = true;
                      console.log('用户点击确定', that.data.checkG)
                      wx.showLoading({
                        title: '正在上传...',
                      })
                      var flaga = that.data[0];
                      wx.uploadFile({
                        url: app.globalData.url + '/uploadingUP',
                        filePath: that.data.Img.tempFilePaths["0"],
                        name: 'file',

                        formData: {
                          'TimeLong': TimeLong,
                          'Distance': Distance,
                          'GroupID': JSON.stringify(that.data.checkG),
                          'Id': app.globalData.Id,
                          'Point': parseFloat(e.detail.value.distance).toFixed(1) * 10, //一公里可以换10积分

                        },
                        header: {
                          'content-type': 'application/json',
                          'enctype': 'multipart/form-data'
                        },

                        success: function (res) {

                          console.log('成功了！！！！！！！！！！！！！！')
                          wx.hideLoading()
                          var data = res.data

                          console.log('(跑步img)：', res.data)
                          wx.request({
                            url: app.globalData.url + '/upSuccessUP',
                            data: {
                              Id: app.globalData.Id,
                              // GroupId: app.globalData.GroupID,
                              // Flag: that.data.check,
                            },
                            success: function (re) {
                              console.log('返回的跑步信息：', re.data, 'sadsadas')
                              app.globalData.Point = re.data.TotalPoints
                              console.log('我的全局积分：', app.globalData.Point)
                              console.log(that.data.dat)
                              wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 2000
                              })
                              wx.navigateTo({
                                url:
                                'upSuccess/upSuccess?hour=' + that.data.hour
                                + '&minute=' + that.data.minute
                                + '&second=' + that.data.second
                                + '&point=' + parseFloat(e.detail.value.distance).toFixed(1) * 10
                                + '&long=' + e.detail.value.distance
                                + '&flag=' + flaga
                                + '&url=' + res.data
                                // + '&GroupName=' + app.globalData.GroupName
                                // + '&Id=' + app.globalData.Id
                                // + '&GroupId=' + app.globalData.GroupID
                                + '&NickName=' + app.globalData.NickName
                                // + '&total=' + res.data
                                + '&TimeAll=' + re.data.TimeAll
                                + '&TotalPoints=' + re.data.TotalPoints
                                + '&TotalRun=' + re.data.TotalRun
                                // + '&LastRank=' + re.data.LastRank
                                // + '&ThisRank=' + re.data.ThisRank
                                // + '&TimeInGroup=' + re.data.TimeInGroup
                                + '&AdvQRUrl=' + re.data.Adv.AdvQRUrl
                                + '&AdvTitle=' + re.data.Adv.AdvTitle
                              })
                            }
                          })
                          that.setData({
                            // time: [0, 0, 0],
                            index1: [0, 0, 0],
                            speed: '',
                            flag: false,
                            ImagUrl: ''
                          })
                        }
                      })
                    }else{
                      wx.showModal({
                        title: '请勿频繁提交',
                        showCancel: false,
                      })
                    }
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          }
        } else {
          wx.showModal({
            title: '请' + res.data + '后提交',
            showCancel: false,
          })
        }
      }
    })
  },
  onLoad: function (e) {
    var that = this
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
    that.setData({
      checkboxItems: []

    })
    for (var i = 0; i < app.globalData.MyGroupNum; i++) {
      console.log(i,'跑团姓名：',app.globalData.GroupName[i])
      console.log(i,'跑团状态：',app.globalData.GroupState[i])
      console.log(i,'我的状态：',app.globalData.Status[i])
      if ((app.globalData.GroupID[i] != 0) && (app.globalData.GroupState[i] == 1) && (app.globalData.Status[i] != 3)) {
      var newa=[{
        name: app.globalData.GroupName[i], value: app.globalData.GroupName[i], checked: true, id: app.globalData.GroupID[i],
      }]
      that.setData({
        checkboxItems: that.data.checkboxItems.concat(newa)
      })
      }
    }
    console.log('hahaha', that.data.checkboxItems, '我爱你')
    that.setData({
      // uploadFlag: true,
      statue: app.globalData.GroupID,
      GroupName: app.globalData.GroupName,
      checkboxItems: this.data.checkboxItems,
    })
    for (var i = 0; i < app.globalData.MyGroupNum;i++){
      if ((app.globalData.Status[i] == 1 || app.globalData.Status[i] == 0) && app.globalData.GroupState[i]==1){
        that.setData({
        AddGroupFlag:true
        })
      }
    }
    console.log('hahaha', that.data.checkboxItems, '我爱你')
    console.log('app.globalData.GroupID:', app.globalData.GroupID)
    console.log("跑团名:", app.globalData.GroupName)
    console.log("加入跑团状态", that.data.statue)

  },
  onShow: function (e) {
    var that = this
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
    that.setData({
      checkboxItems: []

    })
    for (var i = 0; i < app.globalData.MyGroupNum; i++) {
      console.log(i, '跑团姓名：', app.globalData.GroupName[i])
      console.log(i, '跑团状态：', app.globalData.GroupState[i])
      console.log(i, '我的状态：', app.globalData.Status[i])
      if ((app.globalData.GroupID[i] != 0) && (app.globalData.GroupState[i] == 1) && (app.globalData.Status[i] != 3)) {
        var newa = [{
          name: app.globalData.GroupName[i], value: app.globalData.GroupName[i], checked: true, id: app.globalData.GroupID[i]
        }]
        that.setData({
          checkboxItems: that.data.checkboxItems.concat(newa)
        })
      }
    }
    console.log('hahaha', that.data.checkboxItems, '我爱你')
    that.setData({
      // uploadFlag: true,
      statue: app.globalData.GroupID,
      GroupName: app.globalData.GroupName,
      checkboxItems: this.data.checkboxItems,
    })
    for (var i = 0; i < app.globalData.MyGroupNum; i++) {
      if ((app.globalData.Status[i] == 1 || app.globalData.Status[i] == 0) && app.globalData.GroupState[i] == 1) {
        that.setData({
          AddGroupFlag: true
        })
      }
    }
  },
  // onHide:function (){
  //   console.log('后台开始----------------')
  // },
  onPullDownRefresh: function () {
    var that = this

    that.onLoad()
    wx.stopPullDownRefresh()
  },
})
