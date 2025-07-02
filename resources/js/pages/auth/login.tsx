// resources/js/Pages/Auth/Login.tsx

import { useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { motion } from 'framer-motion';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
    [key: string]: any;
}

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    // Definisikan fungsi preload di sini
    const preloadRegisterImage = () => {
        const img = new Image();
        // Pastikan path ini benar sesuai dengan nama file gambar Anda
        img.src = '/images/1.jpg';
    };

    return (
        <>
            <Head title="Masuk" />
            <motion.div
                className="w-full min-h-screen lg:grid lg:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Bagian Kiri: Form Login */}
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Selamat Datang Kembali</h1>
                            <p className="text-balance text-muted-foreground">
                                Masukkan email Anda untuk masuk ke akun
                            </p>
                        </div>

                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        
                        <form onSubmit={submit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Lupa Password?
                                            </Link>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div className="flex items-center space-x-2 my-2">
                                    <Checkbox 
                                        id="remember" 
                                        name="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked === true)}
                                    />
                                    <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Ingat saya
                                    </Label>
                                </div>
                                <Button type="submit" className="w-full" disabled={processing}>
                                    Masuk
                                </Button>
                            </div>
                        </form>
                        
                        <div className="mt-4 text-center text-sm">
                            Belum punya akun?{' '}
                            <Link 
                                href={route('register')} 
                                className="underline"
                                onMouseEnter={preloadRegisterImage}
                            >
                                Daftar di sini
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bagian Kanan: Gambar Branding */}
                <div className="hidden bg-muted lg:block">
                    <img
                        src="/images/2.jpg"
                        alt="Login Visual"
                        className="h-full w-full object-cover"
                    />
                </div>
            </motion.div>
        </>
    );
}
