import Message from "@/components/home/message";
import {useEffect, useState} from "react";
import {GetInfoByIp} from "@/api/IpApi";
import {GetCurrencyInfoByCountryCode} from "@/api/CurrencyApi";
import countryToCurrency from "country-to-currency/index";

export default function Home({messagesConst}){
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        if(messages.length!==messagesConst.length){
            const timeout = setTimeout(()=>{
                setMessages((messages)=>[...messages, messagesConst[0]])
            }, 1000)

            return () => clearTimeout(timeout)
        }
    },[])

    const showNewMessage = () => {
        const newMessage = messages.length===messagesConst.length?null:messagesConst[messages.length]
        if(newMessage){
            setTimeout(()=>{
                setMessages((messages)=>[...messages, newMessage])
            }, 500)
        }
    }

    return(
        <main className={"bg-[#1b1f23] flex items-center justify-center h-full relative"}>
            <div className={"bg-[#3c3d3e] h-[300px] w-[400px] rounded-lg"}>
                <div className={"border-b w-full h-[40px] flex flex-row justify-end p-[10px]"}>
                    <div className={"rounded-full h-[20px] w-[20px] bg-red-700 mr-[5px]"}/>
                    <div className={"rounded-full h-[20px] w-[20px] bg-green-500"} />
                </div>
                <div className={"h-full py-[20px] px-[10px]"}>
                    {
                        messages.map(({text, id})=><Message key={id} text={text} messageFinished={showNewMessage} />)
                    }
                </div>
            </div>
        </main>
    )
}

export async function getServerSideProps({ req }) {
    const forwarded = req.headers["x-forwarded-for"]
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    const info = await GetInfoByIp(ip)
    let messagesConst=[{
        id: 0,
        text: "Wake up. Neo..."
    },];
    if(info.status==='success'){
        const currency = countryToCurrency[info.countryCode]
        const rate = await GetCurrencyInfoByCountryCode(currency);

        messagesConst = [
            ...messagesConst,
            {
                id: 1,
                text: `Because i hacked your ip. You are living in ${info.regionName}, ${info.country}`
            },
            {
                id: 2,
                text: `Matrix has u, that's why u should to know about currency exchange - One ${rate.base} - ${JSON.stringify(rate.rates)}`
            }
        ]
    }else {
        messagesConst = [
            ...messagesConst,
            {
                id: 1,
                text: "You broke Matrix, for fixing all of this, start matrix using ngrok, don't forget about using env"
            },
        ]
    }

    return {
        props:{messagesConst}
    }
}
