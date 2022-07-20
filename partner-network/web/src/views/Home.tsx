import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Image, Link } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../graphics/Footer.svg";
import { LargeWithLogoLeft } from "./Funnel";

export function Home() {
    return <Box minH="100vh" display={"flex"} flexDirection="column">
        <Navbar />
        <Outlet />
        {/*
        <Box position="fixed" height={"2rem"} background="linear-gradient(90deg, #FF0460 0%, #FFCF11 100%)" borderRadius="52px" z-index="10" bottom="1rem" left="2rem" right="2rem">
            <Box position={"absolute"} top="0" left="0.5rem">
                <svg height={"2rem"} viewBox="0 0 8195 231" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text fill="white" fontFamily="gilroy-bold" fontSize="160" fontWeight="900" letterSpacing="0.1em"><tspan x="54.1875" y="170.188">Partner Network</tspan></text>
                </svg>
            </Box>
            <Box position={"absolute"} top="0" right="0.5rem">
                <svg height={"2rem"} viewBox="0 0 8195 231" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text fill="black" fontFamily="Roboto" fontSize="100" fontWeight="900" letterSpacing="0.1em"><tspan x="7486.38" y="149.68">#innovation</tspan></text>
                </svg>
            </Box>
        </Box>
        */}
        <Box flexGrow="1" flexShrink={0}></Box>
        <LargeWithLogoLeft/>
    </Box>
}