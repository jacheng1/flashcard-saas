'use client'

import { useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import {ChevronLeft} from 'lucide-react';

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);

    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user) {
                return;
            } else {
                const docRef = doc(collection(db, 'users'), user.id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const collections = docSnap.data().flashcards || [];

                    setFlashcards(collections);
                } else {
                    await setDoc(docRef, {flashcards: []});
                }
            }
        }

        getFlashcards();
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    }

    const back = () => { 
        router.push('/generate');
    }

    return (
        <Container maxWidth="100vw">
            <Typography variant="h4" sx={{mt: 4}} borderBottom={"solid .2rem black"} display={"flex"} alignItems={"center"}>
                  <ChevronLeft size={"3rem"} onClick={back} cursor={"pointer"}></ChevronLeft>My Flashcards Collections
            </Typography>
            <Grid container spacing = {3} sx={{mt: 4}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea 
                                onClick={() => {
                                    handleCardClick(flashcard.name)
                                }}>
                                    <CardContent>
                                        <Typography variant="h6">
                                            {flashcard.name}
                                        </Typography>
                                    </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}