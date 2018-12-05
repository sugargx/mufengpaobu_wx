// member.js
var index = 0;
var info=new Array();
var list=[];
var thisGroupID = 0;
var Group={};
function obj(n,i){
  this.NickName=n;
  this.HeadImgUrl=i;
}
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 180,//删除按钮宽度单位（rpx）
    list:[],
    member:[],
    Name:'',
    Sex:'',
    Age:'',
    Tel:'',
    TT:'left:-90px',
    Address:'',
    flag:true,
    city:'',
    startX:0,
    MonthDis:0,
    flagg:false,
  
  },
  onLoad: function (options){
    var that=this;
    thisGroupID = options.GroupId
    this.initEleWidth();
    Group.NickName = app.globalData.NickName
    Group.HeadImgUrl = app.globalData.HeadImgUrl   
    Group.Name = app.globalData.Name
    Group.Sex = app.globalData.Sex
    Group.Tel = app.globalData.Tel
    Group.Age = app.globalData.Age
    Group.Province = app.globalData.Province
    Group.City = app.globalData.City
    Group.District = app.globalData.District 
    Group.DetailedAddr = app.globalData.DetailedAddr
    info.push(Group)
    console.log(info,'12121212121')
    wx.request({
      url: app.globalData.url +'/getGroupPeoUP',
      data: {
        GroupID: thisGroupID
      },
      header: {
        'content-type':'application/json'
      },
      success: function (res) {

        console.log(res);
        info=info.concat(res.data);
        for (let i = 0; i < info.length; i++) {
          list[i]=new obj(info[i].NickName, info[i].HeadImgUrl)
        }
        that.setData({
          list:list
        }) 

        
      }
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  showm:function(e){
    index=parseInt(e.target.id/2) ;
    console.log(info,'sasasasasaaaa',index)
    this.setData({
      Name: info[index].Name,
      Age: info[index].Age,
      Sex: info[index].Sex,
      Tel: info[index].Tel,
      MonthDis:info[index].MonthDis,
      city:info[index].Province + info[index].City + info[index].District ,
      Address:info[index].DetailedAddr,
      flag: false
    })
  },
  showm1: function (e) {
   var  index = parseInt(e.target.id / 2);

    this.setData({
      flagg:false,

    })
  },
  close:function(){
    this.setData({
      flag: true,
    })
  },
  del:function(e){
    index = parseInt(e.target.id / 2);
    console.log('要删除用户的ID，', info[index].Id)
    var that=this;
    wx.showModal({
      title: '是否删除'+this.data.list[index].NickName,
      content: '',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: app.globalData.url +'/removeUP',
            data:{
              id:info[index].Id,
              // Status:0,
              GroupID: thisGroupID,
            },
            header: {
              'content-type': 'application/json'
            },
            success:function(res){
              console.log(res);
              if(res.data){
                wx.showModal({
                  title: '已将' + info[index].NickName + '移出跑团',
                  showCancel: false,
                })
                for (let i = index; i < info.length - 1; i++) {
                  info[i] = info[i + 1];
                  list[i] = list[i + 1];
                }
                info.pop();
                list.pop();
                that.setData({
                  list: list
                })
              }else{
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
  onUnload:function(){
    info.length=0;

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
      if(disX>=90)
      {
        this.setData({
        flagg:true
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
      if (index) {
        list[index].style = txtStyle;
        //更新列表的状态
        this.setData({
          list: list
        });
      }
    }
  },
  //获取元素自适应后的实际宽度
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
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件
  delItem: function (e) {
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;
    var list = this.data.list;
    //移除列表中下标为index的项
    list.splice(index, 1);
    //更新列表的状态
    this.setData({
      list: list
    });
  },
})