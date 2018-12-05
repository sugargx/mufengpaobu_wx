// member.js
var index = 0;
var check = true;
var info=[];
var thisGroupID = 0;
// var list=[];
function obj(n, i) {
  this.NickName = n;
  this.HeadImgUrl = i;
}
var GroupID;
var GroupName;
var app=getApp();

var length=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member: [],
    flag: true,
    none:true,
    Name: '',
    Age: '',
    Sex: '',
    Tel: '',
    Address:'',
    city:''
  },
  onLoad: function (options) {
    var that=this;
    thisGroupID = options.GroupId
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
   
    GroupName=app.globalData.GroupName
    wx.request({
      url: app.globalData.url +'/getApplicantsUP',
      data: {
        GroupId: thisGroupID
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        length = res.data.length
        info=res.data
        that.setData({
          member: info,
        })
        if(length>0){
          that.setData({
            none: false
          })
        }
        if (length <= 0) {
          that.setData({
            none: true
          })
        }
        
      }
    })
  },
  onPullDownRefresh: function () {
    var that = this
    var options = {};
    options.GroupId = thisGroupID;
    that.onLoad(options)
    wx.stopPullDownRefresh()
  },
  showm: function (e) {
    var that=this
    index = parseInt(e.target.id/3)
    that.setData({
      Name: info[index].Name,
      Age: info[index].Age,
      Sex: info[index].Sex,
      Tel: info[index].Tel,
      city:  info[index].City + info[index].District ,
      Address:  info[index].DetailedAddr,
      flag:false
    })
    
  },
  close: function () {
    this.setData({
      flag: true,
    })
  },
  accept:function(e){
    var that = this
    index = parseInt(e.target.id / 3)
    if(check==true){
      wx.showModal({
        title: "同意 " + that.data.member[index].NickName+" 加入我的跑团",
        success:function(res){
          if (res.confirm) {
            wx.request({
              url: app.globalData.url +'/agreeUP',
              data: {
                id: info[index].Id,
                GroupID: thisGroupID
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                wx.showModal({
                  title: that.data.member[index].NickName+"已加入我的跑团",
                  showCancel:false
                })
                // that.del(index)
                // that.setData({
                //   member:info
                // })
                // length--;
                var options = {};
                options.GroupId = thisGroupID;
                that.onLoad(options)
              }
            })
          }
        }
      })
    }
  },
  refuse:function(e){
    var that=this
    index = parseInt(e.target.id / 3)
    if (check == true) {
      wx.showModal({
        title: "拒绝 " + that.data.member[index].NickName+" 加入我的跑团",
        content: '',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.url +'/noAgreeUP',
              data: {
                id: info[index].Id,
                GroupId: thisGroupID
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                wx.showModal({
                  title: '已拒绝 '+that.data.member[index].NickName+' 的入团申请',
                  content: '',
                  showCancel: false
                })
                // that.del(index)
                // that.setData({
                //   member: info
                // })
                // length--;
                // if (length < 1) {
                //   that.setData({
                //     none: true
                //   })
                // }
                var options={};
                options.GroupId = thisGroupID;
                that.onLoad(options)
              }
            })
          }
        }
      })
    }
  },
  del:function(e){
    for(let i=e;i<info.length-1;i++){
      info[i]=info[i+1];
      // list[i]=list[i+1];
    }
    info.pop();
    // list.pop();
    if (info.length==0){
      this.setData({
        none:true
      })
    }
  },
  onUnload:function(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];
    if(length==0){
      prevPage.setData({
        newApply: false,
      })
    }
    else{
      let l=length>99?'99+':length
      prevPage.setData({
        num: l,
      })
    }
  }
})