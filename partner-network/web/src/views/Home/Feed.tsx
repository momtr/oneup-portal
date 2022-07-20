import {
    Avatar, Box,
    Button,
    Center,
    Heading, Icon, IconButton, Link, Stack, StackProps, Text, useColorModeValue
} from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { useEffect, useMemo, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import InView from 'react-intersection-observer';
import ReactMarkdown from 'react-markdown';
import { getDocumentUrl } from '../../api/documents';
import { getPosts, likePost, Post } from '../../api/posts';
import { getProfileImageUrl } from '../../api/users';
import useAuth from '../../tools/auth';

const markdownTheme = {
    p: ({ children }: { children: any }) => {
        return (
            <Text mb={2} fontSize={'1rem'}>
                {children}
            </Text>
        );
    },
};

function DownloadLink({ icon, text, fileUrl, ...rest }: { icon: any, text: string, fileUrl: string } & StackProps) {
    return (
        <Stack direction={'row'} {...rest}>
            <Icon as={icon} />
            <Link href={fileUrl} isExternal textDecor={'none'} download>
                {text}
            </Link>
        </Stack>
    )
}

interface Author {
    first_name: string,
    last_name: string,
    bio: string,
    position: string,
    registered_on: string,
    profile_picture?: string
}

interface Liker {
    first_name: string,
    last_name: string,
    profile_picture?: string
}

interface Like {
    likeNum: number,
    liker: Liker,
    time: string
}

interface PostProps {
    post: Post
}

function PostView(props: PostProps) {
    const { id, text, registered_on, author, attached_documents, likes, liked } = props.post;
    console.log(props);

    const auth = useAuth();

    const [justLiked, setJustLiked] = useState(false);

    const attached_documents_keys = useMemo(() => Object.keys(attached_documents || {}), [attached_documents]);
    return (
        <Box py={6}>
            <Box
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'lg'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Stack>
                    <Text
                        color={'f2cm_pink.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        Post
                    </Text>
                    <Box color={'black.500'}>
                        <ReactMarkdown components={ChakraUIRenderer(markdownTheme)} children={text} skipHtml />
                    </Box>
                    <Box>
                        {
                            attached_documents_keys.length > 0 ? (
                                <>
                                    <Heading size={'sm'} mt={'1rem'} mb={'1rem'}>Attached documents</Heading>
                                    <Stack>
                                        {
                                            attached_documents_keys.map((key) => (
                                                <DownloadLink key={key} icon={BsFillFileEarmarkTextFill} text={attached_documents[key].display_name} fileUrl={`${getDocumentUrl(key)}`} />
                                            ))
                                        }
                                    </Stack>
                                </>
                            ) : null
                        }
                    </Box>
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar
                        size='sm'
                        name={`${author.first_name} ${author.last_name}`}
                        src={getProfileImageUrl(author.profile_picture || '')}
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>{author.first_name} {author.last_name}</Text>
                    </Stack>
                    <Button
                        variant={"ghost"}
                        onClick={() => {
                            if (liked || justLiked) {
                                return
                            }
                            likePost(id);
                            setJustLiked(true);
                        }}

                    >
                        <Stack direction={'row'}>
                            <Heading size={'md'}>
                                {liked || justLiked
                                    ? <AiFillHeart color='#ff5353' />
                                    : <AiOutlineHeart />
                                }
                            </Heading>
                            <Text>{likes.length + (justLiked ? 1 : 0)} likes</Text>
                        </Stack>
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}


export function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        addNewPostsToState();
    }, []);

    async function addNewPostsToState(): Promise<void> {
        const newPosts = await getPosts(page);
        console.log(newPosts);
        setPosts([...posts, ...newPosts.data.posts.map((p: any) => p.post)]);
        setPage(page + 1);
    }

    return (
        <Center>
            <Box w={[300, 400, 700, 1000]}>
                <Heading>Current Topics</Heading>
                <IconButton size="lg" fontSize="3xl" position={'fixed'} zIndex={'100'} bottom={'2rem'} right={'2rem'} variant={"f2cm"} as="a" href="/create-post" colorScheme="f2cm_pink" borderRadius={'50%'} aria-label="add-post"
                    icon={<AiOutlinePlus />}>
                </IconButton>
                <Box>
                    {
                        posts.map((post, key) => (
                            <Box key={key}>
                                <PostView
                                    post={post}
                                />
                            </Box>
                        ))
                    }
                    <InView as={"div"} style={{ position: "absolute", bottom: "50vh" }} onChange={(inView) => {
                        console.log(`render new page: ${page + 1}`);
                        return (inView && addNewPostsToState())
                    }} />
                </Box>
            </Box>
        </Center>)
}
