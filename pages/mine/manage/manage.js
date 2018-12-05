// manage.js
var app=getApp();
var thisGroupID=0;
Page({
  data: {
    newApply:false,
    num:'',
    storyNum:0,
    equipmentNum:0
  },
  onShow:function(){
    var that = this
    that.onLoad({Id:that.data.id})
  },
  onLoad: function (options){
    var that=this
    that.setData({
      id:options.Id
    })
    thisGroupID = options.Id
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
    wx.request({
      url: app.globalData.url +'/getApplicantsUP',
      data: {
        GroupId: options.Id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('我管理的跑团ID', options.Id)
        console.log(res.data);
        if (res.data.length != 0) {
          let l = res.data.length > 99 ? '99+' : res.data.length
          that.setData({
            newApply: true,
            num: l
          })
        }
      }
    })
    wx.request({
      url: app.globalData.url + "/getNum/" + thisGroupID + "/story",
      success:function(res){
        console.log(res.data.count,"文章的数量")
        that.setData({
          storyNum: res.data.count
        })
      }
    })
    wx.request({
      url: app.globalData.url + "/getNum/" + thisGroupID + "/equipment",
      success: function (res) {
        console.log(res.data.count, "装备的数量")
        that.setData({
          equipmentNum: res.data.count
        })
      }
    })
  },
  onPullDownRefresh: function () {
    var options = { 'Id': thisGroupID}
    this.onLoad(options)                                                                           
    wx.stopPullDownRefresh()
  },
  backgroundTap: function () {//获取电脑端登录信息
    var that = this
    wx.request({
      url: app.globalData.url + '/getAccountUP',
      data: {

        GroupId: thisGroupID
      },
      success: function (res) {
        console.log(res)
        that.setData({
          account: res.data["0"],
          password: res.data["1"]
        })
        wx.showModal({
          content: "登录电脑端即可查看跑团详细数据以及上传广告位\r\n"+"账号：" + that.data.account + "\r\n密码：" + that.data.password + "\r\n网址：https://mufengpaobu.com/login",
          showCancel: false,

        })
      }
    })
  },
  toInfo:function(){
    wx.navigateTo({
      url: 'info/info?GroupId=' + thisGroupID,
    })
  },
  toMember: function () {
    wx.navigateTo({
      url: 'member/member?GroupId=' + thisGroupID,
    })
  },
  toStory: function(){
    wx.navigateTo({
      url: 'storyCheck/storyCheck?GroupId=' + thisGroupID,
    })
  },
  toEquipment:function (){
    wx.navigateTo({
      url: 'equipmentCheck/equipmentCheck?GroupId=' + thisGroupID,
    })
  },
  toApply: function () {
    wx.navigateTo({
      url: 'check/check?GroupId=' + thisGroupID,
    })
  },
  toApplyimg: function () {
    wx.navigateTo({
      url: 'checkimg/checkimg?GroupId=' + thisGroupID,
    })
  },
  toAd: function () {
    wx.navigateTo({
      url: 'ad/ad?GroupId=' + thisGroupID,
    })
  },
  dissolve: function () {
    wx.showModal({
      title: '解散跑团',
      content: '确认解散跑团？',
    })
  },
})