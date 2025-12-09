{{-- <x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{ __("You're logged in!") }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout> --}}
@extends('layouts.dashboard')
@section('title', 'Dashboard: Larapets 🐻‍❄️')

@section('content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-10">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M80,40a40,40,0,1,0,40,40A40,40,0,0,0,80,40Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,104Zm96,16a40,40,0,1,0-40-40A40,40,0,0,0,176,120Zm0-64a24,24,0,1,1-24,24A24,24,0,0,1,176,56ZM80,136a40,40,0,1,0,40,40A40,40,0,0,0,80,136Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,200Zm96-64a40,40,0,1,0,40,40A40,40,0,0,0,176,136Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,176,200Z">
        </path>
    </svg>
    Dashboard
</h1>

{{-- Cards --}}
<div class="flex flex-wrap gap-4 items-center justify-center"> {{-- Administrador --}}
    @if(Auth::user()->role == 'Administrador')
    {{-- Module Users --}}
    <div class="card text-white bg-[#000a] w-96 shadow-sm">
        <figure class="h-[240px]">
            <img class="object-cover w-full h-full" src="images/apartado-users.png" alt="users" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Module Users</h2>

            <ul class="list bg-[#000] rounded-box shadow-md">

                <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Statistics</li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL USERS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\User::count() }}
                    </button>
                </li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M75.19,198.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,155,165.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,73.6,187.2,8,8,0,0,0,75.19,198.4ZM128,112a24,24,0,1,1-24,24A24,24,0,0,1,128,112Zm72-88H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm0,192H56V40H200ZM88,64a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,64Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL CUSTOMERS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\User::where('role', 'Customer')->count() }}
                    </button>
                </li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M144,157.68a68,68,0,1,0-71.9,0c-20.65,6.76-39.23,19.39-54.17,37.17a8,8,0,1,0,12.24,10.3C50.25,181.19,77.91,168,108,168s57.75,13.19,77.87,37.15a8,8,0,0,0,12.26-10.3C183.18,177.07,164.6,164.44,144,157.68ZM56,100a52,52,0,1,1,52,52A52.06,52.06,0,0,1,56,100Zm196.25,43.07-4.66-2.69a23.6,23.6,0,0,0,0-8.76l4.66-2.69a8,8,0,1,0-8-13.86l-4.67,2.7a23.92,23.92,0,0,0-7.58-4.39V108a8,8,0,0,0-16,0v5.38a23.92,23.92,0,0,0-7.58,4.39l-4.67-2.7a8,8,0,1,0-8,13.86l4.66,2.69a23.6,23.6,0,0,0,0,8.76l-4.66,2.69a8,8,0,0,0,8,13.86l4.67-2.7a23.92,23.92,0,0,0,7.58,4.39V164a8,8,0,0,0,16,0v-5.38a23.92,23.92,0,0,0,7.58-4.39l4.67,2.7a7.92,7.92,0,0,0,4,1.07,8,8,0,0,0,4-14.93ZM216,136a8,8,0,1,1,8,8A8,8,0,0,1,216,136Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL ADMINISTRATORS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\User::where('role', 'Administrador')->count() }}
                    </button>
                </li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M144,157.68a68,68,0,1,0-71.9,0c-20.65,6.76-39.23,19.39-54.17,37.17a8,8,0,0,0,12.25,10.3C50.25,181.19,77.91,168,108,168s57.75,13.19,77.87,37.15a8,8,0,0,0,12.25-10.3C183.18,177.07,164.6,164.44,144,157.68ZM56,100a52,52,0,1,1,52,52A52.06,52.06,0,0,1,56,100Zm197.66,33.66-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L216,148.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL ACTIVE USERS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\User::where('active', '1')->count() }}
                    </button>
                </li>
            </ul>

            <div class="card-actions justify-end">
                <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4" href="{{ url('users') }}">
                    Enter
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </div>


    {{-- Module Pets --}}
    <div class="card text-white bg-[#000a] w-96 shadow-sm">
        <figure class="h-[240px]">
            <img class="object-cover w-full h-full" src="images/apartado-pets.png" alt="pets" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Module Pets</h2>

            <ul class="list bg-[#000] rounded-box shadow-md">

                <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Statistics</li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL PETS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\Pet::count() }}
                    </button>
                </li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M96,140a12,12,0,1,1-12-12A12,12,0,0,1,96,140Zm76-12a12,12,0,1,0,12,12A12,12,0,0,0,172,128Zm60-80v88c0,52.93-46.65,96-104,96S24,188.93,24,136V48A16,16,0,0,1,51.31,36.69c.14.14.26.27.38.41L69,57a111.22,111.22,0,0,1,118.1,0L204.31,37.1c.12-.14.24-.27.38-.41A16,16,0,0,1,232,48Zm-16,0-21.56,24.8A8,8,0,0,1,183.63,74,88.86,88.86,0,0,0,168,64.75V88a8,8,0,1,1-16,0V59.05a97.43,97.43,0,0,0-16-2.72V88a8,8,0,1,1-16,0V56.33a97.43,97.43,0,0,0-16,2.72V88a8,8,0,1,1-16,0V64.75A88.86,88.86,0,0,0,72.37,74a8,8,0,0,1-10.81-1.17L40,48v88c0,41.66,35.21,76,80,79.67V195.31l-13.66-13.66a8,8,0,0,1,11.32-11.31L128,180.68l10.34-10.34a8,8,0,0,1,11.32,11.31L136,195.31v20.36c44.79-3.69,80-38,80-79.67Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL CATS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\Pet::where('kind', 'Cat')->count() }}
                    </button>
                </li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M239.71,125l-16.42-88a16,16,0,0,0-19.61-12.58l-.31.09L150.85,40h-45.7L52.63,24.56l-.31-.09A16,16,0,0,0,32.71,37.05L16.29,125a15.77,15.77,0,0,0,9.12,17.52A16.26,16.26,0,0,0,32.12,144,15.48,15.48,0,0,0,40,141.84V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V141.85a15.5,15.5,0,0,0,7.87,2.16,16.31,16.31,0,0,0,6.72-1.47A15.77,15.77,0,0,0,239.71,125ZM32,128h0L48.43,40,90.5,52.37Zm144,80H136V195.31l13.66-13.65a8,8,0,0,0-11.32-11.32L128,180.69l-10.34-10.35a8,8,0,0,0-11.32,11.32L120,195.31V208H80a24,24,0,0,1-24-24V123.11L107.92,56h40.15L200,123.11V184A24,24,0,0,1,176,208Zm48-80L165.5,52.37,207.57,40,224,128ZM104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,140Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL DOGS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\Pet::where('kind', 'Dog')->count() }}
                    </button>
                </li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M231.67,60.89a35.82,35.82,0,0,0-23.82-12.74,36,36,0,1,0-66.37,22.92.25.25,0,0,1,0,.08L71.17,141.51s0,0-.1,0a36,36,0,1,0-22.92,66.37,36,36,0,1,0,66.37-22.92.54.54,0,0,1,0-.08l70.35-70.36s0,0,.1,0a36,36,0,0,0,46.74-53.63ZM219.1,97.16a20,20,0,0,1-25.67,3.8,16,16,0,0,0-19.88,2.19l-70.4,70.4A16,16,0,0,0,101,193.43a20,20,0,1,1-36.75,7.5,8,8,0,0,0-7.91-9.24,8.5,8.5,0,0,0-1.23.1A20,20,0,1,1,62.57,155a16,16,0,0,0,19.88-2.19l70.4-70.4A16,16,0,0,0,155,62.57a20,20,0,1,1,36.75-7.5,8,8,0,0,0,9.14,9.14,20,20,0,0,1,18.17,33Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL ACTIVE PETS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\Pet::where('active', '1')->count() }}
                    </button>
                </li>
            </ul>

            <div class="card-actions justify-end">
                <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4" href="{{ url('pets') }}">
                    Enter
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </div>

    {{-- Module Adoptions --}}
    <div class="card text-white bg-[#000a] w-96 shadow-sm">
        <figure class="h-[240px]">
            <img class="object-cover w-full h-full" src="images/apartado-adoptions.png" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Module Adoptions</h2>

            <ul class="list bg-[#000] rounded-box shadow-md">

                <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Statistics</li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL ADOPTIONS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\Adoption::count() }}
                    </button>
                </li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M128,136a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h48A8,8,0,0,1,128,136Zm-8-40H72a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm112,65.47V224A8,8,0,0,1,220,231l-24-13.74L172,231A8,8,0,0,1,160,224V200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216a16,16,0,0,1,16,16V86.53a51.88,51.88,0,0,1,0,74.94ZM160,184V161.47A52,52,0,0,1,216,76V56H40V184Zm56-12a51.88,51.88,0,0,1-40,0v38.22l16-9.16a8,8,0,0,1,7.94,0l16,9.16Zm16-48a36,36,0,1,0-36,36A36,36,0,0,0,232,124Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL CATS ADOPTIONS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\Pet::where('status', '1')->where('kind', 'Cat')->count() }}
                    </button>
                </li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M128,136a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h48A8,8,0,0,1,128,136Zm-8-40H72a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm112,65.47V224A8,8,0,0,1,220,231l-24-13.74L172,231A8,8,0,0,1,160,224V200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216a16,16,0,0,1,16,16V86.53a51.88,51.88,0,0,1,0,74.94ZM160,184V161.47A52,52,0,0,1,216,76V56H40V184Zm56-12a51.88,51.88,0,0,1-40,0v38.22l16-9.16a8,8,0,0,1,7.94,0l16,9.16Zm16-48a36,36,0,1,0-36,36A36,36,0,0,0,232,124Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL DOGS ADOPTIONS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\Pet::where('status', '1')->where('kind', 'Dog')->count() }}
                    </button>
                </li>

                <li class="list-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M128,136a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h48A8,8,0,0,1,128,136Zm-8-40H72a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm112,65.47V224A8,8,0,0,1,220,231l-24-13.74L172,231A8,8,0,0,1,160,224V200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216a16,16,0,0,1,16,16V86.53a51.88,51.88,0,0,1,0,74.94ZM160,184V161.47A52,52,0,0,1,216,76V56H40V184Zm56-12a51.88,51.88,0,0,1-40,0v38.22l16-9.16a8,8,0,0,1,7.94,0l16,9.16Zm16-48a36,36,0,1,0-36,36A36,36,0,0,0,232,124Z">
                        </path>
                    </svg>
                    <div class="flex">
                        <div class="flex items-center uppercase font-semibold opacity-80">TOTAL PIGS ADOPTIONS</div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        {{ App\Models\Pet::where('status', '1')->where('kind', 'Pig')->count() }}
                    </button>
                </li>
            </ul>

            <div class="card-actions justify-end">
                <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4" href="{{ url('adoptions') }}">
                    Enter
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    @endif

    {{-- Customer --}}
    @if(Auth::user()->role == 'Customer')
    {{-- Module My Profile --}}
    <div class="card text-white bg-[#000a] w-96 shadow-sm">
        <figure class="h-[240px]">
            <img class="object-cover w-full h-full" src="images/apartado-myprofile.png" alt="users" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120ZM68.67,208A64.36,64.36,0,0,1,87.8,182.2a64,64,0,0,1,80.4,0A64.36,64.36,0,0,1,187.33,208ZM208,208h-3.67a79.9,79.9,0,0,0-46.68-50.29,48,48,0,1,0-59.3,0A79.9,79.9,0,0,0,51.67,208H48V48H208V208Z">
                    </path>
                </svg>
                My Profile
            </h2>

            <div class="card-actions justify-end">
                <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4" href="{{ url('myprofile') }}">
                    Enter
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </div>


    {{-- Module My Adoptions --}}
    <div class="card text-white bg-[#000a] w-96 shadow-sm">
        <figure class="h-[240px]">
            <img class="object-cover w-full h-full" src="images/apartado-myadoptions.png" alt="pets" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z">
                    </path>
                </svg>
                My Adoptions
            </h2>

            <div class="card-actions justify-end">
                <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4" href="{{ url('myadoptions') }}">
                    Enter
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </div>

    {{-- Module Make Adoption --}}
    <div class="card text-white bg-[#000a] w-96 shadow-sm">
        <figure class="h-[240px]">
            <img class="object-cover w-full h-full" src="images/apartado-makeadoption.png" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z">
                    </path>
                </svg>
                Make Adoption
            </h2>


            <div class="card-actions justify-end">
                <a class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4" href="{{ url('makeadoption') }}">
                    Enter
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    @endif
</div>

{{-- Modal Message Edited Profile --}}
<dialog id="modal_message" class="modal">
    <div class="modal-box bg-[#0003] text-white">
        <h3 class="text-lg font-bold mb-2">Congratulations!</h3>
        <div role="alert" class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ session('message') }}</span>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>

{{-- Modal Message Error Permissions Admin --}}
<dialog id="modal_error" class="modal">
    <div class="modal-box bg-[#0003] text-white">
        <h3 class="text-lg font-bold mb-2">
            Sorry!
        </h3>
        <div role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ session('error') }}</span>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
@endsection

@section( 'js')
<script>
    $(document).ready(function () {
        // Modal Error .....................
        const modal_error = document.getElementById('modal_error')
        @if(session('error'))
            modal_error.showModal()
        @endif

        // Modal Message .....................
        const modal_message = document.getElementById('modal_message')
        @if(session('message'))
            modal_message.showModal()
        @endif
    })
</script>
@endsection