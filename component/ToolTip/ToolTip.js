// component/ToolTip/ToolTip.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    _toolTip_:{

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    iconColorForType(type) {
      console.log("iconColorForType type=>",type);
      switch (type) {
        case 'success':
        case 'info':
          return 'rgb(9,208,7)';
        case 'warn':
          return 'rgb(255,212,00)';
        case 'error':
          return 'rgb(244,102,102)';
      }
      return 'rgb(244,102,102)';
    },
    iconTypeForType(type) {
      console.log("iconTypeForType type=>", type);
      
      switch (type) {
        case 'info':
          return 'cancel';
        case 'warn':
          return 'cancel';
        case 'success':
          return 'success_circle';
        case 'error':
          return 'cancel';
      }
      return 'clear';
    },
    createInAnimation(cb) {
      console.log("createInAnimation cb=>", cb);
      
      var anim = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease-in', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
        delay: 0,
        transformOrigin: '50% 50% 0',
        success: function (res) {
          cb && cb(res);
        }
      });
      return anim;
    },
    createOutAnimation(cb) {
      var anim = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
        delay: 0,
        transformOrigin: '50% 50% 0',
        success: function (res) {
          cb && cb(res);
        }
      });
      return anim;
    },
    closeToolTip() {
      var self = this;
      var outAnim = self.createOutAnimation();

      outAnim.translateY(-35).opacity(0).step();
      self.data._toolTip_.animation = outAnim.export();
      self.setData({
        _toolTip_: self.data._toolTip_
      });
    },
    showToolTip(type, text, delay, AutoCloseToolTip) {
      console.log('showToolTip => ',this);
      var self = this;
      var clr = self.iconColorForType(type);
      var icon = self.iconTypeForType(type);
      var inAnim = self.createInAnimation();
      inAnim.translateY(35).opacity(1).step();
      self.setData({
        _toolTip_: {
          type: type,
          info: text,
          color: clr,
          icon: icon,
          animation: inAnim.export()
        }
      });
      // if (AutoCloseToolTip){
        if (type === 'info' || type === 'success' || delay) {
          setTimeout(function () {
            self.closeToolTip();
          }.bind(self), delay || 3000);
        }
      }
    // }
  }
})
