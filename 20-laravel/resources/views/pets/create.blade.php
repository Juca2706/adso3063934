@extends('layouts.dashboard')

@section('title', 'Add Pets: Larapets 🐻‍❄️')

@section( 'content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z">
        </path>
    </svg>
    Add Pet
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
            <a href="{{ url('pets') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
                    </path>
                </svg>
                Pet Module
            </a>
        </li>
        <li>
            <span class="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z">
                    </path>
                </svg>
                Add Pet
            </span>
        </li>
    </ul>
</div>

<div class="card text-white md:w-[720px] w-[320px] bg-[#0006] p-7 rounded-md">
    <form method="POST" action="{{ url('pets') }}" class="flex flex-col md:flex-row gap-4 mt-4"
        enctype="multipart/form-data">
        @csrf
        <div class="w-full md:w-[320px]">
            <div
                class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-110 transition ease-in">
                <div id="upload" class="mask mask-squircle w-48">
                    <img id="preview" src="{{ asset('images/no-image.png') }}" />
                </div>
                <small class="pb-0 border-white border-b flex gap-1 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M223.16,68.42l-16-32A8,8,0,0,0,200,32H56a8,8,0,0,0-7.16,4.42l-16,32A8.08,8.08,0,0,0,32,72V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V72A8.08,8.08,0,0,0,223.16,68.42ZM60.94,48H195.06l8,16H52.94ZM208,208H48V80H208V208Zm-42.34-77.66a8,8,0,0,1-11.32,11.32L136,123.31V184a8,8,0,0,1-16,0V123.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0Z">
                        </path>
                    </svg>
                    Upload Image
                </small>
            </div>
            <input type="file" id="image" name="image" class="hidden" accept="image/">
            @error('image')
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

        <div class="w-full md:w-[320px]">
            {{-- Name --}}
            <label class="label text-white"><strong>Name:</strong></label>
            <input type="text" class="input bg-[#0009]" name="name" placeholder="Firulais" value="{{ old('name') }}" />
            @error('name')
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

            {{-- Kind --}}
            <label class="label text-white"><strong>Kind:</strong></label>
            <select name="kind" class="select bg-[#0009]">
                <option value="">Select...</option>
                <option value="Dog" @if(old('kind')=='Dog' ) selected @endif>Dog</option>
                <option value="Cat" @if(old('kind')=='Cat' ) selected @endif>Cat</option>
                <option value="Pig" @if(old('kind')=='Pig' ) selected @endif>Pig</option>
                <option value="Parrot" @if(old('kind')=='Parrot' ) selected @endif>Parrot</option>
            </select>
            @error('kind')
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

            {{-- Weight --}}
            <label class="label text-white"><strong>Weight:</strong></label>
            <input type="number" class="input bg-[#0009]" name="weight" step="any" placeholder="2.5" value="{{ old('weight') }}" />
            @error('weight')
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

            {{-- Age --}}
            <label class="label text-white"><strong>Age:</strong></label>
            <input type="number" class="input bg-[#0009]" name="age" placeholder="4" value="{{ old('age') }}" />
            @error('age')
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
            {{-- Breed --}}
            <label class="label text-white"><strong>Breed:</strong></label>
            <input type="text" class="input bg-[#0009]" name="breed" placeholder="French Bulldog"
                value="{{ old('breed') }}" />
            @error('breed')
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

            {{-- Location --}}
            <label class="label text-white"><strong>Location:</strong></label>
            <input type="text" class="input bg-[#0009]" name="location" placeholder="Paris"
                value="{{ old('location') }}" />
            @error('location')
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

            {{-- Description --}}
            <label class="label text-white"><strong>Description:</strong></label>
            <input type="text" class="input bg-[#0009]" name="description" placeholder="Paris"
                value="{{ old('description') }}" />
            @error('descripcion')
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

            <button class="btn btn-outline hover:bg-[#fff6] hover:text-white w-full mt-4">Add</button>
        </div>
    </form>
</div>
@endsection

@section( 'js')
<script>
    $(document).ready(function (){
        $('#upload').click(function (e) {
            e.preventDefault()
            $('#image').click()
        })
        $('#image').change(function (e) {
            e.preventDefault()
            $('#preview').attr('src', window.URL.createObjectURL($(this).prop('files')[0]))
        })
    })
</script>
@endsection