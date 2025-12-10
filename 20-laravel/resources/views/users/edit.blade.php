@extends('layouts.dashboard')

@section('title', 'Edit Users: Larapets 🐻‍❄️')

@section( 'content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z">
        </path>
    </svg>
    Edit User
</h1>

{{-- Breadcrumbs --}}
<div class="breadcrumbs text-white text-sm">
    <ul>
        <li>
            <a href="{{ url('dashboard') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M80,40a40,40,0,1,0,40,40A40,40,0,0,0,80,40Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,104Zm96,16a40,40,0,1,0-40-40A40,40,0,0,0,176,120Zm0-64a24,24,0,1,1-24,24A24,24,0,0,1,176,56ZM80,136a40,40,0,1,0,40,40A40,40,0,0,0,80,136Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,200Zm96-64a40,40,0,1,0,40,40A40,40,0,0,0,176,136Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,176,200Z">
                    </path>
                </svg>
                Dashboard
            </a>
        </li>
        <li>
            <a href="{{ url('users') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z">
                    </path>
                </svg>
                User Module
            </a>
        </li>
        <li>
            <span class="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z">
                    </path>
                </svg>
                Edit User
            </span>
        </li>
    </ul>
</div>

<div class="card text-white md:w-[720px] w-[320px] bg-[#0006] p-7 rounded-md">
    {{-- Form --}}
    <form method="POST" action="{{ url('users/'.$user->id) }}" class="flex flex-col md:flex-row gap-4 mt-4"
        enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="w-full md:w-[320px]">
            <div
                class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-110 transition ease-in">
                <div id="upload" class="mask mask-squircle w-48">
                    <img id="preview" src="{{ asset('images/'.$user->photo) }}" />
                </div>
                <small class="pb-0 border-white border-b flex gap-1 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M223.16,68.42l-16-32A8,8,0,0,0,200,32H56a8,8,0,0,0-7.16,4.42l-16,32A8.08,8.08,0,0,0,32,72V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V72A8.08,8.08,0,0,0,223.16,68.42ZM60.94,48H195.06l8,16H52.94ZM208,208H48V80H208V208Zm-42.34-77.66a8,8,0,0,1-11.32,11.32L136,123.31V184a8,8,0,0,1-16,0V123.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0Z">
                        </path>
                    </svg>
                    Upload Photo
                </small>
                @error('photo')
                <small class="badge badge-error w-full mt-1 text-xs py-4">
                    <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g fill="currentColor">
                            <rect x="1.972" y="11" width="20.056" height="2"
                                transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0">
                            </rect>
                            <path
                                d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                                stroke-width="0" fill="currentColor"></path>
                        </g>
                    </svg>
                    {{ $message }}
                </small>
                @enderror
            </div>
            <input type="file" id="photo" name="photo" class="hidden" accept="image/">
            <input type="hidden" name="originphoto" value="{{ $user->photo }}">
        </div>

        <div class="w-full md:w-[320px]">
            {{-- Document --}}
            <label class="label text-white"><strong>Document:</strong></label>
            <input type="text" class="input bg-[#0009]" name="document" placeholder="750000##"
                value="{{ old('document', $user->document) }}" />
            @error('document')
            <small class="badge badge-error w-full mt-1 text-xs py-4">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)"
                            fill="currentColor" stroke-width="0"></rect>
                        <path
                            d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                            stroke-width="0" fill="currentColor"></path>
                    </g>
                </svg>
                {{ $message }}
            </small>
            @enderror

            {{-- Fullname --}}
            <label class="label text-white"><strong>Fullname:</strong></label>
            <input type="text" class="input bg-[#0009]" name="fullname" placeholder="Jeremias Sprinfield"
                value="{{ old('fullname', $user->fullname) }}" />
            @error('fullname')
            <small class="badge badge-error w-full mt-1 text-xs py-4">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)"
                            fill="currentColor" stroke-width="0"></rect>
                        <path
                            d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                            stroke-width="0" fill="currentColor"></path>
                    </g>
                </svg>
                {{ $message }}
            </small>
            @enderror

            {{-- Gender --}}
            <label class="label text-white"><strong>Gender:</strong></label>
            <select name="gender" class="select bg-[#0009]">
                <option value="">Select...</option>
                <option value="Female" @if(old('gender', $user->gender)=='Female' ) selected @endif>Female</option>
                <option value="Male" @if(old('gender', $user->gender)=='Male' ) selected @endif>Male</option>
            </select>
            @error('gender')
            <small class="badge badge-error w-full mt-1 text-xs py-4">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)"
                            fill="currentColor" stroke-width="0"></rect>
                        <path
                            d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                            stroke-width="0" fill="currentColor"></path>
                    </g>
                </svg>
                {{ $message }}
            </small>
            @enderror

            {{-- Birthdate --}}
            <label class="label text-white"><strong>Birthdate:</strong></label>
            <input type="date" class="input bg-[#0009]" name="birthdate" placeholder="1660-01-12"
                value="{{ old('birthdate', $user->birthdate) }}" />
            @error('birthdate')
            <small class="badge badge-error w-full mt-1 text-xs py-4">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)"
                            fill="currentColor" stroke-width="0"></rect>
                        <path
                            d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                            stroke-width="0" fill="currentColor"></path>
                    </g>
                </svg>
                {{ $message }}
            </small>
            @enderror
        </div>

        <div class="w-full md:w-[320px] text-white">
            {{-- Phone --}}
            <label class="label text-white"><strong>Phone:</strong></label>
            <input type="text" class="input bg-[#0009]" name="phone" placeholder="3134520###"
                value="{{ old('phone', $user->phone) }}" />
            @error('phone')
            <small class="badge badge-error w-full mt-1 text-xs py-4">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)"
                            fill="currentColor" stroke-width="0"></rect>
                        <path
                            d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                            stroke-width="0" fill="currentColor"></path>
                    </g>
                </svg>
                {{ $message }}
            </small>
            @enderror

            {{-- Email --}}
            <label class="label text-white"><strong>Email:</strong></label>
            <input type="text" class="input bg-[#0009]" name="email" placeholder="emailName@example.com"
                value="{{ old('email', $user->email) }}" />
            @error('email')
            <small class="badge badge-error w-full mt-1 text-xs py-4">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)"
                            fill="currentColor" stroke-width="0"></rect>
                        <path
                            d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                            stroke-width="0" fill="currentColor"></path>
                    </g>
                </svg>
                {{ $message }}
            </small>
            @enderror

            {{-- Active --}}
            <label class="label text-white"><strong>Active:</strong></label>
            <select name="active" class="select bg-[#0009]">
                <option value="">Select...</option>
                <option value="1" @if(old('active', $user->active)== 1 ) selected @endif>Active</option>
                <option value="0" @if(old('active', $user->active)== 0) selected @endif>Inactive</option>
            </select>
            @error('active')
            <small class="badge badge-error w-full mt-1 text-xs py-4">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)"
                            fill="currentColor" stroke-width="0"></rect>
                        <path
                            d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                            stroke-width="0" fill="currentColor"></path>
                    </g>
                </svg>
                {{ $message }}
            </small>
            @enderror

            {{-- Role --}}
            <label class="label text-white"><strong>Role:</strong></label>
            <select name="role" class="select bg-[#0009]">
                <option value="">Select...</option>
                <option value="Customer" @if(old('role', $user->role)== 'Customer' ) selected @endif>Customer</option>
                <option value="Administrador" @if(old('role', $user->role)== 'Administrador') selected @endif>Administrador</option>
            </select>
            @error('role')
            <small class="badge badge-error w-full mt-1 text-xs py-4">
                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)"
                            fill="currentColor" stroke-width="0"></rect>
                        <path
                            d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                            stroke-width="0" fill="currentColor"></path>
                    </g>
                </svg>
                {{ $message }}
            </small>
            @enderror

            <button class="btn btn-outline hover:bg-[#fff6] hover:text-white w-full mt-4">Edit</button>
        </div>
    </form>
</div>
@endsection

@section( 'js')
<script>
    $(document).ready(function (){
        $('#upload').click(function (e) {
            e.preventDefault()
            $('#photo').click()
        })
        $('#photo').change(function (e) {
            e.preventDefault()
            $('#preview').attr('src', window.URL.createObjectURL($(this).prop('files')[0]))
        })
    })
</script>
@endsection