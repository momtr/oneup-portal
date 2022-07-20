import { ReactNode, useEffect } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
    Heading
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import F2CMLogo from "../graphics/F2CM.svg";
import useAuth from '../tools/auth';
import { getProfileImageUrl } from '../api/users';

const Links = [
    { linkTo: '/discover', text: '✨ Discover' },
    { linkTo: '/connect', text: '🌎 Connect' },
    { linkTo: '/invite', text: '💛 Invite' },
    { linkTo: '/services', text: '⚡️ Services' }
];

const NavLink = ({ linkTo, text }: { linkTo: string, text: string }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        textDecor={'none'}
        fontSize={'1.2rem'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={linkTo}>
        {text}
    </Link>
);


export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const auth = useAuth();

    useEffect(() => {
        console.log(auth.user);
    }, [auth.user])

    return (
        <>
            <Box mb={'2rem'} mr={'1rem'} ml={'1rem'}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box display={"flex"} alignItems={"center"}>
                            <a href="/">
                                <Image h={"2rem"} src={F2CMLogo} />
                            </a>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.text} text={link.text} linkTo={link.linkTo} />
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                {auth.user && <Avatar
                                    size={'sm'}
                                    name={`${auth.user.first_name} ${auth.user.last_name}`}
                                    src={
                                        getProfileImageUrl(auth.user.profile_picture || '')
                                    }
                                />}
                            </MenuButton>
                            <MenuList>
                                <MenuItem as="a" href="/create-post">Create Post</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={() => { auth.signout() }}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.text} text={link.text} linkTo={link.linkTo} />
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
