import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button
  } from '@chakra-ui/react'

function Cart () {

    const {isCartOpen, onClose, closeCart, checkout, removeLineitem} = useContext(ShopContext)
    
    return ( 
       <>
        <Drawer
            isOpen={isCartOpen}
            placement='right'
            onClose={closeCart}
            // finalFocusRef={btnRef}
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
       </> 
    );
}

export default Cart;

