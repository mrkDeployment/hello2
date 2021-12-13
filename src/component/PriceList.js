import React from 'react';
import '../App.css';
import axios from 'axios'
import {sleep} from '../functions/commonfunctions'
import {SL,Candle} from '../functions/strategies'
import {Balance} from '../functions/Balance'

class List extends React.Component {
  constructor(props){
    super(props)
    this.state={
      buy_sum: 0,
      sell_sum: 0,
      SL_sum: 0
    }
  }

  async componentDidMount () {
    
    let token=window.localStorage.getItem('NobitexToken')
    var coin_list={}

    let config = {
      headers: { Authorization: `token ${token}` }
    };
    
    let coins_data = {
      currencies:"rls,btc,shib,ltc,eth,xlm,trx,doge,etc,bnb,eos,xrp,uni,link,dot,aave,ada"
    }

    await axios.post('https://corsproxyy.herokuapp.com/https://api.nobitex.ir/users/wallets/list', coins_data, config)
    .then((response) => {
      
      var coins= response.data.wallets
      coins.forEach(function (coin) {
              
        if ( coin.rialBalance > 100000 ){
          let currency= coin.currency
          let balance= coin.balance
          coin_list[currency]= balance
        }
      });
      
    })
    .catch((error) => {
      console.error('erroppppppp',error)
    })
    
    for (var coin in coin_list){
      let coin_name= 'balance_'+ coin
      let coin_balance= Number.parseFloat(coin_list[coin], 10)

      this.setState({[coin_name]: coin_balance})
      
    }

    this.start_bot = setInterval(() => {
      this.handleMax()
    }, 3000)

    var reload_browser = setInterval(() => {

      this.refresh()

    }, 1800000)

    }

  refresh(){
    window.location.reload(true);
  };

