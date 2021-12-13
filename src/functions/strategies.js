import axios from 'axios'


export const SL = async (symbol,amount,token,live_price) => {

	let SLPercent=window.localStorage.getItem('SLPercent')*0.01
	let Buying_Price=window.localStorage.getItem(symbol)

	if (live_price< Buying_Price*(1-SLPercent)){
		let sell_data = {
			type: "sell",
			execution: "market",
			srcCurrency: symbol,
			dstCurrency: "rls",
			amount: String(amount),
		}
		let config = {
			headers: { Authorization: `token ${token}` }
		};
		if (amount>0){
			await axios.post('https://corsproxyy.herokuapp.com/https://api.nobitex.ir/market/orders/add', sell_data,config)
			.then((response) => {
			  console.log('Stophhhhhhhhhhhhhhhhhhh Loss',response)
			})
			.catch((error) => {
			  console.error('erotttttttttttttttttt',error)
			})
		}
	}	
}


export const Candle = async (symbol,interval='30m',limit='6') => {

	let changed_percent=0

	await axios.get("https://api.binance.com/api/v3/klines?interval="+interval+"&limit="+limit+"&symbol="+symbol, {} )
	.then(response => {
		console.log('ddddddd',response.data[0][1])
		changed_percent= (response.data[limit-1][4]-response.data[0][1])/response.data[0][1]*100
	})
	.catch(error => {
		console.error(error);
		changed_percent=0;
	});
	return changed_percent
}

