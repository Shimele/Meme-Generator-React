import React, { Component } from 'react'

class MemeGenerator extends Component {
    constructor(){
        super()
        this.state={
            topText:'',
            bottomText:'',
            randomImage:'http://i.imgflip.com/1bij.jpg',
            allMemeImages:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            console.log(memes)
            this.setState({
                allMemeImages:memes
            })
        })
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
  
    handleSubmit(event){
        event.preventDefault()
        const randomNum = Math.floor(Math.random() * this.state.allMemeImages.length)
        const newRandomImage = this.state.allMemeImages[randomNum].url
        this.setState({
            randomImage: newRandomImage
        })
    }
    
    render() {
        return (
            <div>
                <form className='meme-form' onSubmit={this.handleSubmit}>
                    <input type='text' name='topText' value={this.state.topText} placeholder='Top Text' onChange={this.handleChange}/>
                    <input type='text' name='bottomText' value={this.state.bottomText} placeholder='Bottom Text' onChange={this.handleChange}/>
                    <button>Generate</button>
                
                </form>
                <div className='meme'>
                    <h3 className='topMemeText'>{this.state.topText}</h3>
                    <img src={this.state.randomImage}/>
                    <h3 className='bottomMemeText'>{this.state.bottomText}</h3>
                </div>
            </div>
            
        )
    }
}

export default MemeGenerator