import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {preview} from '../assets'
import {getRandomPrompt} from '../utils'

import {FormField, Loader} from '../components'

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm ] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [isGeneratingImg, setIsGeneratingImg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const generateImg = async () => {
    if(form.prompt) {
      try {
        setIsGeneratingImg(true)
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt: form.prompt}),
        })

        const data = await response.json();
        setForm({...form, photo: `${data.photo}`})
      } 
      catch (error) {
        alert(error)
      }
      finally {
        setIsGeneratingImg(false);
      }
    }
    else {
      alert('Please enter a prompt')
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(form.prompt && form.photo) {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })

        await response.json();
        navigate('/');
      } catch (error) {
        alert(error)
      }
      finally {
        setIsLoading(false)
      }
    }
    else {
      alert('Please enter a prompt and generate an image')
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt})
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
          <h1 className="font-extrabold text-[#FF6500] text-[32px]">Create With Us</h1>
          <p className="mt-2 text-white text-[16px] max-w-[500px] mx-auto">Contribute your ideas through AI-Magis</p>
      </div>

      <form action="" className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField 
            labelName='Your name'
            type='text'
            name='name'
            placeholder='John'
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder={'random prompt here'}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
          {form.photo ? (
            <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
          ) : (<img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40' />)}
          {isGeneratingImg && (<div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
            <Loader />
          </div>)}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button type='button' className='text-white bg-[#FF6500] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' onClick={generateImg} >{isGeneratingImg ? 'Generating...' : 'Generate'}</button>
        </div>

        <div className="mt-10">
          <p className='mt-2 text-[#666e75] text-[14px]'>Once you're done, feel free to share it</p>
            <button type='submit' className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              {isLoading ? 'Sharing...' : 'Share'}
            </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost