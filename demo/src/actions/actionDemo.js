import actionType from './actionType'

export const typeA = () =>{
    return {
        type: actionType.TYPE_DEMO_A
    }
}

export const typeB = () =>{
    return {
        type: actionType.TYPE_DEMO_B
    }
}


const typeC = () =>{
    return {
        type: actionType.TYPE_DEMO_C
    }
}

// 异步action 使用redux-thunk之后就可以在actionCreator里return一个方法，此方法的参数是dispatch（只要return了方法会自动识别并传入dispatch方法）
export const typeCAsynC = () => {
    return (dispatch) => {
        setTimeout(() =>{
            dispatch(typeC())		// 手动dispatch
        },2000)
    }
}
