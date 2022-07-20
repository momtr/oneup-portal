import { Box, Button, Center, Flex, Heading, HStack, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Message from "../../components/Message";
import { ReactElement } from 'react';
import config from '../../../config';
import QRCode from "react-qr-code";
import useAuth from "../../tools/auth";
import { CopyIcon } from "@chakra-ui/icons";

interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};

function SimpleThreeColumns() {
    return (
        <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Feature
                    icon={<Heading size={'lg'}>🎁</Heading>}
                    title={'Share Invitation'}
                    text={
                        'Share one QR code or the link below the QR code. You can send the link via a messenger.'
                    }
                />
                <Feature
                    icon={<Heading size={'lg'}>💛</Heading>}
                    title={'Invite your friends'}
                    text={
                        'Your friend just has to scan to follow the link to become part of the exclusive F2CM Partner Network.'
                    }
                />
                <Feature
                    icon={<Heading size={'lg'}>👋</Heading>}
                    title={'Get rewarded'}
                    text={
                        'Say hi to your friend! You now rank higher in the F2CM Partner Network.'
                    }
                />
            </SimpleGrid>
        </Box>
    );
}

const buildLink = (token: string) => `${config.BASE_URL}signup?code=${token}`;
export function ActivationQrCode({ token }: { token: string }) {
    return <QRCode value={buildLink(token)} />
}

export function PartnerCodes() {
    const auth = useAuth();

    return (
        <>
            <Center flexDirection={'column'}>
                <Box w={[300, 400, 700, 1000]}>
                    <Message
                        heading={'Help us Expand'}
                        text={'🎉 Congrats! You are a verified F2CM Partner. Help your friends to join the F2CM Partner Network by sharing one of your codes! You will be rewarded.'}
                    />
                </Box>
                <Box w={[300, 400, 700, 1000]} mt={'4rem'}>
                    <SimpleThreeColumns />
                </Box>
                <Box w={[300, 400, 700, 1000]} mt={'4rem'}>
                    <Heading>Your Invitation Codes</Heading>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={'2rem'}>
                        {
                            auth.user && auth.user.giveaway_activation_token.map((token, key) => {
                                if(token.used)
                                    return null;
                                return (
                                    <Box key={key}>
                                        <Box>
                                            <ActivationQrCode token={token.token} />
                                        </Box>
                                        <Button mt={'1rem'} onClick={() => { navigator.clipboard.writeText(buildLink(token.token)) }}>
                                            <HStack>
                                                <CopyIcon />
                                                <Text>Copy Link!</Text>
                                            </HStack>
                                        </Button>
                                    </Box>
                                )
                            })
                        }
                        {
                            auth.user?.giveaway_activation_token.filter(c => !c.used).length == 0 ? (<Text>🤩 You have used all your invitation codes.</Text>) : null
                        }
                    </SimpleGrid>
                </Box>
            </Center>
        </>
    )
}
