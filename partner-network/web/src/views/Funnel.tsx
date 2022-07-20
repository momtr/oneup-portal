import {
  Avatar,
  Box,
  chakra,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Image,
  Center,
  Text,
  Button,
  Stack,
  createIcon,
  StackDivider,
  IconProps,
  useBreakpointValue,
  Link,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  useDisclosure
} from '@chakra-ui/react';
import F2CMLogo from "../graphics/F2CM.svg";
import { ReactNode, ReactElement, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import floImg from "../graphics/FLO.png";
import davidImg from "../graphics/DAVID.jpg";

// firest section

export function CallToActionWithAnnotation() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Join the generation z <br />
            <Text as={'span'} color={'f2cm_pink.500'}>
              community ✨
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            You want to drive innovative projects? Get to know projects that are shared by the community! Joining  <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>F2CM Partner Network</chakra.strong>, you can benefit from all F2CM services.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <RouterLink to={'/signup'}>
              <Button variant={"f2cm"} type="submit" w={'full'} mt={8}>
                Get started
              </Button>
            </RouterLink>
            <RouterLink to={'/signin'}>
              <Button variant={'link'} color={'f2cm_pink.500'} size={'sm'}>
                Log me in
              </Button>
            </RouterLink>
            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue('gray.800', 'gray.300')}
                w={71}
                position={'absolute'}
                right={-71}
                top={'10px'}
              />
              <Text
                fontSize={'lg'}
                fontFamily={'Roboto'}
                position={'absolute'}
                right={'-125px'}
                top={'-15px'}
                transform={'rotate(10deg)'}>
                For free
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});


// testimonials

const testimonials = [
  {
    name: 'Florian Flatscher',
    role: 'F2CM Team',
    content:
      'F2CM Partner Network is a community of motivated people belonging to generation z. We know what we like. We know what we love. We know what we stand for. 🤩',
    avatar:
      '	https://f2cm.skyrocket.at/assets/images/florian.jfif',
  },
  {
    name: 'Moritz Mitterdorfer',
    role: 'F2CM Team',
    content:
      "We are solution-oriented. The F2CM Service Hub includes powerful tools, such as a gen-z-centric survey manager. Get your ideas into the world faster! 🧠",
    avatar:
      'https://f2cm.skyrocket.at/assets/images/mo.jfif',
  },
  {
    name: 'David Hirner',
    role: 'Contributor',
    content: "F2CM Partner Network motivates me.",
    avatar: davidImg
  }
];

const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  index: number;
}

function TestmonialCard(props: TestimonialCardProps) {
  const { name, role, content, avatar, index } = props;
  return (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
      _after={{
        content: '""',
        position: 'absolute',
        height: '21px',
        width: '29px',
        left: '35px',
        top: '-10px',
        backgroundSize: 'cover',
        backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AEA'/%3E%3C/svg%3E")`,
      }}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
        backgroundImage: backgrounds[index % 4],
      }}>
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        <chakra.p
          fontFamily={'Roboto'}
          fontWeight={'medium'}
          fontSize={'15px'}
          pb={4}>
          {content}
        </chakra.p>
        <chakra.p fontFamily={'Roboto'} fontWeight={'bold'} fontSize={14}>
          {name}
          <chakra.span
            fontFamily={'Roboto'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            - {role}
          </chakra.span>
        </chakra.p>
      </Flex>
      <Avatar
        src={avatar}
        height={'80px'}
        width={'80px'}
        alignSelf={'center'}
        m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
      />
    </Flex>
  );
}

