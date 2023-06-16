import React, {useContext} from "react";
import { Flex, Text, Icon, Image } from "@chakra-ui/react";
import { ShopContext } from "../context/shopContext";
import {MdMenu, MdShoppingBasket} from "react-icons/md"

const NavBar = () => {
    const {openCart, openMenu, checkout } = useContext(ShopContext)
    return (
        <Flex backgroundColor="#FFA8E2" flexDirection="row" justifyContent="space-between" p="2rem">
            <Icon fill="white" as={MdMenu} w={30} h={30}></Icon>
            <Text> Logo </Text>            
            <Icon fill="white" cursor="pointer" as={MdShoppingBasket} w={30} h={30} onClick={() => openCart()}></Icon>
        </Flex>
    );
}

export default NavBar;