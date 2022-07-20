import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  useColorModeValue,
  SimpleGrid,
  Badge
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaSnapchat, FaTwitch, FaTwitter } from 'react-icons/fa';
import { getProfileImageUrl, getUsersToConnect, UserProfile, UserProfilePage, UserProfilePageElement } from '../../api/users';
import useAuth from '../../tools/auth';
import { User } from '../../types/user';
import InView from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';


export function UserProfileView({ user }: { user: UserProfile }) {
  const navigate = useNavigate();

  return (
    <Box
      maxW={'320px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'lg'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}>
      <Avatar
        size={'xl'}
        name={`${user.first_name} ${user.last_name}`}
        src={
          getProfileImageUrl(user.profile_picture || '')
        }
        mb={4}
        pos={'relative'}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: 'green.300',
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {user.first_name} {user.last_name}
      </Heading>
      <Text fontWeight={600} color={'gray.500'} mb={4} textTransform={'uppercase'}>
        {user.position}
      </Text>
      <Text
        textAlign={'center'}
        color={useColorModeValue('gray.700', 'gray.400')}
        px={3}>
        {user.bio}
      </Text>

      <Stack align={'center'} justify={'center'} direction={'row'} mt={6} display={user.badges.length > 0 ? 'inherit' : 'none'}>
        {
          user.badges.map((badge, key) => (
            <Badge
              px={2}
              py={1}
              borderRadius={'50px'}
              bgColor={badge.theme}
              fontWeight={'700'}
              color={'white'}>
              {badge.code}
            </Badge>
          ))
        }
      </Stack>

      <Center>
        <Stack mt={8} direction={'row'} spacing={4} align={'center'}>
          {user.social_linkedin ? (<Box onClick={() => navigate(user.social_linkedin || 'https://linkedin.com')}><FaLinkedin color="#0077B5" /></Box>) : null}
          {user.social_instagram ? (<Box onClick={() => navigate(user.social_instagram || 'https://instagram.com')}><FaInstagram color="#833AB4" /></Box>) : null}
          {user.social_github ? (<Box onClick={() => navigate(user.social_github || 'https://github.com')}><FaGithub color="#000000" /></Box>) : null}
          {user.social_twitter ? (<Box onClick={() => navigate(user.social_twitter || 'https://twitter.com')}><FaTwitter color="#00acee" /></Box>) : null}
          {user.social_snapchat ? (<Box onClick={() => navigate(user.social_snapchat || 'https://snapchat.com')}><FaSnapchat color="#FFFC00" /></Box>) : null}
        </Stack>
      </Center>

      <Stack mt={8} direction={'row'} spacing={4}>
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          _focus={{
            bg: 'gray.200',
          }}
          onClick={() => navigator.clipboard.writeText(user.email)}>
          Copy email
        </Button>
        <Button
          flex={1}
          variant={'f2cm'}>
          Connect
        </Button>
      </Stack>
    </Box>
  );
}

export default function Connect() {
  const auth = useAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [page, setPage] = useState(0);

  function fetchUsers() {
    getUsersToConnect(page)
      .then((response) => {
        const newProfiles = response.data.users.map((u: UserProfilePageElement) => u.user);
        setProfiles([...profiles, ...newProfiles]);
      })
    setPage(page + 1);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Center>
      <Box w={[300, 400, 700, 1000]}>
      <Heading>Top Profiles</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={6}>
          {
            profiles && profiles.map((p: UserProfile, key: number) => (
              <Box key={key}>
                <UserProfileView user={p} />
              </Box>
            ))
          }
          {
            profiles.length === 10 && (
              <InView as={"div"} style={{ position: "absolute", bottom: "50vh" }} onChange={(inView) => {
                console.log(`render new page: ${page + 1}`);
                return (inView && fetchUsers())
              }} />
            )
          }
        </SimpleGrid>
      </Box>
    </Center>

  )
}