  async handleMax(){

    var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');

    await axios.get('https://corsproxyy.herokuapp.com/https://api.nobitex.ir/v2/orderbook/USDTIRT')
    .then((response) => {
      this.setState({ tether: Number.parseFloat(response.data.bids[0][0], 10) })
    })
    .catch((error) => {
      console.log('erroppppppp'+"tether request error",error)
    })

    let coin_list = [
      "btc",
      "eth",
      "ltc",
      "shib",
      "xlm",
      "trx",
      "doge",
      "etc",
      "bnb",
      "eos",
      "xrp",
      "uni",
      "link",
      "dot",
      "aave",
      "ada"      
    ]

    // [Namad, zarib nobitex/binance]

    let nobitex_coin_list = [
      ["BTCIRT",1],
      ["ETHIRT",1],
      ["LTCIRT",1],
      ["SHIBIRT",1000],
      ["XLMIRT",1],
      ["TRXIRT",1],
      ["DOGEIRT",1],
      ["ETCIRT",1],
      ["BNBIRT",1],
      ["EOSIRT",1],
      ["XRPIRT",1],
      ["UNIIRT",1],
      ["LINKIRT",1],
      ["DOTIRT",1],
      ["AAVEIRT",1],
      ["ADAIRT",1]
    ]

    let binance_coin_list = [
      "BTCUSDT",
      "ETHUSDT",
      "LTCUSDT",
      "SHIBUSDT",
      "XLMUSDT",
      "TRXUSDT",
      "DOGEUSDT",
      "ETCUSDT",
      "BNBUSDT",
      "EOSUSDT",
      "XRPUSDT",
      "UNIUSDT",
      "LINKUSDT",
      "DOTUSDT",
      "AAVEUSDT",
      "ADAUSDT"
    ]

    
    for (let i = 1; i < nobitex_coin_list.length+1; i++) {

      var j = i-1;

      // nobitex API

      await axios.get('https://corsproxyy.herokuapp.com/https://api.nobitex.ir/v2/orderbook/' + nobitex_coin_list[i-1][0])
      .then((response) => {
        // var price= Number.parseFloat(response.data.bids[0][0], 10)/this.state.tether
        let price_sum_bid=0;
        let price_sum_ask=0;
        let percentage = window.localStorage.getItem('percentage');
        let quantity= this.state.balance_rls*0.01*percentage
        for (let k = 0; k < 16; k++) {
          price_sum_bid += Number.parseFloat(response.data.bids[k][0], 10)*Number.parseFloat(response.data.bids[k][1], 10)
          
          if (quantity*3 < price_sum_bid){
            let price_bid = Number.parseFloat(response.data.bids[k][0], 10)/this.state.tether
            this.setState({ [`nobitex_price_bid${j}`]: price_bid/nobitex_coin_list[j][1] })
            break;
          }else{
            if (k==15){
              let price_bid = Number.parseFloat(response.data.bids[15][0], 10)*1.03/this.state.tether
              this.setState({ [`nobitex_price_bid${j}`]: price_bid/nobitex_coin_list[j][1] })
            }
          }
        }

        for (let k = 0; k < 16; k++) {

          price_sum_ask += Number.parseFloat(response.data.asks[k][0], 10)*Number.parseFloat(response.data.asks[k][1], 10)
          
          if (quantity*3 < price_sum_ask){
            let price_ask = Number.parseFloat(response.data.asks[k][0], 10)/this.state.tether
            this.setState({ [`nobitex_price_ask${j}`]: price_ask/nobitex_coin_list[j][1] })
            break;
          }else{
            if (k==15){
              let price_ask = Number.parseFloat(response.data.asks[15][0], 10)*0.97/this.state.tether
              this.setState({ [`nobitex_price_ask${j}`]: price_ask/nobitex_coin_list[j][1] })
            }
          }
        }

      })
      .catch((error) => {
        console.error('erroppppppp'+"error occures while getting price of" + nobitex_coin_list[i-1][0],
        error) 
      })
      
      //binance API

      await axios.get("https://api.binance.com/api/v3/ticker/price?symbol="+binance_coin_list[j], {
      })
      .then(response => {
        var price= Number.parseFloat(response.data.price, 10)
        console.log("aaaaaaaa")
        this.setState({ [`binance_price${j}`]: price })
      })
      .catch(error => {
        console.error(error);
      });

      let buyPercent=window.localStorage.getItem('buyPercent')

      if (this.state.buy_sum<20){

        if(((this.state[`binance_price${j}`]-this.state[`nobitex_price_bid${j}`])/this.state[`binance_price${j}`]*100)>buyPercent && buyPercent){
          let candle=await Candle(binance_coin_list[j],'1m','1')
          console.log('candle',candle)
          if(candle>0.11){
            console.log('buyyyyyyyyyyyyyyy')
            console.log("maxxxx",this.state[`nobitex_price_bid${j}`],binance_coin_list[j])
            console.log("minnnn",this.state[`binance_price${j}`],binance_coin_list[j])
            var now = new Date();
            console.log("taghir",(this.state[`nobitex_price_bid${j}`]-this.state[`binance_price${j}`])/this.state[`binance_price${j}`]*100,now) 
            audio.play();
  
            let allowed_price = (this.state.tether)*0.9875*this.state[`binance_price${j}`]
            let percentage = window.localStorage.getItem('percentage');
            let quantity= this.state.balance_rls*0.01*percentage;
            let amount=String(quantity/(allowed_price*nobitex_coin_list[j][1]))
  
            let NobitexToken= window.localStorage.getItem('NobitexToken');
  
            let buy_data = {
              type: "buy",
              execution: "market",
              srcCurrency: coin_list[j],
              dstCurrency: "rls",
              amount: amount,
            }
            let config = {
              headers: { Authorization: `token ${NobitexToken}` }
            };
  
            await axios.post('https://corsproxyy.herokuapp.com/https://api.nobitex.ir/market/orders/add', buy_data,config)
            .then((response) => {
              console.log('buyyyyyyyy',response)
              this.setState({buy_sum: this.state.buy_sum+1})
              window.localStorage.setItem(coin_list[j],this.state[`nobitex_price_bid${j}`])
  
              let coin_name= 'balance_'+ coin_list[j]
              
              if (this.state[coin_name] == undefined ){
                this.setState({[coin_name]: Number.parseFloat(amount, 10)})
              }else{
                this.setState({[coin_name]: this.state[coin_name]+Number.parseFloat(amount, 10)})
              }
  
              console.log('state', this.state[coin_name])
              
            })
            .catch((error) => {
              console.log('erroppppppp',error)
            })
          }
          else{
            console.log('It is not trusted')
          }
          
      }}

      if (this.state.SL_sum<20){

        if (window.localStorage.getItem(coin_list[j])){
          let NobitexToken= window.localStorage.getItem('NobitexToken');
          
          let percentage = window.localStorage.getItem('percentage');
          let coin_balance_name= 'balance_'+ coin_list[j]
          let amount=0
            
          if (this.state[coin_balance_name] != null){
            amount= this.state[coin_balance_name]*0.01*percentage
          }

          let live_price=2000000000000000000000000000000000;
          live_price=this.state[`nobitex_price_ask${j}`]
          await SL(coin_list[j],amount,NobitexToken,live_price)
          .then(() => {
            this.setState({SL_sum:this.state.SL_sum+1})
          })
          .catch((error) => {
            console.error('errossssssss',error)
          })
        }
      }

      let sellPercent=window.localStorage.getItem('sellPercent')

      if (this.state.sell_sum<20){

        if (window.localStorage.getItem(coin_list[j])){
          
          if((this.state[`nobitex_price_ask${j}`]-this.state[`binance_price${j}`])/this.state[`binance_price${j}`]*100 > sellPercent && sellPercent){
            let candle=await Candle(binance_coin_list[j],'1m','1')
            
            if(candle<0.02){
              console.log('sellllllllllll')
              console.log("maxxxx",this.state[`nobitex_price_ask${j}`],this.state[`binance_price${j}`])
              console.log("minnnn",this.state[`binance_price${j}`],binance_coin_list[j])
              console.log("nobitex",this.state[`binance_price${j}`])
              // console.log("nobitex",  this.state.binance_price,this.state.nobitex_volume)
              var now = new Date();
              console.log("taghir",(this.state[`nobitex_price_ask${j}`]-this.state[`binance_price${j}`])/this.state[`binance_price${j}`]*100,now) 
            
              let percentage= window.localStorage.getItem('percentage')
              let coin_balance_name= 'balance_'+ coin_list[j]
              let amount=0
              
              if (this.state[coin_balance_name] != null){
                
                amount= this.state[coin_balance_name]*0.01*percentage
  
              }
  
              let NobitexToken= window.localStorage.getItem('NobitexToken');
      
              let sell_data = {
                type: "sell",
                execution: "market",
                srcCurrency: coin_list[j],
                dstCurrency: "rls",
                amount: String(amount),
              }
          
              let config = {
                headers: { Authorization: `token ${NobitexToken}` }
              };
          
              if (amount>0){
                await axios.post('https://corsproxyy.herokuapp.com/https://api.nobitex.ir/market/orders/add', sell_data,config)
                .then((response) => {
                  console.log('selllllllll',response)
                  this.setState({sell_sum:this.state.sell_sum+1})
                  audio.play(); 
                })
                .catch((error) => {
                  console.log('erroppppppp',error)
                })
              }
            }
            else{
              console.log('It is not trusted for selling')
            }
            
    
          }

        }
      }
      var sleep_time= 3000/(1.3*nobitex_coin_list.length)
      await sleep(sleep_time)
      
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
    { e.target.value === '' && this.setState({ [e.target.name]: null})}
  }

  handleClickButton = (e) => {
    let name= e.target.name
    window.localStorage.setItem([e.target.name],this.state[name])
  }

  handleTest = () => {
    clearInterval(this.start_bot);
    this.handleMax()
  }

  render(){
    return (
      <div className="Container">
        <div className="NobitexToken">
          <p>Nobitex Token</p>
          <input
            className="NobitexToken"
            placeholder="Nobitex Token"
            name="NobitexToken"
            onChange={(e) => this.handleChange(e)}
          />
          <button
            name="NobitexToken"
            onClick={(e) => this.handleClickButton(e)}
          >send</button>
        </div>

        <div>
          <p>درصد دارایی</p>
          <input
            name="percentage"
            placeholder="درصد دارایی"
            onChange={(e) => this.handleChange(e)}
          />
          <button
            name="percentage"
            onClick={(e) => this.handleClickButton(e)}
          >send</button>
        </div>

        <div>
          <p>درصد برای خرید</p>
          <input
            name="buyPercent"
            onChange={(e) => this.handleChange(e)}
          />
          <button
            name="buyPercent"
            onClick={(e) => this.handleClickButton(e)}
          >send</button>
        </div>

        <div>
          <p>درصد برای فروش</p>
          <input
            name="sellPercent"
            onChange={(e) => this.handleChange(e)}
          />
          <button
            name="sellPercent"
            onClick={(e) => this.handleClickButton(e)}
          >send</button>
        </div>

        <div>
          <p>حد ضرر به درصد</p>
          <input
            name="SLPercent"
            onChange={(e) => this.handleChange(e)}
          />
          <button
            name="SLPercent"
            onClick={(e) => this.handleClickButton(e)}
          >send</button>
        </div>

        <button
            onClick={() => this.handleTest()}
          >Test</button>
      </div>
    );
  }
}
export default List;
