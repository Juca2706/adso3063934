@extends('layouts.dashboard')

@section('title', 'Show Pet: Larapets 🐻‍❄️')

@section( 'content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
        </path>
    </svg>
    Show Pet
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
                        d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
                    </path>
                </svg>
                Show Pet
            </span>
        </li>
    </ul>
</div>

{{-- Card --}}
<div class="bg-[#0009] p-10 rounded-sm">
    <div
        class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-110 transition ease-in">
        <div id="upload" class="mask mask-squircle w-48">
            <img id="preview" src="{{ asset('images/'.$pet->image) }}" />
        </div>
    </div>

    {{-- Datos --}}
    <div class="flex gap-2 flex-col md:flex-row">
        <ul class="list bg-[#0009] mt-4 text-white rounded-box shadow-md w-50">
            <li class="list-row">
                <div>
                    <div>Name</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->name }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Kind</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->kind }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Weight</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->weight }} Kg</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Age</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->age }} Years</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Breed</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->breed }}</div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Location</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->location }}</div>
                </div>
            </li>

        </ul>

        <ul class="list bg-[#0009] mt-4 text-white rounded-box shadow-md w-50">
            <li class="list-row">
                <div>
                    <div>Description</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->description }}</div>
                </div>
            </li>


            <li class="list-row">
                <div>
                    <div>Active:
                        @if($pet->active == 1)
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
                        @if($pet->status == 0)
                        <div class="badge badge-outline badge-warning">No Adopted</div>
                        @else
                        <div class="badge badge-outline badge-accent">Adopted</div>
                        @endif
                    </div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Created at</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->created_at->diffForHumans()}}
                    </div>
                </div>
            </li>

            <li class="list-row">
                <div>
                    <div>Updated at</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{{ $pet->updated_at->diffForHumans()}}
                    </div>
                </div>
            </li>
        </ul>
    </div>

</div>
@endsection