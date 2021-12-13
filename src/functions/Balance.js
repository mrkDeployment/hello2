import axios from 'axios'


export const Balance = async (token) => {
    var coin_list={}

    let config = {
      headers: { Authorization: `token ${token}` }
    };

    await axios.post('https://corsproxyy.herokuapp.com/https://api.nobitex.ir/users/wallets/list', {}, config)
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

	return coin_list
}