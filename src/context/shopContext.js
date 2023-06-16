import React, {Component} from 'react';
import Client from 'shopify-buy'

const ShopContext = React.createContext()
//process.env.REACT_APP_SHOPIFY_API, process.env.REACT_APP_SHOPIFY_DOMAIN,
const client = Client.buildClient({
    domain: 'quickstart-a80392fd.myshopify.com',
    storefrontAccessToken: '4ccb893bfab3463f67c4ce366a81c092'
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
        let outcheck = {'checkout': checkout}
        this.setState({...outcheck})
    }

    fetchCheckout = (checkoutId) => {
        client.checkout.fetch(checkoutId).then((checkout) => {
            let fetchout = {'checkout': checkout}
            this.setState({...fetchout})
        })
    }



    fetchProductWithHandle = (handle) => {
        client.product.fetchByHandle(handle).then((product) => {
            let item = {'product': product}
            this.setState({...item})
        });
    }

    addItemtoCheckout = async () => {} 
    removeLineItem = async (lineItemIdsToRemove) => {}
    closeCart = () => {}
    openCart = () => {}
    openMenu = () => {}
    
    render() {

        return (
            <ShopContext.Provider 
            value={{ ...this.state,
                client: client,
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