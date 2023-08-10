"use strict";(self.webpackChunkmeta=self.webpackChunkmeta||[]).push([[266],{266:function(e,t,r){r.r(t),r.d(t,{AudioVisualizer:function(){return m},LiveAudioVisualizer:function(){return d}});var n,a=r(413),i=r(165),o=r(861),u=r(439),c=r(791),f={exports:{}},s={};f.exports=function(){if(n)return s;n=1;var e=c,t=Symbol.for("react.element"),r=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,i=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function u(e,r,n){var u,c={},f=null,s=null;for(u in void 0!==n&&(f=""+n),void 0!==r.key&&(f=""+r.key),void 0!==r.ref&&(s=r.ref),r)a.call(r,u)&&!o.hasOwnProperty(u)&&(c[u]=r[u]);if(e&&e.defaultProps)for(u in r=e.defaultProps)void 0===c[u]&&(c[u]=r[u]);return{$$typeof:t,type:e,key:f,ref:s,props:c,_owner:i.current}}return s.Fragment=r,s.jsx=u,s.jsxs=u,s}();var l=f.exports,d=function(e){var t=e.mediaRecorder,r=e.width,n=void 0===r?"100%":r,a=e.height,i=void 0===a?"100%":a,o=e.barWidth,f=void 0===o?2:o,s=e.gap,d=void 0===s?1:s,h=e.backgroundColor,v=void 0===h?"transparent":h,m=e.barColor,g=void 0===m?"rgb(160, 198, 255)":m,p=e.fftSize,b=void 0===p?1024:p,y=e.maxDecibels,x=void 0===y?-10:y,w=e.minDecibels,C=void 0===w?-90:w,S=e.smoothingTimeConstant,R=void 0===S?.4:S,_=(0,c.useState)((function(){return new AudioContext})),k=(0,u.Z)(_,1)[0],E=(0,c.useState)(),A=(0,u.Z)(E,2),D=A[0],O=A[1],Z=(0,c.useRef)(null);(0,c.useEffect)((function(){if(t.stream){var e=k.createAnalyser();O(e),e.fftSize=b,e.minDecibels=C,e.maxDecibels=x,e.smoothingTimeConstant=R,k.createMediaStreamSource(t.stream).connect(e)}}),[t.stream]),(0,c.useEffect)((function(){D&&"recording"===t.state&&P()}),[D,t.state]);var P=(0,c.useCallback)((function(){if(D){var e=new Uint8Array(null==D?void 0:D.frequencyBinCount);"recording"===t.state?(null==D||D.getByteFrequencyData(e),T(e),requestAnimationFrame(P)):"paused"===t.state?T(e):"inactive"===t.state&&"closed"!==k.state&&k.close()}}),[D,k.state]),T=function(e){if(Z.current){var t=function(e,t,r,n){var a=t/(r+n),i=Math.floor(e.length/a);a>e.length&&(a=e.length,i=1);for(var o=[],u=0;u<a;u++){for(var c=0,f=0;f<i&&u*i+f<e.length;f++)c+=e[u*i+f];o.push(c/i)}return o}(e,Z.current.width,f,d);!function(e,t,r,n,a,i){var o=t.height/2,u=t.getContext("2d");u&&(u.clearRect(0,0,t.width,t.height),"transparent"!==a&&(u.fillStyle=a,u.fillRect(0,0,t.width,t.height)),e.forEach((function(e,t){u.fillStyle=i;var a=t*(r+n),c=o-e/2,f=r,s=e||1;u.beginPath(),u.roundRect(a,c,f,s,50),u.fill()})))}(t,Z.current,f,d,v,g)}};return l.jsx("canvas",{ref:Z,width:n,height:i,style:{aspectRatio:"unset"}})},h=function(e,t,r,n,a){for(var i=e.getChannelData(0),o=r/(n+a),u=Math.floor(i.length/o),c=t/2,f=[],s=0,l=0;l<o;l++){for(var d=[],h=0,v=[],m=0,g=0;g<u&&l*u+g<e.length;g++){var p=i[l*u+g];p<=0&&(d.push(p),h++),p>0&&(v.push(p),m++)}var b=d.reduce((function(e,t){return e+t}),0)/h,y={max:v.reduce((function(e,t){return e+t}),0)/m,min:b};y.max>s&&(s=y.max),Math.abs(y.min)>s&&(s=Math.abs(y.min)),f.push(y)}if(.8*c>s*c){var x=.8*c/s;f=f.map((function(e){return{max:e.max*x,min:e.min*x}}))}return f},v=function(e,t,r,n,a,i,o){var u=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0,c=arguments.length>8&&void 0!==arguments[8]?arguments[8]:1,f=t.height/2,s=t.getContext("2d");if(s){s.clearRect(0,0,t.width,t.height),"transparent"!==a&&(s.fillStyle=a,s.fillRect(0,0,t.width,t.height));var l=(u||0)/c;e.forEach((function(t,a){var u=a/e.length,c=l>u;s.fillStyle=c&&o?o:i;var d=a*(r+n),h=f+t.min,v=r,m=f+t.max-h;s.beginPath(),s.roundRect(d,h,v,m,50),s.fill()}))}},m=(0,c.forwardRef)((function(e,t){var r=e.blob,n=e.width,f=e.height,s=e.barWidth,d=void 0===s?2:s,m=e.gap,g=void 0===m?1:m,p=e.currentTime,b=e.style,y=e.backgroundColor,x=void 0===y?"transparent":y,w=e.barColor,C=void 0===w?"rgb(184, 184, 184)":w,S=e.barPlayedColor,R=void 0===S?"rgb(160, 198, 255)":S,_=(0,c.useRef)(null),k=(0,c.useState)([]),E=(0,u.Z)(k,2),A=E[0],D=E[1],O=(0,c.useState)(0),Z=(0,u.Z)(O,2),P=Z[0],T=Z[1];return(0,c.useImperativeHandle)(t,(function(){return _.current}),[]),(0,c.useEffect)((function(){(0,o.Z)((0,i.Z)().mark((function e(){var t,a;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(_.current){e.next=2;break}return e.abrupt("return");case 2:if(r){e.next=6;break}return t=Array.from({length:100},(function(){return{max:0,min:0}})),v(t,_.current,d,g,x,C,R),e.abrupt("return");case 6:return e.next=8,r.arrayBuffer();case 8:return a=e.sent,e.next=11,(new AudioContext).decodeAudioData(a,(function(e){if(_.current){T(e.duration);var t=h(e,f,n,d,g);D(t),v(t,_.current,d,g,x,C,R)}}));case 11:case"end":return e.stop()}}),e)})))()}),[r,_.current]),(0,c.useEffect)((function(){_.current&&v(A,_.current,d,g,x,C,R,p,P)}),[p,P]),l.jsx("canvas",{ref:_,width:n,height:f,style:(0,a.Z)({},b)})}));m.displayName="AudioVisualizer"}}]);
//# sourceMappingURL=266.854d8f14.chunk.js.map