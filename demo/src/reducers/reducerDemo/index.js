// /src/reducers/reducerDemo/index.js
import actionType from '../../actions/actionType'

const reducerDemo= {
    demo:'this is a demo string'
}

export default (state = reducerDemo, action) => {
    switch(action.type) {
		case actionType.TYPE_DEMO_A:
            return (( )=>{
                state.demo ='A was chosed'
                alert(state.demo)
                return state
            })() 
        case actionType.TYPE_DEMO_B:
            return (( )=>{
                state.demo ='B was chosed'
                alert(state.demo)
                return state
            })() 
        case actionType.TYPE_DEMO_C:
            return (( )=>{
                state.demo ='C was chosed(delay)'
                alert(state.demo)
                return state
            })()     
        default:
            return state
    }
}