@extends('layouts.dashboard')

@section('title', 'Show User: Larapets 🐻‍❄️')

@section( 'content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
        </path>
    </svg>
    Show User
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
                        d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
                    </path>
                </svg>
                Show User
            </span>
        </li>
    </ul>
</div>

{{-- Card --}}
<div class="bg-[#0009] p-10 rounded-sm">
    <div
        class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-110 transition ease-in">
        <div id="upload" class="mask mask-squircle w-48">
            <img id="preview" src="{{ asset('images/'.$user->photo) }}" />
        </div>
    </div>

    {{-- Datos --}}
    <div class="flex gap-2 flex-col md:flex-row">
        <ul class="list bg-[#0009] mt-4 text-white rounded-box shadow-md w-50">
            <li class="list-row">
                <div>
                    <div>Document</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $user->document }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Full Name</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $user->fullname }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Gender</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $user->gender }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Birthdate</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $user->birthdate }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Age</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ Carbon\Carbon::parse($user->birthdate)->age }} Years old</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Phone</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $user->phone }}</div>
                </div>
            </li>
        </ul>

        <ul class="list bg-[#0009] mt-4 text-white rounded-box shadow-md w-50">
            <li class="list-row">
                <div>
                    <div>Email</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $user->email }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Active:
                        @if($user->active == 1)
                        <div class="badge badge-outline badge-success">Active</div>
                        @else
                        <div class="badge badge-outline badge-error">Inactive</div>
                        @endif
                    </div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Role:
                        @if($user->role == 'Administrador')
                        <div class="badge badge-outline badge-warning">Admin</div>
                        @else
                        <div class="badge badge-outline badge-accent">Customer</div>
                        @endif
                    </div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Created at</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $user->created_at->diffForHumans()}}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Updated at</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $user->updated_at->diffForHumans()}}</div>
                </div>
            </li>
        </ul>
    </div>

</div>
@endsection