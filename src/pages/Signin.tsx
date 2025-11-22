import React from 'react'
import AuthForms from '../components/authforms/AuthForms';
import { Separator } from '../components/ui/separator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    return (
        <div className='relative flex min-h-screen w-full flex-col bg-background dark:bg-background-dark'>
            <div className='flex h-full min-h-screen grow'>
                <div className='hidden lg:flex relative w-full grid lg:grid-cols-2  '>
                    <div className="relative hidden lg:flex items-center justify-center">
                        <img className="absolute inset-0 h-full w-full object-cover opacity-30" data-alt="A person in a modern gym lifting weights, with a focused and determined expression" src="signin-hero.png" />
                        <div className="relative z-10 p-12 text-center text-white">
                            <h1 className="text-5xl font-black tracking-tighter mb-4">Unleash Your Potential</h1>
                            <p className="text-lg text-gray-300">Track your workouts, see your progress, and achieve the results you've always wanted.</p>
                        </div>
                    </div>
                </div>
                <div className='w-full p-16'>
                    <div className='flex h-full min-h-screen grow mx-auto flex-col'>
                        <header className='w-full'>
                            <div className='flex items-center'>
                                <img src="logo.svg" alt="logo" className='w-16 h-16' />
                                <span className='text-2xl font-bold text-white p-2'>GymBro</span>
                            </div>
                        </header>
                        <main className="mt-10">
                            <h2 className='text-3xl font-bold text-white mb-2'>Welcome Back</h2>
                            <p className='text-lg text-gray-300 mb-6'>Let's get to work and track your progress</p>
                        </main>
                        {/* AuthForms */}
                        <AuthForms title="signin" />
                        <div className='px-6'>
                            <div className="flex items-center">
                                <Separator className='flex-1 border-t border-gray-300 dark:border-gray-700' />
                                <p className='text-center text-xs text-gray-500 dark:text-gray-500 px-2'>OR</p>
                                <Separator className='flex-1 border-t border-gray-300 dark:border-gray-700' />
                            </div>
                            <Button className='w-full mt-6 border border-primary hover:border-primary/90 bg-background dark:bg-background-dark text-white' onClick={() => navigate('/sign-up')}>Sign Up</Button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signin