export function Testimonial() {
  return (
    <Flex
      textAlign={'center'}
      pt={10}
      justifyContent={'center'}
      direction={'column'}
      width={'full'}
      marginTop={'4rem'}
      paddingLeft={'1rem'}
      paddingRight={'1rem'}
      boxSizing={'border-box'}>
      <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
        <chakra.h1
          py={5}
          fontSize={48}
          fontFamily={'Roboto'}
          fontWeight={'bold'}
          color={useColorModeValue('#FF0460', '#FF0460')}>
          Partner Network
        </chakra.h1>
        <chakra.h2
          margin={'auto'}
          width={'70%'}
          fontFamily={'Roboto'}
          fontWeight={'medium'}
          color={useColorModeValue('gray.500', 'gray.400')}>
          See what we say about{' '}
          <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
            F2CM Partner Network
          </chakra.strong>{' '}
        </chakra.h2>
      </Box>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        spacing={'20'}
        mt={16}
        mx={'auto'}>
        {testimonials.map((cardInfo, index) => (
          <TestmonialCard {...cardInfo} index={index} key={index} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}


// footer
const Logo = (props: any) => {
  return (
    <Image h={"2rem"} src={F2CMLogo} />
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export function LargeWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      marginTop={'10rem'}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <a href="/">
                <Logo color={useColorModeValue('gray.700', 'white')} />
              </a>
            </Box>
            <Text fontSize={'sm'}>
              © 2022 F2CM. All rights reserved.
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Network</ListHeader>
            <Link as={RouterLink} to={'/'}>Dashboard</Link>
            <Link as={RouterLink} to={'/signup'}>Signup</Link>
            <Link as={RouterLink} to={'/signin'}>Login</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>About</ListHeader>
            <Link as={RouterLink} to={'/impressum'}>Impressum</Link>
            <Link as={RouterLink} to={'/data-privacy'}>Data Privacy</Link>
            <Link as={RouterLink} to={'/terms-of-service'}>Terms of Service</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Team</ListHeader>
            <Link isExternal href={'https://f2cm.skyrocket.at'}>F2CM</Link>
            <Link isExternal href={'https://at.linkedin.com/in/florian-flatscher-152a6a188'}>Florian Flatscher</Link>
            <Link isExternal href={'https://at.linkedin.com/in/moritz-mitterdorfer-053122201'}>Moritz Mitterdorfer</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Follow Us</ListHeader>
            <Link isExternal href={'https://www.instagram.com/f2cm_at/?hl=en'}>Instagram</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

// features
interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export function Features() {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'f2cm_pink.500'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('pink.50', 'pink.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            What problems we solve
          </Text>
          <Heading>The benfits we offer</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            F2CM connects people. See all members including their contact details, disucuss new trends, profit from relevant documents summarizing key concepts.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
            <Feature
              icon={
                <Heading size={'md'}>💛</Heading>
              }
              iconBg={useColorModeValue('white.100', 'white.900')}
              text={'Connecting to like-minded people'}
            />
            <Feature
              icon={
                <Heading size={'md'}>📑</Heading>
              }
              iconBg={useColorModeValue('white.100', 'white.900')}
              text={'Documents & presentations'}
            />
            <Feature
              icon={
                <Heading size={'md'}>🧠</Heading>
              }
              iconBg={useColorModeValue('white.100', 'white.900')}
              text={'Getting knowledge'}
            />
            <Feature
              icon={
                <Heading size={'md'}>🖥</Heading>
              }
              iconBg={useColorModeValue('white.100', 'white.900')}
              text={'Access to F2CM Service Hub'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={floImg}
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}

const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
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

// austria bage
function AustriaBadge() {
  return (
    <Box bg={'gray.100'} mb={20} p={4} fontWeight='bold'>
      🇦🇹 Hi there! We are from Austria.
    </Box>
  )
}

// modal
function ModalF2cm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>👋 We can't wait to see you</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>We are currently building this platform which'll be launched soon. Have a look on our team page instead! :)</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3}>
            <Link textDecor={'none'} isExternal href={'https://f2cm.skyrocket.at'}>Take me there</Link>
          </Button>
          <Button variant='ghost' onClick={onClose}>Visit platform instead</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

// funnel
export function Funnel() {
  return <>
    <ModalF2cm />
    <Center marginBottom={'1rem'} mt={'2rem'}>
      <Image h={"3rem"} src={F2CMLogo} />
    </Center>
    <CallToActionWithAnnotation />
    <Features />
    <Testimonial />
    <LargeWithLogoLeft />
  </>
}
