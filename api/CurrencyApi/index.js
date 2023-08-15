export async function GetCurrencyInfoByCountryCode(code){
    const resp = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=6dd1a877cd8d942dcf3e0530c4113c88&base=EUR&symbols=${code}`, {
        method: "GET",
    });

    return await resp.json()
}
