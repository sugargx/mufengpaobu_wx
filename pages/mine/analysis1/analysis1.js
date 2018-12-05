var charts = require('charts/charts');
var index=0;
var app=getApp()
var canvasId;
var canvasId1;
var canvasId2;
var a=[];
var b=[];
var c=[[0.3, 0.2, 0.45, 0.37, 0.4, 0.8], 
[0.3, 0.2, 0.45, 0.37, 0.4, 0.8]];
Page({
  data: {
    // id:"",
    ind1:0,
    indm1:0,
    ind2: 0,
    indm2: 0,
    ind3: 0,
    indm3: 0,
    lineGraph1:true,
    lineGraph2: false,
    lineGraph3: false,
    deviceH:'',
    dat:''
    
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.url +'/MyAnalyseUP',
      data: {
        Id: app.globalData.Id,
      },
      success: function (res) {
        console.log('返回的跑步信息：', res.data)
        that.setData({
          dat:res.data,          
          ind1: (res.data[1]).length - 1,
          indm1: (res.data[1]).length - 1,
          ind2: (res.data[3]).length - 1,
          indm2: (res.data[3]).length - 1,
          ind3: (res.data[6]).length - 1,
          indm3: (res.data[6]).length - 1,
          
        })
        a = res.data[1],
        b = res.data[3],
        c = res.data[6],
        that.initGraph()
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceH: res.windowHeight,
          deviceW: res.windowWidth,
        })
      }
    })
  },
  //初始化图表
  initGraph: function () {
    var that = this
    var params = {}
    params.width = this.data.deviceW

    // charts.shapeLine(params)

    if (that.data.lineGraph1) {// 绘制周
      params.canvas_id = 'canvas' 
      params.ytitle = '跑量 (公里)'

      params.xcate = ['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      params.data = [{
        name: '本周运动情况',
        data: [a[this.data.ind1][0], a[this.data.ind1][1], a[this.data.ind1][2], 
        a[this.data.ind1][3], a[this.data.ind1][4], a[this.data.ind1][5], 
        a[this.data.ind1][6],],
        format: function (val) {
          return val> 0 ? val: '';
        }
      }]
      console.log('-----------bug周--------------');
      charts.shapeLine(params)

    } else if (that.data.lineGraph2) {// 绘制月
      params.canvas_id = 'canvas1' 
      params.ytitle = '跑量 (公里)'
      var Length = this.data.dat[3][0].length
      if (Length == 28) {
        params.xcate = ['1', '', '', '', '5', '', '', '', '', '10', '', '', '', '', '15', '', '', '', '', '20', '', '', '', '', '25', '', '', '28']

        params.data = [{
          name: '本月运动情况',
          data: [b[this.data.ind2][0], b[this.data.ind2][1], b[this.data.ind2][2],
          b[this.data.ind2][3], b[this.data.ind2][4], b[this.data.ind2][5],
          b[this.data.ind2][6], b[this.data.ind2][7], b[this.data.ind2][8],
          b[this.data.ind2][9], b[this.data.ind2][10], b[this.data.ind2][11],
          b[this.data.ind2][12], b[this.data.ind2][13], b[this.data.ind2][14],
          b[this.data.ind2][15], b[this.data.ind2][16], b[this.data.ind2][17],
          b[this.data.ind2][18], b[this.data.ind2][19], b[this.data.ind2][20],
          b[this.data.ind2][21], b[this.data.ind2][22], b[this.data.ind2][23],
          b[this.data.ind2][24], b[this.data.ind2][25], b[this.data.ind2][26],
          b[this.data.ind2][27]],
          format: function (val) {
            console.log('val:', val)
            return val> 0 ? val: '';
          }
        }]
      } else if (Length == 29) {
        params.xcate = ['1', '', '', '', '5', '', '', '', '', '10', '', '', '', '', '15', '', '', '', '', '20', '', '', '', '', '25', '', '', '', '29']
        params.data = [{
          name: '本月运动情况',
          data: [b[this.data.ind2][0], b[this.data.ind2][1], b[this.data.ind2][2],
          b[this.data.ind2][3], b[this.data.ind2][4], b[this.data.ind2][5],
          b[this.data.ind2][6], b[this.data.ind2][7], b[this.data.ind2][8],
          b[this.data.ind2][9], b[this.data.ind2][10], b[this.data.ind2][11],
          b[this.data.ind2][12], b[this.data.ind2][13], b[this.data.ind2][14],
          b[this.data.ind2][15], b[this.data.ind2][16], b[this.data.ind2][17],
          b[this.data.ind2][18], b[this.data.ind2][19], b[this.data.ind2][20],
          b[this.data.ind2][21], b[this.data.ind2][22], b[this.data.ind2][23],
          b[this.data.ind2][24], b[this.data.ind2][25], b[this.data.ind2][26],
          b[this.data.ind2][27], b[this.data.ind2][28]],
          format: function (val) {
            console.log('val:', val)
            return val> 0 ? val: '';
          }
        }]

      } else if (Length == 30) {
        params.xcate = ['1', '', '', '', '5', '', '', '', '', '10', '', '', '', '', '15', '', '', '', '', '20', '', '', '', '', '25', '', '', '', '30']
        params.data = [{
          name: '本月运动情况',
          data: [b[this.data.ind2][0], b[this.data.ind2][1], b[this.data.ind2][2],
          b[this.data.ind2][3], b[this.data.ind2][4], b[this.data.ind2][5],
          b[this.data.ind2][6], b[this.data.ind2][7], b[this.data.ind2][8],
          b[this.data.ind2][9], b[this.data.ind2][10], b[this.data.ind2][11],
          b[this.data.ind2][12], b[this.data.ind2][13], b[this.data.ind2][14],
          b[this.data.ind2][15], b[this.data.ind2][16], b[this.data.ind2][17],
          b[this.data.ind2][18], b[this.data.ind2][19], b[this.data.ind2][20],
          b[this.data.ind2][21], b[this.data.ind2][22], b[this.data.ind2][23],
          b[this.data.ind2][24], b[this.data.ind2][25], b[this.data.ind2][26],
          b[this.data.ind2][27], b[this.data.ind2][28], b[this.data.ind2][29]],
          format: function (val) {
            console.log('val:', val)
            return val> 0 ? val: '';
          }
        }]

      } else if (Length == 31) {

        params.xcate = ['1', '', '', '', '5', '', '', '', '', '10', '', '', '', '', '15', '', '', '', '', '20', '', '', '', '', '25', '', '', '', '', '30', '31']
        params.data = [{
          name: '本月运动情况',
          data: [b[this.data.ind2][0], b[this.data.ind2][1], b[this.data.ind2][2],
            b[this.data.ind2][3], b[this.data.ind2][4], b[this.data.ind2][5],
            b[this.data.ind2][6], b[this.data.ind2][7], b[this.data.ind2][8],
            b[this.data.ind2][9], b[this.data.ind2][10], b[this.data.ind2][11],
            b[this.data.ind2][12], b[this.data.ind2][13], b[this.data.ind2][14],
            b[this.data.ind2][15], b[this.data.ind2][16], b[this.data.ind2][17],
            b[this.data.ind2][18], b[this.data.ind2][19], b[this.data.ind2][20],
            b[this.data.ind2][21], b[this.data.ind2][22], b[this.data.ind2][23],
            b[this.data.ind2][24], b[this.data.ind2][25], b[this.data.ind2][26],
            b[this.data.ind2][27], b[this.data.ind2][28], b[this.data.ind2][29],
            b[this.data.ind2][30]],
          format: function (val) {
            return val> 0 ? val: '';
          }
        }]
      }
      charts.shapeLine(params)
    } else if (that.data.lineGraph3) {// 绘制年
      params.canvas_id = 'canvas2' 
      params.ytitle = '跑量 (公里)'
      params.xcate = ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月']

      params.data = [{
        name: '本年运动情况',
        data: [c[this.data.ind3][0], c[this.data.ind3][1], c[this.data.ind3][2],
          c[this.data.ind3][3], c[this.data.ind3][4], c[this.data.ind3][5], c[this.data.ind3][6], c[this.data.ind3][7], c[this.data.ind3][8],
          c[this.data.ind3][9], c[this.data.ind3][10], c[this.data.ind3][11]],
        format: function (val) {
          console.log('val:', val)
          return val> 0 ? val: '';
        }
      }]
      console.log('-----------bug年--------------');
      charts.shapeLine(params)
    }   
  },
  lineGraph1tap: function () {
    this.setData({
      lineGraph1: true,
      lineGraph2: false,
      lineGraph3: false,
    });
    //  this.initGraph()
  },
  //切换月
  lineGraph2tap: function () {
    this.setData({
      lineGraph1: false,
      lineGraph2: true,
      lineGraph3: false,
    });
    // this.initGraph()
  },
  //切换年
  lineGraph3tap: function () {
    this.setData({
      lineGraph1: false,
      lineGraph2: false,
      lineGraph3: true,
    });
    // this.initGraph()
  },


  flex1Tap: function (e) {
    console.log('-----------转跳刷新开始--------------');
    this.initGraph()
    console.log('-----------转跳刷新结束--------------');
    // lineGraph1tap
  },


  // 下一周
  weekdown: function () {
    this.setData({

      ind1: this.data.ind1 + 1
    })
    this.initGraph()
  },
  // 上一周
  weekup: function () {

    this.setData({

      ind1: this.data.ind1 - 1
    })
    this.initGraph()
  },
  // 下一月
  mounthdown: function () {

    this.setData({

      ind2: this.data.ind2 + 1
    })
    this.initGraph()
  },
  // ？？？？？？？？？？重复了？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
  mounthup: function () {

    this.setData({

      ind2: this.data.ind2 - 1
    })
    this.initGraph()
  },
  // 下一年
  yeardown: function () {

    this.setData({

      ind3: this.data.ind3 + 1
    })
    this.initGraph()
  },
  // 上一年
  yearup: function () {

    this.setData({

      ind3: this.data.ind3 - 1
    })
    this.initGraph()
  },
})