import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../lib/auth';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log('Google credential token:', credentialResponse.credential);
      localStorage.setItem('googleToken', credentialResponse.credential);
      alert('Login dengan Google berhasil!');
      navigate('/');
    },
    onError: () => {
      alert('Login Google gagal. Silakan coba lagi.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerUser(email, password);
    alert(result.message);
    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name (Required)"
            required
            className="w-full p-3 border rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address (Required)"
            required
            className="w-full p-3 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password (Required, 8+ characters)"
            required
            minLength={8}
            className="w-full p-3 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-right text-sm">
            <a href="#" className="text-black underline">Forgot your password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1E2347] text-white py-3 rounded-full shadow-md hover:opacity-90 transition"
          >
            Continue
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="space-y-3">
          <button
            onClick={() => loginWithGoogle()}
            className="w-full flex items-center justify-center gap-2 border rounded-full py-3 shadow-sm bg-white hover:bg-gray-100 transition"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="font-medium">Continue with Google</span>
          </button>

          <button className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-full py-3 shadow-md hover:opacity-90 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.564 13.085c0-1.721.767-2.864 2.287-3.746-1.174-1.689-2.932-2.021-3.565-2.103-1.52-.144-2.956.88-3.497.88-.545 0-1.86-.857-3.052-.834-1.569.024-3.037.943-3.844 2.4-1.648 2.857-.42 7.078 1.181 9.392.783 1.157 1.71 2.453 2.935 2.41 1.17-.047 1.61-.758 3.026-.758 1.412 0 1.79.758 3.02.735 1.252-.023 2.042-1.18 2.794-2.344.51-.79.707-1.19 1.106-2.082-2.917-1.098-3.403-3.247-3.403-4.95z"/>
            </svg>
            <span className="font-medium">Continue with Apple</span>
          </button>
        </div>

        <p className="text-xs text-center mt-6 text-gray-500">
          By clicking Continue, you agree to our <a href="#" className="underline">Terms</a> and acknowledge that you have read our <a href="#" className="underline">Privacy Policy</a>, which explains how to opt out of offers and promos
        </p>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;