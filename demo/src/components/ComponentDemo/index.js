import React, { Component } from 'react'
import {typeA, typeB, typeCAsynC} from '../../actions/actionDemo'
import {connect} from 'react-redux'


class ComponentDemo extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <button onClick = {() => {
                   this.props.chooseA()
                }}>actionA</button>

                <button onClick = {() => {
                    this.props.chooseB()
                }}>actionB</button>

                <button onClick = {() => {
                    this.props.chooseC()
                }}>actionC</button>
            </div>
        )
    }

    
}

// 映射state到props
const mapStateToProps = (state) => {
    return {
        DomoProps: state
    }
}

// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      chooseA: () => { dispatch(typeA()) },
      chooseB: () => { dispatch(typeB()) },
      chooseC: () => { dispatch(typeCAsynC()) }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(ComponentDemo) 

