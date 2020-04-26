import React, { Component } from 'react';

const Loadble = ({
    loader,
    loading: Loading    // 因为组件不能小写开头，因此转一下    
}) => {
    return class Loader extends Component {
        state = {
            LoaderComponent: null
        }
        
        componentDidMount() {
            // import('...')
            loader()
                .then((resp)=>{
                    this.setState({
                        LoaderComponent:resp.default
                    })
                })
        }
        render() {
            const {
                LoaderComponent
            } = this.state  // 解构
            
            return (
                LoaderComponent
                ?
                <LoaderComponent/>
                :
                <Loading/>
            );
        }
    }
        
}




export default Loadble;