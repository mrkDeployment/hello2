(this.webpackJsonphello2=this.webpackJsonphello2||[]).push([[0],{26:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var a=n(5),c=n.n(a),o=n(17),r=n.n(o),i=(n(26),n.p,n(8),n(1)),l=n.n(i),s=n(4),u=n(6),h=n(18),b=n(19),p=n(21),d=n(20),j=n(3),T=n.n(j),x=n(0),f=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(h.a)(this,n),(a=t.call(this,e)).handleChange=function(e){a.setState(Object(u.a)({},e.target.name,e.target.value)),""===e.target.value&&a.setState(Object(u.a)({},e.target.name,null))},a.handleClickButton=function(e){var t=e.target.name;window.localStorage.setItem([e.target.name],a.state[t])},a.handleTest=function(){clearInterval(a.start_bot),a.handleMax()},a.state={buy_sum:0,sell_sum:0,SL_sum:0},a}return Object(b.a)(n,[{key:"componentDidMount",value:function(){var e=Object(s.a)(l.a.mark((function e(){var t,n,a,c,o,r,i,s=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.localStorage.getItem("NobitexToken"),n={},a={headers:{Authorization:"token ".concat(t)}},c={currencies:"rls,btc,shib,ltc,eth,xlm,trx,doge,etc,bnb,eos,xrp,uni,link,dot,aave,ada"},e.next=6,T.a.post("https://corsproxyy.herokuapp.com/https://api.nobitex.ir/users/wallets/list",c,a).then((function(e){e.data.wallets.forEach((function(e){if(e.rialBalance>1e5){var t=e.currency,a=e.balance;n[t]=a}}))})).catch((function(e){console.error("erroppppppp",e)}));case 6:for(o in n)r="balance_"+o,i=Number.parseFloat(n[o],10),this.setState(Object(u.a)({},r,i));this.start_bot=setInterval((function(){s.handleMax()}),3e3),setInterval((function(){s.refresh()}),18e5);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"refresh",value:function(){window.location.reload(!0)}},{key:"handleMax",value:function(){var e=Object(s.a)(l.a.mark((function e(){var t,n,a,c,o,r,i,s=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.localStorage.getItem("quantity"),t=window.localStorage.getItem("NobitexToken"),n=window.localStorage.getItem("buyPercent"),a=["btc","eth","ltc","shib","xlm","trx","doge","etc","bnb","eos","xrp","uni","link","dot","aave","ada"],c=[["BTCIRT",1],["ETHIRT",1],["LTCIRT",1],["SHIBIRT",1e3],["XLMIRT",1],["TRXIRT",1],["DOGEIRT",1],["ETCIRT",1],["BNBIRT",1],["EOSIRT",1],["XRPIRT",1],["UNIIRT",1],["LINKIRT",1],["DOTIRT",1],["AAVEIRT",1],["ADAIRT",1]],o=["BTCUSDT","ETHUSDT","LTCUSDT","SHIBUSDT","XLMUSDT","TRXUSDT","DOGEUSDT","ETCUSDT","BNBUSDT","EOSUSDT","XRPUSDT","UNIUSDT","LINKUSDT","DOTUSDT","AAVEUSDT","ADAUSDT"],r=l.a.mark((function e(r){var i,h,b,p,d,j,x;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=window.localStorage.getItem("percentage"),h=.01*s.state.balance_rls*i,b={quantity:h,token:t,nobitex_coin:c[r][0],nobitex_coin_percent:c[r][1],binance_coin:o[r],coin:a[r],buyPercent:n},e.next=5,T.a.post("https://hellofast.herokuapp.com/buy/",b).then((function(e){console.log("buyyyyyyyy",e);var t="balance_"+a[r];void 0==s.state[t]?s.setState(Object(u.a)({},t,Number.parseFloat(d,10))):s.setState(Object(u.a)({},t,s.state[t]+Number.parseFloat(d,10)))})).catch((function(e){console.log("erroppppppp",e)}));case 5:return p=window.localStorage.getItem("sellPercent"),d=0,j="balance_"+a[r],null!=s.state[j]&&(d=.01*s.state[j]*i),x={quantity:d,token:t,nobitex_coin:c[r][0],nobitex_coin_percent:c[r][1],binance_coin:o[r],coin:a[r],sellPercent:p},e.next=12,T.a.post("https://hellofast.herokuapp.com/sell/",x).then((function(e){console.log("sellllllll",e)})).catch((function(e){console.log("erroppppppp",e)}));case 12:case"end":return e.stop()}}),e)})),i=0;case 8:if(!(i<o.length)){e.next=13;break}return e.delegateYield(r(i),"t0",10);case 10:i++,e.next=8;break;case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(x.jsxs)("div",{className:"Container",children:[Object(x.jsxs)("div",{className:"NobitexToken",children:[Object(x.jsx)("p",{children:"Nobitex Token"}),Object(x.jsx)("input",{className:"NobitexToken",placeholder:"Nobitex Token",name:"NobitexToken",onChange:function(t){return e.handleChange(t)}}),Object(x.jsx)("button",{name:"NobitexToken",onClick:function(t){return e.handleClickButton(t)},children:"send"})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)("p",{children:"\u062f\u0631\u0635\u062f \u062f\u0627\u0631\u0627\u06cc\u06cc"}),Object(x.jsx)("input",{name:"percentage",placeholder:"\u062f\u0631\u0635\u062f \u062f\u0627\u0631\u0627\u06cc\u06cc",onChange:function(t){return e.handleChange(t)}}),Object(x.jsx)("button",{name:"percentage",onClick:function(t){return e.handleClickButton(t)},children:"send"})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)("p",{children:"\u062f\u0631\u0635\u062f \u0628\u0631\u0627\u06cc \u062e\u0631\u06cc\u062f"}),Object(x.jsx)("input",{name:"buyPercent",onChange:function(t){return e.handleChange(t)}}),Object(x.jsx)("button",{name:"buyPercent",onClick:function(t){return e.handleClickButton(t)},children:"send"})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)("p",{children:"\u062f\u0631\u0635\u062f \u0628\u0631\u0627\u06cc \u0641\u0631\u0648\u0634"}),Object(x.jsx)("input",{name:"sellPercent",onChange:function(t){return e.handleChange(t)}}),Object(x.jsx)("button",{name:"sellPercent",onClick:function(t){return e.handleClickButton(t)},children:"send"})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)("p",{children:"\u062d\u062f \u0636\u0631\u0631 \u0628\u0647 \u062f\u0631\u0635\u062f"}),Object(x.jsx)("input",{name:"SLPercent",onChange:function(t){return e.handleChange(t)}}),Object(x.jsx)("button",{name:"SLPercent",onClick:function(t){return e.handleClickButton(t)},children:"send"})]}),Object(x.jsx)("button",{onClick:function(){return e.handleTest()},children:"Test"})]})}}]),n}(c.a.Component);var g=function(){return Object(x.jsx)(f,{})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,48)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),o(e),r(e)}))};r.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(g,{})}),document.getElementById("root")),m()},8:function(e,t,n){}},[[47,1,2]]]);
//# sourceMappingURL=main.534291bc.chunk.js.map