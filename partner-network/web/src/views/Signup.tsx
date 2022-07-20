import { Box, Button, FormControl, FormLabel, Text, Input, InputGroup, InputLeftElement, Stack, Textarea, Image, SimpleGrid, Heading, Flex, Link, FormErrorMessage, useToast, Center, FormHelperText, Alert, AlertIcon } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaGithub, FaInstagram, FaLinkedin, FaSnapchat, FaTwitter } from 'react-icons/fa'
import F2CMLogo from "../graphics/F2CM.svg";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import useAuth from "../tools/auth";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { LargeWithLogoLeft } from "./Funnel";

export function Signup() {
    const auth = useAuth();
    const toast = useToast();

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const from = (location.state as any)?.from?.pathname || "/";



    const formSchema = Yup.object().shape({
        first_name: Yup.string()
            .max(100)
            .matches(/^[a-z ,.'-]+$/i, 'first name must only contain letters')
            .required()
            .label('first name'),
        last_name: Yup.string()
            .max(100)
            .matches(/^[a-z ,.'-]+$/i, 'last name must only contain letters')
            .required(),
        email: Yup.string().email().max(100).required(),
        password: Yup.string().min(5).max(256).required(),
        bio: Yup.string().max(1024).required(),
        position: Yup.string().max(100).required(),
        phone_number: Yup.string().max(20).label("phone number"),
        social_twitter: Yup.string().max(124).optional(),
        social_linkedin: Yup.string().max(124).optional(),
        social_github: Yup.string().max(124).optional(),
        social_instagram: Yup.string().max(124).optional(),
        social_snapchat: Yup.string().max(124).optional(),
        activation_code: Yup.string().length(10).label("activation code"),

        repeat_password: Yup.string()
            .oneOf([Yup.ref('password')], 'passwords don\'t match'),
    })


    const { register, handleSubmit, formState } = useForm<{
        first_name: string,
        last_name: string,
        email: string,
        phone_number: string,
        password: string,
        repeat_password?: string,
        bio: string,
        position: string,
        social_twitter: string,
        social_instagram: string,
        social_linkedin: string,
        social_snapchat: string,
        social_github: string,
        activation_code: string,
    }>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            activation_code: searchParams.get('code') || ""
        }
    });

    const { errors } = formState;

    const [image, setImage] = useState<Blob>();
    const imagePickerRef = useRef<HTMLInputElement>();

    const url = useMemo(() => {
        if (!image) return undefined;
        return URL.createObjectURL(image)
    }, [image]);



    return <>
        <Flex m="2rem" direction={"column"} alignItems={"center"}>
            <Box width={"100%"} maxWidth={"1000px"}>
                <Box display={"flex"} flexWrap="wrap" mb="5rem" alignItems={"center"}>
                    <a href="/">
                        <Image mr="1rem" h={"2rem"} src={F2CMLogo} />
                    </a>

                    <Heading lineHeight={"2rem"} fontSize={"2rem"} as="h2">Partner Network</Heading>
                    <Box flexGrow={1} />
                    <Text display={['none', 'none', 'block']} ml="1rem" fontWeight={"900"} letterSpacing="0.1em">#mindset</Text>
                    <Text display={['none', 'none', 'block']} ml="1rem" fontWeight={"900"} letterSpacing="0.1em">#digital</Text>
                    <Text display={['none', 'none', 'block']} ml="1rem" fontWeight={"900"} letterSpacing="0.1em">#innovation</Text>
                </Box>
                <form onSubmit={handleSubmit((e) => {
                    delete e.repeat_password;
                    if (!image) {
                        alert("profile image is required")
                        return;
                    }
                    auth.signupAndSignin({
                        ...e
                    }, image).then(() => {
                        navigate(from, { replace: true })
                    }).catch((err) => {
                        toast({ status: "error", isClosable: true, position: "top-right", title: err.name, description: err.message })
                    })
                })}>
                    <Box as="input" accept=".png,.jpg,.jpeg,.gif" type="file" display="none" ref={imagePickerRef as any}
                        onChange={(e: any) => {
                            e.preventDefault();
                            e.target.files?.length == 1 && setImage(e.target.files[0]);
                        }}

                    />
                    <Stack spacing={"2rem"}>
                        <Stack direction={['column', 'row']} position={"relative"} spacing={"2rem"} alignItems="center">

                            <Center flexShrink={"0"} as="button" width="10rem" height="10rem" bg="gray.200" type="button" backgroundImage={url} borderRadius='full' backgroundPosition={"center"} backgroundSize={"cover"}
                                onClick={() => imagePickerRef.current?.click()}
                            >
                                {!url && <Text maxW={"75%"} color="gray.500">Click to select Profile Image</Text>}
                            </Center>

                            <Stack width={"100%"} spacing={"2rem"} flexGrow="1">
                                <FormControl isRequired isInvalid={!!errors.first_name}>
                                    <FormLabel mb="0" htmlFor='first_name'>First name</FormLabel>
                                    <Input variant={"flushed"} id='first_name' placeholder='First name' {...register('first_name')} />
                                    <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={!!errors.last_name}>
                                    <FormLabel mb="0" htmlFor='last_name'>Last name</FormLabel>
                                    <Input variant={"flushed"} id='last_name' placeholder='Last name' {...register('last_name')} />
                                    <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </Stack>

                        <SimpleGrid columns={[1, 1, 2]} gap={"2rem"}>
                            <FormControl isRequired isInvalid={!!errors.email}>
                                <FormLabel mb="0" htmlFor='email'>📧 Email</FormLabel>
                                <Input variant={"flushed"} id='email' placeholder='Email' type={"email"} {...register('email')} />
                                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.phone_number}>
                                <FormLabel mb="0" htmlFor='phone_number'>📱 Phone Number (optional)</FormLabel>
                                <Input variant={"flushed"} id='phone_number' placeholder='Phone Number' {...register('phone_number')} />
                                <FormErrorMessage>{errors.phone_number?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={!!errors.password}>
                                <FormLabel mb="0" htmlFor='password'>🔑 Password</FormLabel>
                                <Input variant={"flushed"} id='password' placeholder='Password' type={"password"} {...register('password')} />
                                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={!!errors.repeat_password}>
                                <FormLabel mb="0" htmlFor='repeat_password'>🔑 Confirm Password</FormLabel>
                                <Input variant={"flushed"} id='repeat_password' placeholder='Confirm Password' type={"password"} {...register('repeat_password')} />
                                <FormErrorMessage>{errors.repeat_password?.message}</FormErrorMessage>
                            </FormControl>
                        </SimpleGrid>

                        <FormControl isRequired isInvalid={!!errors.bio}>
                            <FormLabel mb="0" htmlFor='bio'>📚 Bio</FormLabel>
                            <Textarea variant={"f2cm"} id='bio' {...register('bio')} />
                            <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.position}>
                            <FormLabel mb="0" htmlFor='position'>🧰 Position</FormLabel>
                            <Input variant={"flushed"} id='position' placeholder='Describe your current position' {...register('position')} />
                            <FormErrorMessage>{errors.position?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.activation_code}>
                            <FormLabel mb="0" htmlFor='activation_code'>⚡ Activation Code</FormLabel>
                            <Input variant={"flushed"} id='activation_code' placeholder='Enter your activation code' {...register('activation_code')} />
                            <FormErrorMessage>{errors.activation_code?.message}</FormErrorMessage>
                            <FormHelperText>We are currently in Beta. To enter you need an activation code. To get one, ask a partner who is already in the network.</FormHelperText>
                        </FormControl>

                        <Box>
                            <FormLabel mb="1rem">Linked Accounts (Optional)</FormLabel>
                            <SimpleGrid columns={[1, 2, 3, 4, 5]} gap={"1rem"}>
                                <FormControl isInvalid={!!errors.social_twitter}>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none' children={<FaTwitter color="#00acee" />} />
                                        <Input variant={"outline"} id='social_twitter' placeholder='Twitter' focusBorderColor="#00acee" {...register('social_twitter')} />
                                        <FormErrorMessage>{errors.social_twitter?.message}</FormErrorMessage>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isInvalid={!!errors.social_instagram}>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none' children={<FaInstagram color="#833AB4" />} />
                                        <Input variant={"outline"} id='social_instagram' placeholder='Instagram' focusBorderColor="#833AB4" {...register('social_instagram')} />
                                        <FormErrorMessage>{errors.social_instagram?.message}</FormErrorMessage>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isInvalid={!!errors.social_linkedin}>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none' children={<FaLinkedin color="#0077B5" />} />
                                        <Input variant={"outline"} id='social_linkedin' placeholder='Linkedin' focusBorderColor="#0077B5" {...register('social_linkedin')} />
                                        <FormErrorMessage>{errors.social_linkedin?.message}</FormErrorMessage>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isInvalid={!!errors.social_snapchat}>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none' children={<FaSnapchat color="#FFFC00" />} />
                                        <Input variant={"outline"} id='social_snapchat' placeholder='Snapchat' focusBorderColor="#FFFC00" {...register('social_snapchat')} />
                                        <FormErrorMessage>{errors.social_snapchat?.message}</FormErrorMessage>
                                    </InputGroup>
                                </FormControl>
                                <FormControl isInvalid={!!errors.social_github}>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none' children={<FaGithub color="#000000" />} />
                                        <Input variant={"outline"} id='social_github' placeholder='Github' focusBorderColor="#000000" {...register('social_github')} />
                                        <FormErrorMessage>{errors.social_github?.message}</FormErrorMessage>
                                    </InputGroup>
                                </FormControl>
                            </SimpleGrid>
                        </Box>
                        <Alert status="info" color="gray.600">
                            <AlertIcon />
                            Your profile will be visible to other F2CM members
                        </Alert>
                        <Stack>
                            <Button variant={"f2cm"} type="submit">Join the Network</Button>
                            <Text>By joining the network you agree with our <Link href="/data-privacy">Data Privacy</Link> and our <Link href="/terms-of-service">Terms of Service</Link>.</Text>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Flex>
        <LargeWithLogoLeft/>
    </>
}
