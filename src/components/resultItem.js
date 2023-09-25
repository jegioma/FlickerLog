import {
    Box, Heading, Text, HStack, VStack, Card, Image, Stack
} from '@chakra-ui/react'
import { useState, useEffect, memo } from 'react'

export default function ResultItem({results}) {

    const MemoizedImage = memo(Image);

    return (
        <Stack display='inline' margin={0} padding={0}>
            <MemoizedImage
                src={`https://image.tmdb.org/t/p/w500${results.poster_path}`}
                alt={results.original_title}
                width={175}
                height={250}
                fallbackSrc="https://via.placeholder.com/150"

            />
            <VStack padding={0} margin={0}>
                <Heading>{results.original_title}</Heading>

            </VStack>
        </Stack>
    )
}