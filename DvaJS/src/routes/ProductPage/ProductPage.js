import React from "react"
import Product from "../../components/Product"
import { connect } from "dva"

class IndexPage extends React.Component{
    render(){
        const { productList,dispatch } = this.props;
        return(
            <div>
        {/* 
        props传入history，方便证明路由跳转的其中一种方法
        ProductIndex； <Product history={history} dispatch={dispatch} title="商品类型" productList={productList} /> 
        */}
                <Product dispatch={ dispatch } title="商品类型" productList={ productList } />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        productList:state.product
    }
}

export default connect(mapStateToProps)(IndexPage);