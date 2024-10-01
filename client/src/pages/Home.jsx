import React, { useEffect, useState } from "react"

import { Loader, Card, FormField, ContactBtn } from "../components"

const RenderCards = ({data, title}) => {
    if (data?.length > 0) return data.map((post) => <Card key={post._id} {...post} />)

    return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
    )
}

const Home = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [searchedResults, setSearchedResults] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);

            try {
                const response = await fetch('https://ai-magis.onrender.com/api/v1/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                if(response.ok) {
                    const result = await response.json()

                    setAllPosts(result.data.reverse());
                }
            } catch (error) {
                alert(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchTerm(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResults = allPosts.filter(
                    (post) => post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.prompt.toLowerCase().includes(searchTerm.toLowerCase()))

                setSearchedResults(searchResults);
            }, 500)
        )
    }
    
  return (
    <section className="max-w-7xl mx-auto">
        <div>
            <h1 className="font-extrabold text-[#FF6500] text-[32px]">Public Gallery</h1>
            <p className="mx-auto mt-2 text-white text-[16px] max-w-[500px]">We are powered by your creativity</p>
        </div>
        <div className="mt-16">
            <FormField labelName="Search Posts" 
            type="text" name="text" 
            placeholder="Enter keyword" 
            value={searchTerm} 
            handleChange={handleSearchChange} />
        </div>

        <div className="mt-10">
            {isLoading ? (
                <div className="flex justify-center items-center"> 
                    <Loader />
                </div>
            ) : (
                <div className="posts">
                    {searchTerm && (
                        <h2 className="font-medium text-[#666e75] text-xl mb-3">Showing results for <span className="text-[#FF6500]">{searchTerm}</span></h2>
                    )}
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                        {searchTerm ? (
                            <RenderCards data={searchedResults}
                            title="no search results found" />)
                            : (
                            <RenderCards data={allPosts} title="No posts found" />
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    </section>
  )
}

export default Home