import { useEffect, useRef } from "react"
import Quill from "quill"
import { Box, Button, Center, Text, Heading, Stack, useToast } from "@chakra-ui/react";
import toMarkdown from "to-markdown";
import { createPost } from "../../api/posts";
import { useNavigate } from "react-router-dom";
import { createDocument } from "../../api/documents";

let quill: Quill | null | undefined;

export function PostCreator() {
    const attachmentsRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        quill = new Quill('#post-editor-container', {
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['blockquote'],
                ]
            },
            placeholder: 'Compose a new post...',
            theme: 'snow'  // or 'bubble'
        });
        return () => {
            const editor = document.querySelector("#post-editor-container");
            if (editor != null) {
                editor.innerHTML = "";
                const headline = editor.parentElement?.querySelector(".ql-toolbar");
                headline?.remove();
            }
        }
    }, [])

    return <Center>
        <Stack spacing="1rem" maxW="1000px" w="100%" p="1rem">
            <Heading >Create Post</Heading>
            <Box>
                <div id="post-editor-container"></div>
                <Text fontSize="xs" color={"gray"}>500 characters allowed</Text>
            </Box>
            <Heading size="md">Attachments</Heading>
            <input ref={attachmentsRef as any} type={"file"} multiple></input>
            <Button colorScheme={"f2cm_pink"} onClick={async () => {
                if (!quill) {
                    return;
                }
                let html = (quill as any).container.firstChild.innerHTML;
                let markdown = toMarkdown(html);
                let documents = Array.from(attachmentsRef.current?.files || []);

                try {
                    let documentWithPaths = await Promise.all(documents.map(async (d) => (
                        {
                            path: (await createDocument(d)).data.documentPath,
                            document: d
                        })));

                    await createPost({
                        text: markdown,
                        attached_documents: documentWithPaths.reduce((acc, curr) => ({ ...acc, [curr.path]: { display_name: curr.document.name } }), {})
                    });
                } catch (err: any) {
                    toast({ status: "error", isClosable: true, position: "top-right", title: err.name, description: err.message })
                    return
                }
                navigate('/')
            }}>Absenden</Button>
        </Stack>
    </Center>
}