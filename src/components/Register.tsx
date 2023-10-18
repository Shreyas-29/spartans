"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Button, buttonVariants } from "@/components/ui/Button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"
import { AspectRatio } from "@/components/ui/AspectRatio"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Input } from './ui/Input'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'


interface Props {

}

const Register: React.FC<Props> = () => {

    const router = useRouter();

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [captureButtonDisabled, setCaptureButtonDisabled] = useState<boolean>(false);
    const [lastCaptureTime, setLastCaptureTime] = useState<number | null>(null);

    const formSchema = z.object({
        name: z.string().nonempty(),
        email: z.string().nonempty(),
        password: z.string().nonempty()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {

    };

    const captureImage = async () => {
        // Disable the capture button while processing
        // (You may need to handle the state for the button appropriately)
        setCaptureButtonDisabled(true);

        // Prevent capturing images within a 30-second gap
        if (lastCaptureTime && Date.now() - lastCaptureTime < 30000) {
            toast({
                title: "Slow Down",
                description: "Please wait 30s, before capturing another image.",
                variant: "destructive"
            });
            setCaptureButtonDisabled(false); // Re-enable the button
            return;
        }

        try {
            if (videoRef?.current) {
                const video = videoRef.current;
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convert the canvas image to a data URL
                const imageDataURL = canvas.toDataURL('image/png');

                // Save the image to local storage or send it to your server for verification
                localStorage.setItem('capturedImage', imageDataURL);

                // Update the last capture time
                setLastCaptureTime(Date.now());

                // Show a success message and re-enable the button
                toast({
                    description: "Image captured successfully",
                });
                setCaptureButtonDisabled(false);
            }
        } catch (error) {
            console.error('Error capturing image:', error);
            // Show an error message and re-enable the button
            toast({
                title: "Error capturing image",
                description: "Please try again later",
                variant: "destructive"
            });
            setCaptureButtonDisabled(false);
        }
    };

    useEffect(() => {
        const startWebcamCapture = async () => {
            let cleanup = () => { }; // Create an empty cleanup function

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    cleanup = () => {
                        // Stop the webcam stream in the cleanup function
                        if (videoRef.current && videoRef.current.srcObject) {
                            const stream = videoRef.current.srcObject as MediaStream;
                            stream.getTracks().forEach(track => track.stop());
                        }
                    };
                }
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }

            // Clean up the webcam stream when the component unmounts
            return () => {
                cleanup();
            };
        };

        startWebcamCapture();
    }, []);



    return (
        <Form {...form}>
            <Link href="/" className={cn(buttonVariants({ variant: "outline", className: "absolute left-5 top-5" }))}>
                <ChevronLeft className="w-5 h-5 mr-1" />
                Home
            </Link>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full max-w-lg px-5 mx-auto space-y-5 max-lg:flex-col lg:px-8">

                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="text-xl font-semibold text-center md:text-2xl text-slate-900">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-center text-slate-600">
                        Enter your email below to create your account
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>

                            <FormControl>
                                <Input type="text" placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>User</SelectLabel>
                            <SelectItem value="candidate">Candidate</SelectItem>
                            <SelectItem value="professor">Professor</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <AspectRatio ratio={16 / 9} className="rounded-md h-52 bg-muted">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="object-cover w-full max-h-full rounded-md"
                    />
                </AspectRatio>

                <div className="w-full !-mt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        disabled={captureButtonDisabled}
                        isLoading={captureButtonDisabled}
                        className={cn(captureButtonDisabled ? "opacity-10 transition-opacity duration-300" : "opacity-100 transition-opacity duration-300", "w-full")}
                        onClick={captureImage}
                    >
                        Capture Image
                    </Button>
                </div>

                <Button type="submit" className="w-full">SignUp</Button>
                {/* <Link href='/' className="ml-3">
                    Have already account? <span className="font-bold underline">Login</span>
                </Link> */}
                <span className="flex items-center justify-center w-full mx-auto text-slate-600">
                    Have already account?
                    <Link href='/login' className="ml-3 font-semibold">
                        Login
                    </Link>
                </span>
            </form>
        </Form>
    )
}

export default Register
