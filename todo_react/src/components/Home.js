import React, { Component } from 'react'
import Menu from './Menu'


class Home extends Component {
    render() {
        let pathname = this.props.match.path
        console.log('path', pathname)
        return (
            <div>
                <Menu path={pathname}/>
                点击上面的 todo 链接

            </div>
        )
    }
}

export default Home
