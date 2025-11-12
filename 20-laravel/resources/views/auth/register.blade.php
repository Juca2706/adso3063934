{{-- <x-guest-layout>
    <form method="POST" action="{{ route('register') }}">
        @csrf

        <!-- Name -->
        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('Confirm Password')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full"
                            type="password"
                            name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('login') }}">
                {{ __('Already registered?') }}
            </a>

            <x-primary-button class="ms-4">
                {{ __('Register') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}

@extends('layouts.home')

@section('title', 'Register: Larapets 🐻‍❄️')

@section( 'content')
    <section class="bg-[#0006] text-white rounded-lg md:w-[640px] w-[360px] p-8 flex flex-col gap-4 items-center justify-center">
        <h1 class="flex gap-4 justify-center items-center text-4xl pb-4 border-b-2 border-[##fff9] w-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
            <path d="M168,56a8,8,0,0,1,8-8h16V32a8,8,0,0,1,16,0V48h16a8,8,0,0,1,0,16H208V80a8,8,0,0,1-16,0V64H176A8,8,0,0,1,168,56Zm62.56,54.68a103.92,103.92,0,1,1-85.24-85.24,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.66,79.66,0,0,1,98.3,157.66a48,48,0,1,1,59.4,0,79.66,79.66,0,0,1,36.06,28.75A87.62,87.62,0,0,0,216,128a88.85,88.85,0,0,0-1.22-14.68,8,8,0,1,1,15.78-2.64ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Zm0,64a87.57,87.57,0,0,0,53.92-18.5,64,64,0,0,0-107.84,0A87.57,87.57,0,0,0,128,216Z"></path></svg>
            Register
        </h1>
        <div class="card w-full">
            <form method="POST" action="{{ route('register') }}" class="flex flex-col md:flex-row gap-4 mt-4">
                @csrf
                <div class="w-full md:w-[320px]">
                    {{-- Document --}}
                    <label class="label text-white"><strong>Document:</strong></label>
                    <input type="text" class="input bg-[#0009]" name="document" placeholder="750000##" value="{{ old('document') }}" />
                    @error('document')
                        <small class="badge badge-error w-full mt-1 text-xs py-4">
                            <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
                            {{ $message }}
                        </small>
                    @enderror

                    {{-- Fullname --}}
                    <label class="label text-white"><strong>Fullname:</strong></label>
                    <input type="text" class="input bg-[#0009]" name="fullname" placeholder="Jeremias Sprinfield" value="{{ old('fullname') }}" />
                    @error('fullname')
                        <small class="badge badge-error w-full mt-1 text-xs py-4">
                            <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
                            {{ $message }}
                        </small>
                    @enderror

                    {{-- Gender --}}
                    <label class="label text-white"><strong>Gender:</strong></label>
                    <select name="gender" class="select bg-[#0009]">
                        <option value="">Select...</option>
                        <option value="Female" @if(old('gender') == 'Female') selected @endif>Female</option>
                        <option value="Male" @if(old('gender') == 'Male') selected @endif>Male</option>
                    </select>
                    @error('gender')
                        <small class="badge badge-error w-full mt-1 text-xs py-4">
                            <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
                            {{ $message }}
                        </small>
                    @enderror

                    {{-- Birthdate --}}
                    <label class="label text-white"><strong>Birthdate:</strong></label>
                    <input type="date" class="input bg-[#0009]" name="birthdate" placeholder="1660-01-12" value="{{ old('birthdate') }}" />
                    @error('birthdate')
                        <small class="badge badge-error w-full mt-1 text-xs py-4">
                            <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
                            {{ $message }}
                        </small>
                    @enderror
                </div>

                <div class="w-full md:w-[320px]">
                    {{-- Phone --}}
                    <label class="label text-white"><strong>Phone:</strong></label>
                    <input type="text" class="input bg-[#0009]" name="phone" placeholder="3134520###" value="{{ old('phone') }}" />
                    @error('phone')
                        <small class="badge badge-error w-full mt-1 text-xs py-4">
                            <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
                            {{ $message }}
                        </small>
                    @enderror

                    {{-- Email --}}
                    <label class="label text-white"><strong>Email:</strong></label>
                    <input type="text" class="input bg-[#0009]" name="email" placeholder="emailName@example.com" value="{{ old('email') }}" />
                    @error('email')
                        <small class="badge badge-error w-full mt-1 text-xs py-4">
                            <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
                            {{ $message }}
                        </small>
                    @enderror

                    {{-- Password --}}
                    <label class="label text-white"><strong>Password:</strong></label>
                    <input type="password" class="input bg-[#0009]" name="password" placeholder="Password"/>
                    @error('password')
                        <small class="badge badge-error w-full mt-1 text-xs py-4">
                            <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
                            {{ $message }}
                        </small>
                    @enderror

                    {{-- Password confirmation --}}
                    <label class="label text-white"><strong>Password confirmation:</strong></label>
                    <input type="password" class="input bg-[#0009]" name="password_confirmation" placeholder="Password Confirmation"/>
                    @error('password_confirmation')
                        <small class="badge badge-error w-full mt-1 text-xs py-4">
                            <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
                            {{ $message }}
                        </small>
                    @enderror
                    
                    
                    <button class="btn btn-outline hover:bg-[#fff6] hover:text-white w-full mt-4">Register</button>
                    
                    <p class="text-sm text-center mt-4">
                        Already registered?
                        <a href="{{ route('login') }}" class="link link-default">
                            Login
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </section>
@endsection
