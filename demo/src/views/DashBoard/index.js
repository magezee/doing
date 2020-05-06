import React, { Component ,createRef} from 'react'

export default class DashBoard extends Component {
    constructor() {
		super()
		this.myRef = createRef()
    }
    
    addValue = () => {
        this.myRef.current.innerHTML = '修改后的数据'
    }

	render() {
        
		return (
            <div>
                <button ref={this.myRef}>value</button>
                <button onClick={this.addValue}>增加文本框value</button>
            </div>
        )
  	}
}

