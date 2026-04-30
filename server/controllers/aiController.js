const { GoogleGenerativeAI } = require('@google/generative-ai')

const recommendWorkers = async (req, res) => {
  try {
    const { query } = req.body
    if (!query) {
      return res.status(400).json({ 
        message: 'Please describe what you need' 
      })
    }

    const Auth = require('../models/Auth')
    const workers = await Auth.find({}).select(
      'username jobTitle skills category rating jobsCompleted isVerified'
    )

    const workersContext = workers.map((w, i) => 
      `Worker ${i+1}:
      - Username: ${w.username}
      - Job Title: ${w.jobTitle || 'Gig Worker'}
      - Skills: ${w.skills || 'General'}
      - Category: ${w.category || 'General'}
      - Rating: ${w.rating || 0}/5
      - Jobs Completed: ${w.jobsCompleted || 0}
      - Verified: ${w.isVerified ? 'Yes' : 'No'}`
    ).join('\n\n')

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    )
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro-latest' 
    })

    const prompt = `You are TrustWork's AI assistant 
    that helps clients find the best verified 
    gig workers for their needs.

    CLIENT REQUEST: "${query}"

    AVAILABLE WORKERS:
    ${workersContext}

    Recommend TOP 3 most suitable workers.
    
    Respond ONLY in raw JSON, no markdown:
    {
      "recommendations": [
        {
          "username": "worker username",
          "matchScore": 95,
          "reason": "2 sentence explanation",
          "highlights": ["h1", "h2", "h3"]
        }
      ],
      "summary": "One sentence summary"
    }`

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    
    const cleaned = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()
    
    const parsed = JSON.parse(cleaned)
    
    const enriched = parsed.recommendations.map(rec => {
      const worker = workers.find(
        w => w.username === rec.username
      )
      return { ...rec, workerData: worker }
    })

    res.json({ 
      recommendations: enriched,
      summary: parsed.summary
    })

  } catch (error) {
    console.error('AI error:', error)
    res.status(500).json({ 
      message: 'AI service error: ' + error.message 
    })
  }
}

module.exports = { recommendWorkers }
