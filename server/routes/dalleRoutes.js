import express from 'express'

import fetch from 'node-fetch';

async function generateImage(prompt, width = 1024, height = 1024, model = 'turbo', seed = -1) {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&model=${model}&seed=${seed}`;
  const response = await fetch(url);
  return url
}

const router = express.Router();

router.route('/').get((req, res) => {
    res.send('Backend Dalle')
})

router.route('/').post(async (req,res) => {
    try {
        const {prompt} = req.body
        const url = await generateImage(prompt, 1024, 1024, 'flux', 42);

        res.status(200).json({photo: url})

    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message)
    }
})

export default router;