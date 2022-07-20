import { Box, Button, Text, FormControl, Input, SimpleGrid, Stack, Flex, Heading, Link, FormErrorMessage, Avatar, AvatarGroup, Center, Container, Icon, IconProps, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import useAuth from "../tools/auth";
import { useLocation, useNavigate } from "react-router-dom";

// function __Signin() {
//     return <Flex justifyContent={"center"} alignItems={"center"} height={["unset", "100vh"]} my={["inherit", "-2rem"]}>
//         <Box width={"100%"} maxWidth={"600px"}>
//             <form onSubmit={handleSubmit((res) => {
//                 console.log(res);
//             })}>
//                 <Stack spacing={"2rem"}>
//                     <Box display={"flex"} flexWrap="wrap" mb="1rem" alignItems={"center"}>
//                         <Image mr="1rem" h={"2rem"} src={F2CMLogo} />
//                         <Heading lineHeight={"2rem"} fontSize={"2rem"} as="h2">Partner Network</Heading>
//                         <Box flexGrow={1} />
//                     </Box>
//                     <FormControl isRequired isInvalid={!!errors.email}>
//                         <FormLabel mb="0" htmlFor='email'>📧 Email</FormLabel>
//                         <Input variant={"flushed"} id='email' placeholder='Email' type={"email"} />
//                         <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
//                     </FormControl>

//                     <FormControl isRequired isInvalid={!!errors.password}>
//                         <FormLabel mb="0" htmlFor='password'>🔑 Password</FormLabel>
//                         <Input variant={"flushed"} id='password' placeholder='Password' type={"password"} {...register('password')} />
//                         <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
//                     </FormControl>
//                     <Button variant={"f2cm"} type="submit">Connect</Button>
//                 </Stack>
//                 <Link href="signup" mt="0.5rem" textAlign={"left"} display="block">create account instead</Link>
//             </form>
//         </Box>
//     </Flex>
// }

export function Signin() {
    return (
        <>
            <JoinOurTeam />
        </>
    )
}

const avatars = [
    {
        name: 'Florian Flatscher',
        url: 'https://f2cm.skyrocket.at/assets/images/florian.jfif',
    },
    {
        name: 'Moritz Mitterdorfer',
        url: 'https://f2cm.skyrocket.at/assets/images/mo.jfif',
    },
    {
        name: 'Christoph Kainz',
        url: 'https://avatars.githubusercontent.com/u/57941033?v=4',
    },
    {
        name: 'Cien Biswas',
        url: 'https://avatars.githubusercontent.com/u/55954990?v=4',
    }
];

function JoinOurTeam() {
    const auth = useAuth();
    const toast = useToast();
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from?.pathname || "/";

    const formSchema = Yup.object().shape({
        email: Yup.string().email().max(100).required(),
        password: Yup.string().min(5).max(256).required(),
    })

    const validationOpt = { resolver: yupResolver(formSchema) }

    const { register, handleSubmit, formState } = useForm<{
        email: string,
        password: string
    }>(validationOpt);

    const { errors } = formState;

    return (
        <Box position={'relative'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                        Dive right into our community{' '}
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            &
                        </Text>{' '}
                        check the feed
                    </Heading>
                    <Stack direction={'row'} spacing={4} align={'center'}>
                        <AvatarGroup>
                            {avatars.map((avatar) => (
                                <Avatar
                                    key={avatar.name}
                                    name={avatar.name}
                                    src={avatar.url}
                                    size={useBreakpointValue({ base: 'md', md: 'lg' })}
                                    position={'relative'}
                                    zIndex={2}
                                    _before={{
                                        content: '""',
                                        width: 'full',
                                        height: 'full',
                                        rounded: 'full',
                                        transform: 'scale(1.125)',
                                        bgGradient: 'linear(to-bl, red.400,pink.400)',
                                        position: 'absolute',
                                        zIndex: -1,
                                        top: 0,
                                        left: 0,
                                    }}
                                />
                            ))}
                        </AvatarGroup>
                        <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                            +
                        </Text>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            fontFamily={'heading'}
                            fontSize={{ base: 'sm', md: 'lg' }}
                            bg={'gray.800'}
                            color={'white'}
                            rounded={'full'}
                            width={useBreakpointValue({ base: '44px', md: '60px' })}
                            height={useBreakpointValue({ base: '44px', md: '60px' })}
                            position={'relative'}
                            _before={{
                                content: '""',
                                width: 'full',
                                height: 'full',
                                rounded: 'full',
                                transform: 'scale(1.125)',
                                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                                position: 'absolute',
                                zIndex: -1,
                                top: 0,
                                left: 0,
                            }}>
                            YOU
                        </Flex>
                    </Stack>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            F2CM Partner Network
                        </Heading>
                    </Stack>
                    <form onSubmit={handleSubmit((e) => {
                        auth.signin(e)
                            .then(() => {
                                navigate(from, {replace: true})
                            }).catch((err) => {
                                toast({ status: "error", isClosable: true, position: "top-right", title: err.name, description: err.message })
                            })
                    })}>
                        <Box mt={10}>
                            <Stack spacing={4}>
                                <FormControl isInvalid={!!errors.email}>
                                    <Input
                                        placeholder="Your account's email address"
                                        bg={'gray.100'}
                                        border={0}
                                        color={'gray.500'}
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                        type={'email'}
                                        {...register('email')}
                                    />
                                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.password}>
                                    <Input
                                        placeholder="Your secure password"
                                        bg={'gray.100'}
                                        border={0}
                                        color={'gray.500'}
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                        type={'password'}
                                        {...register('password')}
                                    />
                                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                                </FormControl>
                            </Stack>
                            <Button variant={"f2cm"} type="submit" w={'full'} mt={8}>Login</Button>
                            <Center mt={'1rem'}>
                                <Link href="signup" mt="0.5rem" textAlign={"left"} display="block">create account instead</Link>
                            </Center>
                        </Box>
                    </form>
                </Stack>
            </Container>
            <Blur
                position={'absolute'}
                top={-10}
                left={-10}
                style={{ filter: 'blur(70px)' }}
            />
        </Box>
    );
}

export const Blur = (props: IconProps) => {
    return (
        <Icon
            width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
            zIndex={useBreakpointValue({ base: -1, md: -1, lg: -1 })}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <circle cx="71" cy="61" r="111" fill="#F56565" />
            <circle cx="244" cy="106" r="139" fill="#ED64A6" />
            <circle cy="291" r="139" fill="#ED64A6" />
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
        </Icon>
    );
};
