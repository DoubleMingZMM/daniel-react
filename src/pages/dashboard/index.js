import React, {Component} from 'react'
import image from '../../static/offshelf.png'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                this is dashboard~
                <img src={image}/>
            </div>
        )
    }
}