import { NextResponse } from "next/server";
interface WeatherData{
    temp: string;
    hum: string;
    date:string;
}
const weatherData:WeatherData[]=[];

export const POST = async (request:Request)=>{
    try{
        const data = await request.json();
        weatherData.push({...data,date:new Date().toISOString()});
        if(weatherData.length>=10){
            weatherData.splice(0,1);
        }
        return NextResponse.json({message: "Data received ", data},{status:200});
    }catch(error){
        return NextResponse.json({error:"Invalid data "},{status:400});
    }
}

export const GET=async()=>{
    return NextResponse.json(weatherData);
}