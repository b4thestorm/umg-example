import React, { useContext, useEffect, useState, useParams } from 'react';
import { Link } from 'react-router-dom'
import {Box, Grid, Text, Image}  from '@chakra-ui/react';
import { ShopContext } from '../context/shopContext';

const Home = () => {
    const {client} = useContext(ShopContext)
    let [products, setProducts] = useState(null)

    const fetchAllProducts = () => {
        client.product.fetchAll().then((products) => {
            setProducts(products)
        })
    }
    useEffect(() => {
        fetchAllProducts()
    }, [])

    return (
        <Box>
            <Grid templateColumns="repeat(3, 1fr)">
        {
            products ? (
                products.map((product) => {
                    return (
                        <Link to={`/products/${product.handle}`} key={product.id}>
                            <Box _hover={{ opacity: '80%'}}  textAlign={'center'}>
                                <Image src={product.images[0]?.src}/>
                                <Text>
                                    {product.title}
                                </Text>
                            </Box>      
                        </Link>
                        )

                })
            ) : (
                <div>Loading...</div>
            )
        }
            </Grid>
        </Box>   
    );
}

export default Home;