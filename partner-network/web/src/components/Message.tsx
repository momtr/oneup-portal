import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Center, Heading, Text } from '@chakra-ui/react';

export default function Message({ heading, text }: { heading: string, text: string }) {
    return (
        <Center>
            <Box textAlign="center" py={10} px={6}>
                <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    {heading}
                </Heading>
                <Text color={'gray.500'}>
                    {text}
                </Text>
            </Box>
        </Center>
    );
}
