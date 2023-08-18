export async function GetCurrencyInfoByCountryCode(code, base){
    const resp = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_RATES_API_KEY}&base=${base}&symbols=${code}`, {
        method: "GET",
    });

    return await resp.json()
}
