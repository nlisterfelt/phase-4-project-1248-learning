import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = "AIzaSyCd2LzbLKlVEp8WH5ntDBiJKiU4Y52p1nA"
const project_number = "learning-418920"

const Convert = ({language, text}) => {
    const API_URL = `https://translation.googleapis.com/v3/projects/${project_number}:${text}`

    const [translated, setTranslated]=useState("")
    const [debouncedText, setDebouncedText]=useState("")
    
    useEffect(()=>{
        fetch(API_URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                "sourceLanguageCode": "en",
                "targetLanguageCode": language,
                "contents": [text],
                "mimeType": "text/plain"
            })
        }).then(r=>{
            if(r.ok){
                r.json().then(data=>setTranslated(data.translations[0].translatedText))
            }
        })
    }, [])
    
    return (
        <div>
            Translated text: {translated}
        </div>
    )
}

export default Convert

