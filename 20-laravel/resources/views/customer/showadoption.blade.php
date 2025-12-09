@extends('layouts.dashboard')

@section('title', 'Show Adoption: Larapets 🐻‍❄️')

@section( 'content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
        </path>
    </svg>
    Show Adoption
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
            <a href="{{ url('myadoptions') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z">
                    </path>
                </svg>
                My Adoptions
            </a>
        </li>
        <li>
            <span class="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
                    </path>
                </svg>
                Show Adoption
            </span>
        </li>
    </ul>
</div>

{{-- Card --}}
<div class="bg-[#0009] p-10 rounded-sm flex justify-center items-center flex-col">
    <div class="avatar-group m-8 -space-x-6">
        <div class="avatar">
            <div class="w-36">
                <img src="{{ asset('images/'. $adopt->user->photo) }}" />
            </div>
        </div>
        <div class="avatar">
            <div class="w-36">
                <img src="{{ asset('images/'. $adopt->pet->image) }}" />
            </div>
        </div>
    </div>

    {{-- Datos --}}
    <div class="flex gap-2 flex-col md:flex-row">
        <ul class="list bg-[#0009] mt-4 text-white rounded-box shadow-md w-50">
            <li class="list-row">
                <div>
                    <div>Document</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->user->document }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Full Name</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->user->fullname }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Gender</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->user->gender }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Age</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{
                        Carbon\Carbon::parse($adopt->user->birthdate)->age }} Years old</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Phone</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->user->phone }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Email</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->user->email }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Active:
                        @if($adopt->user->active == 1)
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
                        @if($adopt->user->role == 'Administrador')
                        <div class="badge badge-outline badge-warning">Admin</div>
                        @else
                        <div class="badge badge-outline badge-accent">Customer</div>
                        @endif
                    </div>
                </div>
            </li>
        </ul>

        <ul class="list bg-[#0009] mt-4 text-white rounded-box shadow-md w-50">
            <li class="list-row">
                <div>
                    <div>Name</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->pet->name }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Kind</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->pet->kind }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Weight</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->pet->weight }} Kg</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Age</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->pet->age }} Years</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Breed</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->pet->breed }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Location</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $adopt->pet->location }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Active:
                        @if($adopt->pet->active == 1)
                        <div class="badge badge-outline badge-success">Active</div>
                        @else
                        <div class="badge badge-outline badge-error">Inactive</div>
                        @endif
                    </div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Status:
                        @if($adopt->pet->status == 0)
                        <div class="badge badge-outline badge-warning">No Adopted</div>
                        @else
                        <div class="badge badge-outline badge-accent">Adopted</div>
                        @endif
                    </div>
                </div>
            </li>
        </ul>
    </div>

</div>
@endsection