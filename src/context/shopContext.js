import React, {Component} from 'react';
import Client from 'shopify-buy'

const ShopContext = React.createContext()
const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN, 
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
})

class ShopProvider extends Component {

    state = {
        product: {},
        products: [],
        checkout: {},
        isCartOpen: false,
        isMenuOpen: false
    }

    componentDidMount() {
        if (localStorage.checkout_id) {
            this.fetchCheckout(localStorage.checkout_id)
        } else {
            this.createCheckout()    
        }
    }
 
    createCheckout = async () => {
        const checkout = await client.checkout.create()
        localStorage.setItem("checkout_id", checkout.id)
        this.setState({checkout: checkout})
    }

    fetchCheckout = (checkoutId) => {
        client.checkout.fetch(checkoutId).then((checkout) => {
            this.setState({checkout: checkout})
        })
    }

    fetchAllProducts = async () => {
        const products  = await client.product.fetchAll()
        this.setState({ products: products })
    }

    fetchProductWithHandle = (handle) => {
        client.product.fetchByHandle(handle).then((product) => {
            this.setState({product: product})
        });
    }

    addItemtoCheckout = async () => {} 
    removeLineItem = async (lineItemIdsToRemove) => {}
    closeCart = () => {}
    openCart = () => {}
    openMenu = () => {}
    
    render() {
        console.log(this.checkout)
        return (
            <ShopContext.Provider 
            value={{ ...this.state,
                fetchAllProducts: this.fetchAllProducts,
                fetchProductWithHandle: this.fetchProductWithHandle,
                addItemToCheckout: this.addItemtoCheckout,
                removeLineItem: this.removeLineItem,
                closeCart: this.closeCart,
                openCart: this.openCart,
                openMenu: this.openMenu,
                closeMenu: this.closeMenu
            }}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}

const ShopConsumer = ShopContext.Consumer

export {ShopConsumer, ShopContext}

export default ShopProvider