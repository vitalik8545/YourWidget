export async function GetInfoByIp(ip){
    const resp = await fetch(`http://ip-api.com/json/${ip}`, {
        method: "GET",
    });

    return await resp.json()
}
