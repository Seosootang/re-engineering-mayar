import { useState, useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

// Definisikan tipe untuk data form register
interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'user' | 'seller';
    [key: string]: any; // Index signature untuk kompatibilitas
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user', // Nilai default untuk role
    });

    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        number: false,
        letter: false,
        symbol: false,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setData('password', newPassword);

        setPasswordValidation({
            length: newPassword.length >= 8,
            number: /\d/.test(newPassword),
            letter: /[a-zA-Z]/.test(newPassword),
            symbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
        });
    };

    const preloadLoginImage = () => {
        const img = new Image();
        img.src = '/images/2.jpg'; // Path ke gambar halaman login
    };

    return (
        <>
            <Head title="Daftar" />
            <motion.div
                className="w-full min-h-screen lg:grid lg:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Bagian Kiri: Gambar Branding */}
                <div className="hidden bg-muted lg:block">
                    <img
                        src="/images/1.jpg"
                        alt="Register Visual"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Bagian Kanan: Form Register */}
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[380px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Buat Akun Baru</h1>
                            <p className="text-balance text-muted-foreground">
                                Isi data di bawah untuk memulai perjalanan Anda
                            </p>
                        </div>
                        
                        <form onSubmit={submit}>
                            <div className="grid gap-4">
                                {/* Input Name, Email, Role */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required autoFocus />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="role">Daftar sebagai</Label>
                                    <Select value={data.role} onValueChange={(value: 'user' | 'seller') => setData('role', value)}>
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder="Pilih role Anda" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="seller">Seller</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} className="mt-2" />
                                </div>

                                {/* Bagian Password dengan Validasi */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        value={data.password} 
                                        onChange={handlePasswordChange} 
                                        required 
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                            
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                    <ValidationItem isValid={passwordValidation.length} text="Min. 8 karakter" />
                                    <ValidationItem isValid={passwordValidation.number} text="Minimal 1 angka" />
                                    <ValidationItem isValid={passwordValidation.letter} text="Minimal 1 huruf" />
                                    <ValidationItem isValid={passwordValidation.symbol} text="Minimal 1 simbol" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                    <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <Button type="submit" className="w-full mt-2" disabled={processing}>
                                    Buat Akun
                                </Button>
                            </div>
                        </form>

                        <div className="mt-4 text-center text-sm">
                            Sudah punya akun?{' '}
                            <Link 
                                href={route('login')} 
                                className="underline"
                                onMouseEnter={preloadLoginImage}
                            >
                                Masuk di sini
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

const ValidationItem = ({ isValid, text }: { isValid: boolean, text: string }) => (
    <div className={`flex items-center gap-2 transition-colors ${isValid ? 'text-green-600' : 'text-muted-foreground'}`}>
        {isValid ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
        <span>{text}</span>
    </div>
);
