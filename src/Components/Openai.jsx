import React from 'react'
import axios from 'axios'

const Openai = async (input) => { 
    const API_KEY= import.meta.env.VITE_API_KEY;
    console.log(input)
    try{
      const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key="+API_KEY,
      {
        prompt: {text:`provide me the summary of text in bullet points wrapped inside the main topic for each topics covered in the text given below\n`+input},
      },
    );
    console.log(response.data.candidates[0].output)
    return response.data.candidates[0].output;
    }catch(e){
      console.error(e);
    }
  };
export default Openai;