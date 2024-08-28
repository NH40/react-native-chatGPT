import OpenAI from 'openai'

const openai = new OpenAI({
	baseURL: 'https://api.deepseek.com',
	apiKey: 'sk-5b3523699b084de1a4b51400637027cf',
})

export const make_request = async (prompt: string) => {
	const completion = await openai.chat.completions
		.create({
			messages: [{ role: 'system', content: prompt }],
			model: 'deepseek-chat',
		})
		.catch(function (error: any) {
			console.log('gemini error', error)
			return undefined
		})

	const generated_response = completion?.choices[0].message.content
	console.log('gemini response', completion?.choices[0].message.content)
	return generated_response
}
