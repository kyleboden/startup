async function callOpenAIChatGPT(prompt) {
    // const apiKey = process.env.API_KEY;
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    // const apiKey = process.env.API_KEY;
    const apiKey = "PLACEHOLDER"
    
    if (!apiKey) {
        console.error('API key or org ID is missing.');
        return null;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        // 'OpenAI-Organization': orgID // Include org ID in headers if necessary
    };

    const body = JSON.stringify({
        model: 'gpt-4o-mini',  // Specify model
        messages: [
            { role: "system", content: engine_context }, // set system input on how to respond
            { role: "user", content: prompt }
        ],
        max_tokens: 3000,  // Adjust the token limit as per your needs
        temperature: 0.7  // Adjust creativity level if needed
    });

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.choices[0].message.content.trim(); // Extracting the response text
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// async function queryEngine (jobData, userInfo) {
//     return await callOpenAIChatGPT("Job Description: " + JSON.stringify(jobData) + "\nUser Information: " + JSON.stringify(userInfo))
// }
// engine.js
export async function queryEngine(jobData, userInfo) {
    return await callOpenAIChatGPT(
      "Job Description: " + JSON.stringify(jobData) + "\nUser Information: " + JSON.stringify(userInfo)
    );
  }
  
const engine_context = "You are a helpful assistant that only generates professional resumes. The user will provide a job description and their information and you will respond with a resume tailored to the given job description using only the user's given information. In the resume please include an objective section related to the job description. Format your response as an html page. For all text, specify an alignment. Don't center h2 and h3 headers. Make the resume concise. Feel free to remove information that I input to make the resume more concise or if it's not relevant to the job."